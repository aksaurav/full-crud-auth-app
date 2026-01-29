import User from "../Models/userModel.js";
import jwt from "jsonwebtoken";

export const handleSignUp = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: `All fields are required` });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: `Password must be at least 8 characters` });
    }

    // Check existing User
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: `Email already in use` });
    }

    // Create user
    const user = await User.create({ firstName, lastName, email, password });

    // Generate Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: `7d`,
    });

    // Send Response
    res.status(201).json({
      message: "User signed up",
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error while signing up`, error: error.message });
  }
};

export const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: `All the fields are required` });
    }

    // Find the user at DB
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: `Invalid email or password` });
    }

    // Matching the entered password from the user
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: `Invalid email or password` });
    }

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: `7d`,
    });

    // Send Response
    res.status(200).json({
      message: `User logged in successfully`,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error while logging in`, error: error.message });
  }
};

export const handleGetUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(401).json({ message: `Pilot not found in registry` });
    }
    res.status(200).json({ message: `Pilot data retrieved` });
  } catch (error) {
    console.error("Profile Fetch Error:", error);
    res
      .status(500)
      .json({ message: `Telemetry Failure: Could not reach Pilot` });
  }
};
