import express from "express";
import Operation from "../schemas/operationsSchema.js";
import tokenExtractor from "../utils/tokenExtractor.js";

const getDataRouter = express.Router();

getDataRouter.post("/", tokenExtractor, async (request, response) => {
  const { userID } = request.body;

  try {
    const results = await Operation.find({ user: userID })
      .sort({ "data.date": -1 })
      .populate("user", { username: 1 })
      .select({ url: 1, data: 1, user: 0, time: 1 });
    if (results) return response.status(200).send(results);
  } catch (error) {
    console.error(error);

    return response.status(400).json({ error: error.message });
  }
});
export default getDataRouter;
