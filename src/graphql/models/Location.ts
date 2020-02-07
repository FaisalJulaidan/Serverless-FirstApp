import { Common } from './';

export interface Location extends Common{
    country: string
    city: string
    street: string
    lat: string
    lng: string
}
