
export const tokenSetter = () => {
  const token = window.localStorage.getItem("tokenUser")
  return `bearer ${token}`
}