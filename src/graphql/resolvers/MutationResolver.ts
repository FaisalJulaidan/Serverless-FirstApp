import { Company, Branch, Employee } from '../models';
import { insert, update } from '../mongodb';
import { Resolver } from './QueryResolver';
const ObjectId = require('mongodb').ObjectID;

export const MutationResolver: Resolver<any> = {
	addCompany: (_, args) => {
		args.Tier = 'TRIAL';
		return insert<Company>('companies', args);
	},
	updateCompany: (_, args) => {
		return update('companies', { _id: ObjectId(args._id) }, args);
	},
	// addBranch: (_, args) => {
	// 	return insert<Branch>('branches', args);
	// },
	// updateBranch: (_, args) => {
	// 	return update('branches', { _id: args._id, companyId: args.companyId }, args);
	// },
	// addEmployee: (_, args) => {
	// 	return insert<Employee>('employees', args);
	// },
	// updateEmployee: (_, args) => {
	// 	return update('employees', { _id: args._id, companyId: args.companyId }, args);
	// },
	// addCustomer: (_, args) => insert<Customer>('customers', args),
	// addEmployee: (_, args) => addEmployee(args),
};
