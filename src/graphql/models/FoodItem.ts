import { Common, Ingredient } from './';

export interface FoodItem extends Common {
    companyId: string
    isAvailable: Boolean
    unitPrice: Number
    sides: [FoodItem]
    ingredients: [Ingredient]
}
