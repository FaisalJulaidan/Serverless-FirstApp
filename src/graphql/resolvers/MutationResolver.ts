import { Company } from '../models';
import { insert, update } from '../mongodb';
import { Resolver } from './QueryResolver';

export const MutationResolver: Resolver<any> = {
    addCompany: (_, args) => insert('companies', args),
    updateCompany: (_, args) =>
        update(
            'companies',
            { _id: args._id },
            {
                ...args,
                status: 'pending',
            },
        ),
    // addBranch: (_, args) => insert<Branch>('branches', args),
    // addCustomer: (_, args) => insert<Customer>('customers', args),
    // addEmployee: (_, args) => addEmployee(args),
};
