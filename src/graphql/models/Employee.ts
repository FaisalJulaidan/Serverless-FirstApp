import { Common, Company } from './';

export interface Employee extends Common{
    companyId: string
    firstName: string
    lastName: string
    email: string
    lastActive: string
    companyInfo: Company
}
