import { Common, Company, FoodCategory } from './';

export interface Menu extends Common {
    companyId: string
    companyInfo: Company
    categories: [FoodCategory]
}
