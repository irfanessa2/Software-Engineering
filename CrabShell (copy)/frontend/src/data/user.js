import { entity } from 'simpler-state';

export const loggedInEntity = entity(false)

export const setLoggedIn = (value) => {
  loggedInEntity.set(value)
}

export const login = () => {
  localStorage.setItem('loggedIn', true)
  loggedInEntity.set(true)
}

export const logout = () => {
  localStorage.setItem('loggedIn', false)
  loggedInEntity.set(false)
}