
export function getToken (key) {
  return localStorage.getItem(key)
}

export function setToken (key,token) {
  /*  return Cookies.set(TokenKey, token) */
  localStorage.setItem(key, token)
}

export function removeToken (key) {
  return localStorage.removeItem(key)
}
