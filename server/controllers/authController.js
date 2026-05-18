import userModel from "../models/userModel.js";
import { hashPassword, comparePassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";

// REGISTER
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    if (!name || !email || !password || !phone || !address) {
      return res.send({ message: "All fields are required" });
    }
    // Check existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({ success: false, message: "Email already registered" });
    }
    // Register user
    const hashedPassword = await hashPassword(password);
    const user = await new userModel({ name, email, phone, address, password: hashedPassword }).save();

    res.status(201).send({ success: true, message: "User Registered Successfully", user });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Error in Registration", error });
  }
};

// LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({ success: false, message: "Invalid email or password" });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({ success: false, message: "Email is not registered" });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({ success: false, message: "Invalid Password" });
    }
    // Token generation
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET || "VISITHA_SECRET_KEY", {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "Login successfully",
      user: { _id: user._id, name: user.name, email: user.email, phone: user.phone, address: user.address, role: user.role },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Error in login", error });
  }
};