import { get, find } from '../mongodb';
import { Company, Branch } from '../models';
import { Resolver } from './QueryResolver';
import { Employee } from '../models/Employee';
import { getCompany } from './CompanyResolver';

export const BranchResolver: Resolver<Branch> = {
	companyInfo: (parent) => getCompany(parent),
};

// export const getBranch = async (parent): Promise<Branch | null> => {
// 	return get<Branch>('company', parent.company_id);
// };
