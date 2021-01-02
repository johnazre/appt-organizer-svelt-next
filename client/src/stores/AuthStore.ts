import { writable, Writable } from 'svelte/store'
import type { IAuth } from '../interfaces/IAuth'

export const AuthStore: Writable<IAuth> = writable({
  isAuthed: false,
  activeUser: {},
})

export const setIsAuthed = (isAuthed: boolean) => {
  AuthStore.update((auth: IAuth) => {
    return { ...auth, isAuthed }
  })
}
