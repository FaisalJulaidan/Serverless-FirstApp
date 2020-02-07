import { Common, OrderIngredient } from './';

export interface OrderFoodItem extends Common {
    status: 'WAITING_APPROVAL' | 'WAITING_FOOD' | 'READY' | 'PAID'
    approvedAt: Date
    servedAt: Date
    quantity: Number
    unitPrice: Number
    notes: string
    sides: [OrderFoodItem]
    ingredients: [OrderIngredient]
}
