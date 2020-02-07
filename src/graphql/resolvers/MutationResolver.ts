import { Company, Branch } from '../models';
import { insertOne, updateOne } from '../mongodb';
import { Resolver } from './QueryResolver';

export const MutationResolver: Resolver<any> = {
	addCompany: (_, args) => insertOne<Company>('companies', args),
	updateCompany: (_, args) => updateOne('companies', { _id: args._id }, args),
	addBranch: (_, args) => insertOne<Branch>('branches', args),
	// addCustomer: (_, args) => insert<Customer>('customers', args),
	// addEmployee: (_, args) => addEmployee(args),
};
