export interface Company {
    createdAt: number
    name: string
    email: string
    telephone: string
    tier: 'TRIAL' | 'BASIC' | 'PREMIUM'
}
