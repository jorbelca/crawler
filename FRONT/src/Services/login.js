import { apiUrl } from "./register";

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${apiUrl}/api/login`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ email: email, password: password }),
      headers: {
        "Content-Type": "application/json ",
        Accept: "*/*",
        Connection: "keep-alive",
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};
