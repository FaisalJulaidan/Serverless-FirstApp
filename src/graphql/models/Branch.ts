import { Common, Table, Order } from './';

export interface Branch {
    updatedAt: Date
    name: string
    companyInfo: string
    location: string
    tables: [Table]
    orders: [Order]
}
