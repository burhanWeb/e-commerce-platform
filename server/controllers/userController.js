import User from "../models/userModel.js";
import { createJWT } from "../utils/generateTokenAndSetToken.js";
import crypto from "crypto";
import { StatusCodes } from "http-status-codes";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { STATUS_CODES } from "http";

export const regsiter = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(StatusCodes.BAD_REQUEST).json("please fill all the details ");
    }
    const user = await User.create({
      name,
      email,
      password,
    });

    const userWithOutPasseord = await User.findOne({ _id: user._id }).select(
      "-password"
    );

    const data = { username: user.name, userId: user._id, role: user.role };
    createJWT(data, res);
    res.status(StatusCodes.CREATED).json(userWithOutPasseord);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message,
    });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(StatusCodes.METHOD_FAILURE)
        .json({ message: "Invalid user" });
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const payload = { username: user.name, userId: user._id, role: user.role };
    createJWT(payload, res);
    user.password = undefined;
    res.json(user);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("token", null, {
      httpOnly: true,
      expires: new Date(Date.now()),
    });

    res.json("user logout");
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message,
    });
  }
};

export const getUserDetail = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await User.findById(userId).select("-password");

    res.status(200).json(user);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message,
    });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { userId } = req.user;
    const { oldPassword, newPassword, confirmPassword } = req.body;

    const user = await User.findById(userId);

    const isPasswordCorrect = await user.comparePassword(oldPassword);

    if (!isPasswordCorrect) {
      return res.status(401).json("old password is incorrect");
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json("password does not match");
    }
    if (newPassword === oldPassword) {
      return res
        .status(400)
        .json("new password can not be same as old password");
    }

    user.password = newPassword;
    await user.save();

    const data = { username: user.name, userId: user._id, role: user.role };

    createJWT(data, res);

    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const { userId } = req.user;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const user = await User.find({});

    if (!user) {
      res.json("user not found ");
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error all users :", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getSingleUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.json("user not found");
  }

  res.status(200).json(user);
};

export const updateRole = async (req, res) => {
  try {
    const { email, name, role } = req.body;
    const { id } = req.params;
    const newUserData = {
      name: name,
      email: email,
      role: role,
    };

    const user = await User.findByIdAndUpdate(id, newUserData, {
      new: true,
      runValidators: true,
      userFindAndModify: false,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error updating user role" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      res.json("user not found");
    }
    res.json("user deltete");
  } catch (error) {}
};

export const logoutUser = async (req, res) => {
  try {
    res.cookie("token", null, {
      httpOnly: true,
      expires: new Date(Date.now()),
    });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Logout failed" });
  }
};
