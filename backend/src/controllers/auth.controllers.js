import bcrypt from "bcryptjs";
import { db } from "../libs/db.js";
import { UserRole } from "../generated/prisma/index.js";
import jwt from "jsonwebtoken"

export const register = async (req,res)=>{
    const {email, password, name} = req.body;

    if(!name || !email || !password){
        return res.status(400).json({
            message: "All field is required",
        });
    }

    if(password.length < 6){
        return res.status(400).json({
            message: "Password must be in 6 letter",
        });
    }

    try {
        const existingUser = await db.user.findUnique({
            where:{
                email:email
            }
        })
  
        if(existingUser){
            return res.status(400).json({
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = await db.user.create({
            data:{
                email,
                password: hashedPassword,
                name,
                role: UserRole.USER
            }
        })

        const token = jwt.sign(
            { id: newUser.id },           
            process.env.JWT_KEY,           
            { expiresIn: "7d" }          
          );

        res.cookie("jwt", token , {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "development",
            maxAge: 1000 * 60 * 60 * 24 * 7
        });

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user:{
                id: newUser.id,
                email: newUser.email,
                name: newUser.name,
                role: newUser.role,
                image: newUser.image,
            }
        })
    } catch (error) {
        return res.status(500).json({
            error: "An error occurred while creating the user.",
        });
    }

}

export const login = async (req,res)=>{
    const {email, password} = req.body;

    if(!email || !password){
        res.status(401).json({
            message: "All fields are required."
        })
    }

    try {
        const user = await db.user.findUnique({
            where:{
                email:email
            }
        })
    
        if(!user){
            req.status(400).json({
                message: "User does not exist. Please check your email and try again."
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            res.status(401).json({
                message: "Invalid email or password. Please try again."
            })
        }

        const token = jwt.sign({id: user.id}, process.env.JWT_KEY, {expiresIn: "7d"});

        res.cookie("jwt", token , {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "development",
            maxAge: 1000 * 60 * 60 * 24 * 7
        });

        res.status(201).json({
            success: true,
            message: "User logged in successfully.",
            user:{
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                image: user.image,
            }
        })

    } catch (error) {
        return res.status(500).json({
            error: "An error occurred while logging in.",
        });
    }
}

export const logout = async (req,res)=>{
    try {
        res.clearCookie("jwt",{
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "development",
        })

        res.status(200).json({
            success: true,
            message: "User logged out successfully."
        })
    } catch (error) {
        res.status(400).json({
            message: "Something went wrong during logout. Please try again."
        });      
    }
}

export const checkAuth = async (req,res)=>{
    try {
        //extract user from middleware and send as a response
        res.status(200).json({
            success: true,
            message: "User Authenticate Successfully",
            user: req.user,
        })
    } catch (error) {
        res.status(400).json({
            message: "Unauthorized access. Login required."
        })
    }
}

export const getSubmission = async (req, res)=>{
}

export const getUserPlaylists = async (req, res)=>{
}