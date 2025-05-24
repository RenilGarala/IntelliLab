import bcrypt from "bcryptjs";
import { db } from "../libs/db.js";
import { UserRole } from "../generated/prisma/index.js";
import jwt from "jsonwebtoken";
import { LoginUserSchema, registerUserSchema } from "../validators/auth.validator.js";

export const register = async (req, res) => {
  const { email, password, name } = req.body;

  const data = registerUserSchema.safeParse(req.body);

  if (!data.success) {
    return res.status(400).json({
      message: "Validation failed",
      errors: data.error.errors[0].message,
    });
  }

  try {
    const existingUser = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: UserRole.USER,
      },
    });

    const token = jwt.sign({ id: newUser.id }, process.env.JWT_KEY, {
      expiresIn: "7d",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        image: newUser.image,
      },
    });
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while creating the user.",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const data = LoginUserSchema.safeParse(req.body);

  if (!data.success) {
    return res.status(400).json({
      message: "Validation failed",
      errors: data.error.errors[0].message,
    });
  }

  try {
    const user = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      req.status(400).json({
        message: "User does not exist. Please check your email and try again.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(401).json({
        message: "Invalid email or password. Please try again.",
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_KEY, {
      expiresIn: "7d",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res.status(201).json({
      success: true,
      message: "User logged in successfully.",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        image: user.image,
      },
    });
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while logging in.",
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    });

    res.status(200).json({
      success: true,
      message: "User logged out successfully.",
    });
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong during logout. Please try again.",
    });
  }
};

export const checkAuth = async (req, res) => {
  try {
    //extract user from middleware and send as a response
    res.status(200).json({
      success: true,
      message: "User Authenticate Successfully",
      user: req.user,
    });
  } catch (error) {
    res.status(400).json({
      message: "Unauthorized access. Login required.",
    });
  }
};

export const getSubmissions = async (req, res) => {
  try {
    const submissions = await db.submission.findMany({
      where: {
        userId: req.user.id,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Submissions fetched successfully",
      submissions,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Failed to fetch submissions",
    });
  }
};

export const getUserPlaylists = async (req, res) => {
  try {
    const playLists = await db.playlist.findMany({
      where: {
        userId: req.user.id,
      },
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
      },
    });

    res.status(200).json({
      success: true,
      message: "Playlists fetched successfully",
      playLists,
    });
  } catch (error) {
    res.status(500).json({ 
      error: "Failed to fetch playlists" 
    });
  }
};
