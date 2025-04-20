import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import crypto from "crypto";
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter your name"],
    maxLength: [30, "name cannot execeed 30 charcreter"],
    minLength: [4, "name cannot execeed 4 charcreter"],
  },
  email: {
    type: String,
    required: [true, "please enter your email"],
    unique: true,
    validator: [validator.isEmail, "pleas enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "please enter your name"],

    minLength: [6, "password cannot execeed 4 charcreter"],
  },

  role: {
    type: String,
    default: "user",
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Prevent double hashing
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const UserSchema = mongoose.model("User", userSchema);

export default UserSchema;
