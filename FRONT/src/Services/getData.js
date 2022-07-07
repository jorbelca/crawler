import { tokenSetter } from "../Helpers/tokenSetter";
import { apiUrl } from "./register";



export const getData = async () => {
  try {
    const response = await fetch(`${apiUrl}/api/data`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=UTF-8 ",
        Accept: "application/json",
        Authorization: tokenSetter()
      },
    })
    return response
  } catch (error) {
    console.log(error);
    return error
  }

}