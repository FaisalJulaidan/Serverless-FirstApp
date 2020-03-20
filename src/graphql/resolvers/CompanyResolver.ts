import { get, find } from '../mongodb';
import { Company, Branch, Employee } from '../models';
import { Resolver } from './QueryResolver';

export const CompanyResolver: Resolver<Company> = {
	branches: (parent) => find<Branch>('branches', { companyId: parent._id }),
	employees: (parent) => find<Employee>('employees', { companyId: parent._id }),
};

export const getCompany = async (parent): Promise<Company | null> => {
	return get<Company>('company', { companyId: parent.companyId });
};
