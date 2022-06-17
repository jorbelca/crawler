import express from "express";

import User from "../schemas/userSchema.js";

const eliminateUserRouter = express.Router()

eliminateUserRouter.delete('/', async (request, response) => {
  const { userID } = request.body

  const returnedUser = await User.findByIdAndDelete(userID)

  if (returnedUser.length === 0 || !returnedUser || returnedUser === undefined) {
    return response.status(404).json({ error: "No data" })
  }


  try {

    return response.status(200).json({ message: 'Erased from the DB' })
  } catch (error) {
    console.error(error)
    return response.status(400).send(error)
  }

})

export default eliminateUserRouter