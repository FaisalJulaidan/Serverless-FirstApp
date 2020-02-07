import { Common, Branch, Employee, FoodItem, FoodCategory } from './';

export interface Company extends Common {
	name: string;
	email: string;
	telephone: string;
	tier: 'TRIAL' | 'BASIC' | 'PREMIUM';
	settings: CompanySettings;
	branches: [Branch];
	employees: [Employee];
	foodItems: [FoodItem];
	foodCategories: [FoodCategory];
}

interface CompanySettings {
	currency: 'SAR' | 'USD';
	language: 'ar' | 'en';
	timeZone: string;
}
