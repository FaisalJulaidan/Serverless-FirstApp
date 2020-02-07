import { Common, Branch, Customer, Guest, Order } from './';

export interface Table extends Common {
    companyId: string
    branchId: string
    branchInfo: Branch
    passcode: Number
    redirectUrl: Date
    connectedUsers: [Customer | Guest]
    activeOrders: [Order]
}