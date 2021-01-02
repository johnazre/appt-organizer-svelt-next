import { writable, Writable } from 'svelte/store'
import type { IAppointment } from '../interfaces/IAppointment'
import type { IAddAppointment } from '../interfaces/IAddAppointment'
import type { IUpdateAppointment } from '../interfaces/IUpdateAppointment'

const AppointmentsStore: Writable<IAppointment[]> = writable(
  [] as IAppointment[]
)

export const populateAppointments = async () => {
  const response = await fetch(`http://localhost:3000/appointments`)
  const appointments = await response.json()

  AppointmentsStore.update(() => appointments)
}

export const addAppointment = async (newAddAppt: IAddAppointment) => {
  const response = await fetch(`http://localhost:3000/appointments`, {
    method: 'POST',
    body: JSON.stringify(newAddAppt),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const newAppt = await response.json()

  AppointmentsStore.update((existingAppts: IAppointment[]): IAppointment[] => {
    return [newAppt, ...existingAppts]
  })
}

export const updateAppointment = async (newUpdatedAppt: IUpdateAppointment) => {
  console.log('heard in apptstore', newUpdatedAppt)
  try {
    const response = await fetch(
      `http://localhost:3000/appointments/${newUpdatedAppt.id}`,
      {
        method: 'PATCH',
        body: JSON.stringify(newUpdatedAppt),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    const updatedAppt = await response.json()
    console.log('updatedappt in apptstore', updatedAppt)

    AppointmentsStore.update(
      (existingAppts: IAppointment[]): IAppointment[] => {
        return existingAppts.map((appt) =>
          appt.id !== updatedAppt.id ? appt : updatedAppt
        )
      }
    )
  } catch (err) {
    console.log('err', err)
  }
}

export const removeAppointment = async (apptId: number) => {
  await fetch(`http://localhost:3000/appointments/${apptId}`, {
    method: 'DELETE',
  })
  AppointmentsStore.update((existingsAppts: IAppointment[]): IAppointment[] => {
    return existingsAppts.filter((appt) => appt.id !== apptId)
  })
}

export default AppointmentsStore
