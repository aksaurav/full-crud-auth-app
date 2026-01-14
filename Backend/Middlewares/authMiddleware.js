import jwt from "jsonwebtoken";
import User from "../Models/userModel.js";

const protect = async (req, res, next) => {
  let token;

  try {
    // Check for token in headers
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from token
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: `Not authorized, token failed` });
    }

    // Allow the user to continue
    next();
  } catch (error) {
    res.status(401).json({ message: `Not authorized, token failed` });
  }
};

export default protect;
