import { apiUrl } from "./register";


export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${apiUrl}/api/login`, {
      method: "POST",

      body: JSON.stringify({ email: email, password: password }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8 ",
        Accept: "application/json",
        'Access-Control-Allow-Origin': "https://thesmallcrawler.vercel.app "
      },
credentials:true
    })
    return response
  } catch (error) {
    console.log(error);
    return error
  }

}
