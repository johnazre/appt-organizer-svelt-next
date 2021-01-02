import type { IAppointment } from './IAppointment'

export interface IUser {
  id?: number
  appointments?: IAppointment[]
  fullName: string
  company: string
  email: string
  password?: string
  phone: string
  createdAt?: Date
  updatedAt?: Date
}
