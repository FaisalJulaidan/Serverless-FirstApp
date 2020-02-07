import { Common } from './';

export interface OrderIngredient extends Common {
    ingredientId: string
    name: string
    desc: string
    quantity: Number
    unitPrice: Number
}
