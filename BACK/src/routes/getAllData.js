import express from 'express'
import Operation from '../schemas/operationsSchema.js';

const getDataRouter = express.Router()


getDataRouter.post('/', async (request, response) => {
  const { userID } = request.body

  try {
    const results = await Operation.find({ user: userID }).populate("user", { username: 1 }).select({ url: 1, data: 1, user: 0 })
    if (results) return response.status(200).send(results);

  } catch (error) {
    console.error(error);

    return response.status(400).send(error)
  }

}
)
export default getDataRouter