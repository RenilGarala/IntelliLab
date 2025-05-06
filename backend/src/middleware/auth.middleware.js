import jwt, { decode } from "jsonwebtoken";
import { db } from "../libs/db.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    //check token is available or not
    if (!token) {
      return res.status(400).json({
        message: "Unauthorized access. Please log in or check your credentials.",
      });
    }
    
    let decoded;

    //check token is valid or not
    try {
      decoded = jwt.verify(token, process.env.JWT_KEY);
    } catch (error) {
      return res.status(400).json({
        message: "Unauthorized access. Invalid Token.",
      });
    }

    //find user with the help of decoded token
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

    //if user not available with this token
    if(!user){
        return res.status(404).json({
            message: "Unauthorized User.",
        });
    }

    //if user available then attach user with request 
    req.user = user;
    next();

  } catch (error) {
    return res.status(500).json({
        message: "Error authenticating User",
    });
  }
};
