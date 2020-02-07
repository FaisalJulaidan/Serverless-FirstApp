import { Common, FoodItem } from './';

export interface FoodCategory extends Common {
    name: string
    desc: string
    foodItems: [FoodItem]
}
