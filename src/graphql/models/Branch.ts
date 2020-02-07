import { Common, Company, Table, Order } from './';

export interface Branch extends Common {
	updatedAt: Date;
	name: string;
	companyInfo: Company;
	location: string;
	tables: Table[];
	orders: Order[];
}
