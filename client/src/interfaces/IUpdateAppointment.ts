export interface IUpdateAppointment {
  id?: number
  date: string
  reason: string
  withUser: number
  createdAt?: Date
  updatedAt?: Date
}
