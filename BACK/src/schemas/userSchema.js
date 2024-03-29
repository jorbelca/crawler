import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import validate from "mongoose-validator";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    validate: validate({
      validator: "isLength",
      arguments: [3, 15],
      message: "Username should be between {ARGS[0]} and {ARGS[1]} characters",
    }),
  },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
  },
  operations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Operation",
    },
  ],
});

userSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});
userSchema.plugin(uniqueValidator);
const User = mongoose.model("User", userSchema);

export default User;
