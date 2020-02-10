import { get, find } from '../mongodb';
import { Company, Branch } from '../models';
import { Resolver } from './QueryResolver';
import { Employee } from '../models/Employee';

export const CompanyResolver: Resolver<Company> = {
	branches: (parent) => find<Branch>('branches', { companyId: parent._id }),
	employees: (parent) => find<Employee>('employees', { companyId: parent._id }),
};

export const getCompany = async (parent): Promise<Company | null> => {
	return get<Company>('company', { companyId: parent.companyId });
};
