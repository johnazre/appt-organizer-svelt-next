import { writable, Writable } from 'svelte/store'
import type { IUser } from '../interfaces/IUser'
import { AuthStore } from './AuthStore'

const UsersStore: Writable<IUser[]> = writable([] as IUser[])

export const populateUsers = async () => {
  const response = await fetch(`http://localhost:3000/users`)
  const users = await response.json()

  UsersStore.update(() => users)
}

export const userSignup = async (newUser: IUser) => {
  await fetch(`http://localhost:3000/users`, {
    method: 'POST',
    body: JSON.stringify(newUser),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  UsersStore.update((existingUsers: IUser[]): IUser[] => {
    return [newUser, ...existingUsers]
  })
}

export const updateUser = async (updatedUser: IUser) => {
  await fetch(`http://localhost:3000/users/${updatedUser.id}`, {
    method: 'PATCH',
    body: JSON.stringify(updatedUser),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  UsersStore.update((existingUsers: IUser[]): IUser[] => {
    return existingUsers.map((user) =>
      user.id !== updatedUser.id ? user : updatedUser
    )
  })
}

export const removeUser = async (userId: number) => {
  await fetch(`http://localhost:3000/users/${userId}`, {
    method: 'DELETE',
  })
  UsersStore.update((existingUsers: IUser[]): IUser[] => {
    return existingUsers.filter((user) => user.id !== userId)
  })
}

export default UsersStore
