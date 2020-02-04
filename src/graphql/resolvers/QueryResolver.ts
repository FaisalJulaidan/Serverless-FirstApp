import { ObjectId } from 'mongodb';
import { findOne } from '../mongodb';
import { Company } from '../models';

interface Parent {
	_id: ObjectId;
}

export interface Resolver<T> {
	[key: string]: (parent: T & Parent, args, context?, info?) => Promise<any>;
}

export interface GetCompanyInput {
	id: string;
}

interface GetOtherInput {
	id: string;
	company_id: string;
}

export const QueryResolver: Resolver<any> = {
	getCompany: async (_, args, context, info) => {
		return {
			name: 'Test',
			email: 'email@test.com',
		};
		return findOne<Company>('companies', args);
	},
	// getBranch: (_, args: GetOtherInput) => get<Branch>('branches', args),
	// getEmployee: (_, args: GetOtherInput) => get<Employee>('employees', args),
};
