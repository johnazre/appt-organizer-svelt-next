import { writable, Writable  } from 'svelte/store'
import type { IAppointment } from '../interfaces/IAppointment'

const AppointmentsStore: Writable<IAppointment[]> = writable([] as IAppointment[])

export const populateAppointments = async () => {
    const response = await fetch(`http://localhost:3000/appointments`)
    const appointments = await response.json()

    AppointmentsStore.update(() => appointments)
}

export const addAppointment = async (newAppt: IAppointment) => {

    await fetch(`http://localhost:3000/appointments`, {
        method: 'POST',
        body: JSON.stringify(newAppt),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    AppointmentsStore.update((existingAppts: IAppointment[]): IAppointment[] => {
        return [newAppt, ...existingAppts]
    })
}

export const updateAppointment = async (updatedAppt: IAppointment) => {
    await fetch(`http://localhost:3000/appointments/${updatedAppt.id}`, {
        method: 'PATCH',
        body: JSON.stringify(updatedAppt),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    AppointmentsStore.update((existingAppts: IAppointment[]): IAppointment[] => {
        return existingAppts.map(appt => appt.id !== updatedAppt.id ? appt : updatedAppt)
    })
}

export const removeAppointment = async (apptId: number) => {
    await fetch(`http://localhost:3000/appointments/${apptId}`, {
        method: 'DELETE',
    })
    AppointmentsStore.update((existingsAppts: IAppointment[]): IAppointment[] => {
        return existingsAppts.filter(appt => appt.id !== apptId)
    })
}


export default AppointmentsStore