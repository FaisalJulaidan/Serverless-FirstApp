import { findOne } from '../mongodb';
import { Company } from '../models';
import { Resolver } from './QueryResolver';

export const CompanyResolver: Resolver<Company> = {
    // branches: (parent) => find<Branch>('branches', { company_id: parent.id }),
    // employees: (parent) => find<Employee>('employees', { company_id: parent.id }),
};

export const getCompany = async (parent): Promise<Company | null> => {
    return findOne<Company>('company', parent.company_id);
};
