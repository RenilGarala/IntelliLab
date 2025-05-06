import jwt, { decode } from "jsonwebtoken";
import { db } from "../libs/db.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookie.jwt;

    if (!token) {
      return res.status(400).json({
        message: "Unauthorized access. Please log in or check your credentials.",
      });
    }

    let decoded;

    try {
      decoded = jwt.verify(token, process.env.JWT_KEY);
    } catch (error) {
      return res.status(400).json({
        message: "Unauthorized access. Invalid Token.",
      });
    }

    const user = await db.user.findUnique({
        where:{
            id: decoded.id
        },
        select:{
            id: true,
            image: true,
            name: true,
            email: true,
            role: true,
        }
    });

    if(!user){
        return res.status(404).json({
            message: "Unauthorized User.",
        });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({
        message: "Error authenticating User",
    });
  }
};
