import { env } from "../config/env.js";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export async function protect(req, res, next) {
  console.log(req.cookies?.token);
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ success: false, message: "Not authorised" });
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User no longer exists" });
    }

    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ success: false, message: "Access denied: admins only" });
    }

    req.user = user;
    next();
  } catch {
    res
      .status(401)
      .json({ success: false, message: "Token invalid or expired" });
  }
}
