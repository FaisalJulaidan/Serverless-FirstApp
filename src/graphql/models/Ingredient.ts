import { Common } from './';

export interface Ingredient extends Common {
    name: string
    desc: string
    maxQuantity: Number
    unitPrice: Number
}
