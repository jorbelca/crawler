import create from 'zustand/vanilla'
import zustandToSvelte from './zustandToSvelte'

const notificationStore = create((set => ({
  notifications: [],
  errors: [],
  setNotifications: (message) => set(() => ({
    notifications: [message]
  })),
  setErrors: (error) => set(() => ({
    errors: [error]
  })),
  removeNotifications: () => set(() => ({
    notifications: []
  })),
  removeErrors: () => set(() => ({
    errors: []
  })),
})))




export default zustandToSvelte(notificationStore)
