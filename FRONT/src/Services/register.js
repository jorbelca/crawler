let url;
if (import.meta.env.VITE_NODE_ENV == "test") {
  url = import.meta.env.VITE_API_URL_TEST;
} else {
  url = import.meta.env.VITE_API_URL;
}
export const apiUrl = url;

export const registerUser = async (/** @type {string} */ email, /** @type {string} */ username, /** @type {string} */ password) => {
  try {
    const response = await fetch(`${apiUrl}/api/register`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8' ",
        Accept: "*/*",
        Connection: "keep-alive",
      },
    });
    return response
  } catch (error) {
    console.error(error);
    return error;
  }
};
