import Cookies from 'js-cookie'

const TokenKey = 'token'
const Username = 'username'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUsername() {
  return Cookies.get(Username)
}

export function setUsername(token) {
  return Cookies.set(Username, token)
}

export function removeUsername() {
  return Cookies.remove(Username)
}
