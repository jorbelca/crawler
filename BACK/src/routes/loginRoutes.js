import express from "express";
import bcrypt from "bcrypt";
import User from "../schemas/userSchema.js";
import { SECRET } from "../../configEnv.js";
import jwt from "jsonwebtoken";

const loginRouter = express.Router();

loginRouter.post("/", async (request, response) => {
  const { email, password } = request.body;
  try {
    const returnedUser = await User.find({ email: email });

    if (
      returnedUser.length === 0 ||
      !returnedUser ||
      returnedUser === undefined
    ) {
      return response.status(404).json({ error: "No data in the DB" });
    }

    let user = returnedUser[0];

    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.password);

    if (!passwordCorrect) {
      return response.status(401).json({ error: "Invalid password" });
    }

    let userToken = {
      email: user.email,
      username: user.username,
      id: user._id,
    };

    const token = jwt.sign(
      userToken,
      SECRET,
      {
        expiresIn: 60 * 60 * 24 * 2, // 2 días
        algorithm: "HS256",
      },
      (err, token) => {
        if (err) {
          return response
            .status(500)
            .json({ error: "Error signing token - " + err });
        }
        return response.status(200).json({ token: token });
      }
    );
  } catch (error) {
    console.log(error);
    return response.status(400).json({ error: error.message });
  }
});

export default loginRouter;
