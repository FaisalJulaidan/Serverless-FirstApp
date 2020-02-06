import { Common } from './';

export interface Customer extends Common {
    displayName: string
    firstName: string
    lastName: string
    email: string
    address: string
}
