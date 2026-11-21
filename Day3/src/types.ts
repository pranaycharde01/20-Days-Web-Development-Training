// Primitive types
export type UserId = number
export type UserName = string
export type UserEmail = string

// Company information
export interface Company {
  name: string
  catchPhrase: string
  bs: string
}

// Address information
export interface Address {
  street: string
  suite: string
  city: string
  zipcode: string
}

// API User response
export interface User {
  id: UserId
  name: UserName
  username: string
  email: UserEmail
  phone: string
  website: string
  address: Address
  company: Company
}

// API response type
export type UsersResponse = User[]

// Union type
export type LoadingStatus =
  | 'idle'
  | 'loading'
  | 'success'
  | 'error'

// Search form data
export interface SearchForm {
  search: string
}