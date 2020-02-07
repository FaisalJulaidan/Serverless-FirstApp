import { Common, Branch, OrderFoodItem } from './';

export interface Order extends Common {
    branchId: string
    branchInfo: Branch
    userId: string
    status: 'OPEN' | 'CLOSED | CANCELLED'
    price: Number
    items: [OrderFoodItem]
    approvedAt: Date
    servedAt: Date
}
