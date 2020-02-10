import { Resolver } from './QueryResolver';
import { Employee } from '../models';
import { getCompany } from './CompanyResolver';

export const EmployeeResolver: Resolver<Employee> = {
	companyInfo: (parent) => getCompany(parent),
};

// export const getBranch = async (parent): Promise<Branch | null> => {
// 	return get<Branch>('company', parent.company_id);
// };
