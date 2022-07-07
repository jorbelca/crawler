
export const validateUsername = (username) => {
  if (username == "" || undefined || null || username.length < 3 || username.length > 15) {
    return false
  }
  return true
}

export const validatePassword = (password) => {
  if (password == "" || undefined || null || password.length < 3 || password.length > 23) {
    return false
  }
  return true
}

export const validateEmail = (email) => {

  if (email == "" || undefined || null) {
    return false
  }
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) { return true } else { return false }
}