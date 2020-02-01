const { gql } = require('apollo-server-lambda');
import {DateTimeResolver, EmailAddressResolver, PhoneNumberResolver} from 'graphql-scalars';
import { CompanyResolver, MutationResolver, QueryResolver } from './resolvers';

// ￿raphql resolvers
export const resolvers = {
    Query: QueryResolver,
    Mutation: MutationResolver,
    Company: CompanyResolver,
    // Custom scalar types
    DateTime: DateTimeResolver,
    Email: EmailAddressResolver,
    PhoneNumber: PhoneNumberResolver
};

export const schema = gql`
    scalar DateTime
    scalar Email
    scalar PhoneNumber
    
    type Company {
        _id: String!
        createdAt: DateTime!
        updatedAt: DateTime!
        name: String!
        email: String!
        telephone: String!
        tier: Tier!
        verified: Boolean
        branches: Branch
        employees: Employee
#        products: Product
    }

    type Employee {
        _id: String!
        createdAt: DateTime!
        updatedAt: DateTime!
        companyId: String!
        firstname: String!
        lastname: String!
        email: String!
        lastActive: String!
        companyInfo: Company
    }

    type Branch {
        _id: String!
        companyId: String!
        createdAt: DateTime!
        updatedAt: DateTime!
        name: String!
        companyInfo: Company!
        location: Location
        tables: [Table!]
        orders: [Order!]
    }

    union User = Customer | Guest
    type Table {
        _id: String!
        createdAt: DateTime!
        updatedAt: DateTime!
        companyId: String!
        branchId: String!
        passcode: Int!
        redirectUrl: String!
        connectedUsers: [User!]
    }
    
    type Customer {
        _id: String!
        createdAt: DateTime!
        updatedAt: DateTime!
        displayName: String!
        firstname: String!
        lastName: String!
        email: String!
        address: String
    }
    
    type Guest {
        _id: String!
        displayName: String!
    }

    type Order {
        _id: String!
        createdAt: DateTime!
        updatedAt: DateTime!
        status: OrderStatus!
        price: Float!
        items: [OrderItem!]!
        approvedAt: DateTime
        servedAt: DateTime
    }
    
    type OrderItem {
        productId: String!
        status: OrderItemStatus
        approvedAt: DateTime
        servedAt: DateTime
        quantity: Int!
        unitPrice: Float!
        
    }
    
    type Location {
        country: String!
        city: String!
        street:String!
        lat: Float!
        lng: Float!
    }

    enum OrderStatus {
        OPEN # still receving orders
        CLOSED # paid and closed
        CANCELLED # unpaid and canclled
    }

    enum OrderItemStatus {
        WAITING_APPROVAL # watting cashier to approve
        WAITING_FOOD # watting food to be served
        READY # cooked and ready for serving
        SEARVED # food on the table
        PAID
    }

    enum Tier {
        TRIAL
        BASIC
        PREMIUM
    }

    type Mutation {
        addCompany(name: String!, email: Email!): Company
        updateCompany(name: String!,
            email: String!,
            telephone: String!,
            tier: String!,
        ): Company!
    }

    type Query {
        getCompany(id: String!): Company
    }
`;

