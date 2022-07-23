import { userStore } from "../State/store"
import { navigate } from "svelte-routing"
export const handleLogout = async () => {
  userStore.removeUser()
  navigate("/", { replace: true })
}