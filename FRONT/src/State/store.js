import { writable } from "svelte/store"


const notificationStr = (() => {
  const { subscribe, set } = writable([])
  return {
    subscribe,
    setNotifications: (message) => {
      set([message])
      setInterval(() => set([]), 3000)
      clearInterval()
    },
    removeNotifications: () => { set([]) },
  }
}
)

export const notificationStore = notificationStr()


const errorStr = (() => {
  const { subscribe, set } = writable([])
  return {
    subscribe,
    setErrors: (error) => {
      set([error])
      setInterval(() => set([]), 3000),
        clearInterval()
    },
    removeErrors: () => { set([]) }
  }
}
)

export const errorStore = errorStr()


const userStr = (() => {
  const { subscribe, set } = writable([])
  return {
    subscribe,
    setUser: (token) => {
      set([token])
      window.localStorage.setItem("tokenUser", token)
    },
    removeUser: () => {
      set([])
      window.localStorage.removeItem("tokenUser")
    }
  }
}
)

export const userStore = userStr()
