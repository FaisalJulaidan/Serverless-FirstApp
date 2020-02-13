const { gql } = require('apollo-server-lambda');
import { DateTimeResolver, EmailAddressResolver, PhoneNumberResolver } from 'graphql-scalars';
import { CompanyResolver, MutationResolver, QueryResolver } from './resolvers';
import { BranchResolver } from './resolvers/BranchResolver';
import { EmployeeResolver } from './resolvers/EmployeeResolver';

// ￿raphql resolvers
export const resolvers = {
	Query: QueryResolver,
	Mutation: MutationResolver,
	Company: CompanyResolver,
	Branch: BranchResolver,
	Employee: EmployeeResolver,
	// Custom scalar types
	DateTime: DateTimeResolver,
	Email: EmailAddressResolver,
	PhoneNumber: PhoneNumberResolver,
};

export const schema = gql`
	scalar DateTime

	scalar Email

	scalar PhoneNumber

	type Query {
		getCompany(_id: String!): Company
		getBranch(_id: String!, companyId: String!): Branch
		getEmployee(_id: String!, companyId: String!): Employee
	}

	type Mutation {
		addCompany(_id: String!, name: String!, email: Email!, telephone: PhoneNumber!): Company!
		updateCompany(_id: String!, name: String, email: Email, telephone: PhoneNumber!): Company!
		addBranch(name: String!, companyId: String!, location: LocationInput!): Branch!
		updateBranch(_id: String!, companyId: String!, name: String, location: LocationInput): Branch!
		addEmployee(_id: String!, companyId: String!, firstName: String!, lastName: String!, email: Email!): Employee!
		updateEmployee(_id: String!, companyId: String!, firstName: String, lastName: String, email: Email): Employee!
	}

	type Company {
		_id: String!
		createdAt: DateTime!
		updatedAt: DateTime!
		name: String!
		email: String!
		telephone: String!
		tier: Tier!
		branches: [Branch]
		employees: [Employee!]
		foodItems: [FoodItem!]
		foodCategories: [FoodCategory!]
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

	type Employee {
		_id: String!
		createdAt: DateTime!
		updatedAt: DateTime!
		companyId: String!
		firstName: String!
		lastName: String!
		email: String!
		lastActive: String!
		companyInfo: Company
	}

	type Table {
		_id: String!
		branchId: String!
		branchInfo: Branch!
		createdAt: DateTime!
		updatedAt: DateTime!
		passcode: Int!
		redirectUrl: String!
		# connectedUsers: [User!]
		activeOrders: [Order!]
	}

	type Category {
		_id: String!
		companyId: String!
		name: String!
		description: String
		dishes: [Dish!]
	}

	type Entree {
		_id: String!
		companyId: String!
		name: String!
		description: String!
		dishes: [Dish!]
		sides: [Side!]
	}

	type Dish {
		_id: String!
		companyId: String!
		name: String!
		description: String!
		price: Float!
		isAvailable: Boolean!
		numOfSides: Int
		sides: [Side!]
	}

	type Side {
		_id: String!
		companyId: String!
		name: String!
		description: String!
		extraPrice: Float
		isAvailable: Boolean!
	}

	# type Toppings {

	# }

	type Menu {
		_id: String
		companyId: String!
		branchId: String!
		companyInfo: Company!
		branchInfo: Branch!
		categories: [Category!]
	}

	type Order {
		_id: String
		branchId: String!
		branchInfo: Branch!
		userId: String!
		createdAt: DateTime!
		updatedAt: DateTime!
		status: OrderStatus!
		price: Float!
		items: [OrderFoodItem!]!
		approvedAt: DateTime
		servedAt: DateTime
	}

	# type OrderFoodItem {
	# 	_id: String!
	# 	foodItemId: String!
	# 	status: OrderFoodItemStatus!
	# 	approvedAt: DateTime
	# 	servedAt: DateTime
	# 	quantity: Int!
	# 	unitPrice: Float!
	# 	notes: String!
	# 	sides: [OrderFoodItem!]
	# 	ingredients: [OrderIngredient!]
	# }

	# type OrderIngredient {
	# 	_id: String!
	# 	ingredientId: String!
	# 	name: String!
	# 	desc: String!
	# 	quantity: Int!
	# 	unitPrice: Float!
	# }

	# union User = Customer | Guest

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

	type Location {
		country: String!
		city: String!
		street: String!
		lat: Float!
		lng: Float!
	}

	# type FoodItem {
	# 	_id: String!
	# 	companyId: String!
	# 	isAvailable: Boolean!
	# 	unitPrice: Float!
	# 	sides: [FoodItem!]
	# 	ingredients: [Ingredient!]
	# }

	# type Ingredient {
	# 	_id: String!
	# 	name: String!
	# 	desc: String!
	# 	maxQuantity: Int!
	# 	unitPrice: Float!
	# }

	# type FoodCategory {
	# 	_id: String!
	# 	name: String!
	# 	desc: String!
	# 	foodItems: [FoodItem!]
	# }

	# === === === === #
	# === Inputs === #
	type FoodItemInput {
		isAvailable: Boolean!
		unitPrice: Float!
		sides: [FoodItem!]
		ingredients: [Ingredient!]
	}

	type IngredientInput {
		name: String!
		desc: String!
		maxQuantity: Int!
		unitPrice: Float!
	}

	# Order inputs are coming from the customer
	type OrderInput {
		createdAt: DateTime!
		updatedAt: DateTime!
		status: OrderStatus!
		price: Float!
		items: [OrderFoodItemInput!]!
		approvedAt: DateTime
		servedAt: DateTime
	}

	type OrderFoodItemInput {
		foodItemId: String!
		# orderedBy: User!
		status: OrderFoodItemStatus!
		approvedAt: DateTime
		servedAt: DateTime
		quantity: Int!
		unitPrice: Float!
		notes: String!
		sides: [OrderFoodItemInput!]
		ingredients: [OrderIngredientInput!]
	}

	type OrderIngredientInput {
		ingredientId: String!
		name: String!
		desc: String!
		quantity: Int!
		unitPrice: Float!
	}

	input LocationInput {
		country: String!
		city: String!
		street: String!
		lat: Float!
		lng: Float!
	}

	# === === === === #
	# === Enums === #
	enum OrderStatus {
		OPEN # still receiving orders
		CLOSED # paid and closed
		CANCELLED # unpaid and cancelled
	}

	enum OrderFoodItemStatus {
		WAITING_APPROVAL # wating waiter to approve
		WAITING_FOOD # wating food to be served
		READY # cooked and ready for serving
		SERVED # food on the table
		PAID
	}

	enum Tier {
		TRIAL
		BASIC
		PREMIUM
	}
`;
