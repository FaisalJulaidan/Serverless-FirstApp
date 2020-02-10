import { ObjectId } from 'mongodb';
import { get } from '../mongodb';
import { Company, Branch, Employee } from '../models';

interface Parent {
	_id: ObjectId;
}

export interface Resolver<T> {
	[key: string]: (parent: T & Parent, args, context?, info?) => Promise<any>;
}

export interface GetCompanyInput {
	id: string;
}

// interface GetOtherInput {
//     id: string;
//     companyId: string;
// }

export const QueryResolver: Resolver<any> = {
	getCompany: async (_, args) => {
		return get<Company>('companies', args);
	},
	getBranch: (_, args) => get<Branch>('branches', args),
	getEmployee: (_, args) => get<Employee>('employees', args),
	// getEmployee: (_, args: GetOtherInput) => get<Employee>('employees', args),
};
