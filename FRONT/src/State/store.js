import { writable } from "svelte/store"

const notificationStr = () => {
  const { subscribe, set } = writable([])
  return {
    subscribe,
    setNotifications: (message) => {
      set([message])
      setTimeout(() => set([]), 4000)
    },
    removeNotifications: () => {
      set([])
    },
  }
}

export const notificationStore = notificationStr()

const errorStr = () => {
  const { subscribe, set } = writable([])
  return {
    subscribe,
    setErrors: (error) => {
      set([error])
      setTimeout(() => set([]), 4000)
    },
    removeErrors: () => {
      set([])
    },
  }
}

export const errorStore = errorStr()

const userStr = () => {
  const { subscribe, set } = writable([])
  return {
    subscribe,
    setUser: (token) => {
      set([token])
      window.localStorage.setItem("tokenUser", token)
    },
    getUser: () => {
      const token = window.localStorage.getItem("tokenUser")
      return token
    },
    removeUser: () => {
      set([])
      window.localStorage.removeItem("tokenUser")
    },
  }
}

export const userStore = userStr()
