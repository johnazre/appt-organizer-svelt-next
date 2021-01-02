import { writable, Writable } from 'svelte/store'
import type { IAuth } from '../interfaces/IAuth'

export const AuthStore: Writable<IAuth> = writable({
  isAuthed: false,
  activeUser: {},
})

export const setIsAuthed = async (isAuthed: boolean, email: string) => {
  const response = await fetch(
    `http://localhost:3000/users/verify?email=${email}`,
    {
      method: 'POST',
    }
  )
  const verifiedUser = await response.json()

  AuthStore.update((auth: IAuth) => {
    return { ...auth, isAuthed, activeUser: verifiedUser }
  })
}
