import express from 'express'
import bcrypt from 'bcrypt'
import User from '../schemas/userSchema.js'


const loginRouter = express.Router()

loginRouter.post('/', async (request, response) => {
  const { email, password } = request.body

  const returnedUser = await User.find({ email: email })

  if (returnedUser.length === 0 || !returnedUser || returnedUser === undefined) {
    return response.status(404).json({ error: "No data in the DB" })
  }

  let user = returnedUser[0]
  const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.password)


  let session
  if (email == user.email && passwordCorrect) {
    session = request.session;
    session.userID = JSON.stringify(user._id);
  }
  else {
    return response.send('Invalid username or password');
  }


  try {

    return response.status(200).send(JSON.stringify(user._id))

  } catch (error) {
    console.log(error)
    return response.status(400).send(error)
  }

})

export default loginRouter
