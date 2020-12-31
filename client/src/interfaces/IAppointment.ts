import type { IUser } from './IUser'

export interface IAppointment {
  id?: number
  date: string
  reason: string
  withUser?: IUser
  createdAt?: Date
  updatedAt?: Date
}
