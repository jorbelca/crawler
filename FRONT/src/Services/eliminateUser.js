import { tokenSetter } from "../Helpers/tokenSetter";
import { apiUrl } from "./register";



export const eliminateUser = async () => {
  try {
    const response = await fetch(`${apiUrl}/api/eliminate-user`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=UTF-8 ",
        Accept: "application/json",
        Authorization: tokenSetter()
      },
    })
    return response
  } catch (error) {
    console.error(error);
    return error
  }

}