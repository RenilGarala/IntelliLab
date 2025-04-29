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

        console.log("1");
        
        if(existingUser){
            return res.status(400).json({
                message: "User already exists",
            });
        }
        console.log("2");


        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = await db.user.create({
            data:{
                email,
                password: hashedPassword,
                name,
                role: UserRole.USER
            }
        })

        console.log("3");

        const token = jwt.sign(
            { id: newUser.id },           
            process.env.JWT_KEY,           
            { expiresIn: "7d" }          
          );

        console.log("4");

        res.cookie("jwt", token , {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "development",
            maxAge: 1000 * 60 * 60 * 24 * 7
        });

        console.log("5");


        res.status(201).json({
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
            error: "Error creating user",
        });
    }

}

export const login = async (req,res)=>{}

export const logout = async (req,res)=>{}

export const check = async (req,res)=>{}