import bcrypt from "bcryptjs";
import { db } from "../libs/db.js";
// import { UserRole } from "../generated/prisma/index.js";
import jwt from "jsonwebtoken";
import {
  // LoginUserSchema,
  registerUserSchema,
} from "../validators/auth.validator.js";
import nodemailer from "nodemailer";

export const sendMail = async (to, subject, { name, otp }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const html = `
    <h3>Hello ${name},</h3>
    <p>Your OTP for email verification is: <b>${otp}</b></p>
    <p>It will expire in 5 minutes.</p>
  `;

  await transporter.sendMail({
    from: `"Intellilab" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};

// export const register = async (req, res) => {
//   const { email, password, name } = req.body;

//   const data = registerUserSchema.safeParse(req.body);

//   if (!data) {
//     return res.status(400).json({
//       message: "Validation failed",
//       errors: data.error.errors[0].message,
//     });
//   }

//   try {
//     const existingUser = await db.user.findUnique({
//       where: {
//         email: email,
//       },
//     });

//     if (existingUser) {
//       return res.status(400).json({
//         message: "User already exists",
//       });
//     }

//     const hashedPassword = await bcrypt.hash(password, 12);

//     const newUser = await db.user.create({
//       data: {
//         email,
//         password: hashedPassword,
//         name,
//         role: UserRole.USER,
//       },
//     });

//     const token = jwt.sign({ id: newUser.id }, process.env.JWT_KEY, {
//       expiresIn: "7d",
//     });

//     res.cookie("jwt", token, {
//       httpOnly: true,
//       sameSite: "None",
//       secure: process.env.NODE_ENV !== "development",
//       maxAge: 1000 * 60 * 60 * 24 * 7,
//     });

//     res.status(201).json({
//       success: true,
//       message: "User created successfully",
//       user: {
//         id: newUser.id,
//         email: newUser.email,
//         name: newUser.name,
//         role: newUser.role,
//         image: newUser.image,
//       },
//     });
//   } catch (error) {
//     console.log(error);

//     return res.status(500).json({
//       error: "An error occurred while creating the user.",
//     });
//   }
// };
export const register = async (req, res) => {
  const data = registerUserSchema.safeParse(req.body);

  if (!data) {
    return res.status(400).json({
      message: "Validation failed",
      errors: data.error.errors[0].message,
    });
  }

  try {
    const { email, name, password } = req.body;

    const existingUser = await db.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userPayload = {
      name,
      email,
      password: hashedPassword,
    };

    const otp = Math.floor(100000 + Math.random() * 900000);

    const activationToken = jwt.sign(
      {
        user: userPayload,
        otp,
      },
      process.env.ACTIVATION_SECRET,
      { expiresIn: "5m" },
    );

    // Send mail
    await sendMail(email, "Intellilab | OTP Verification", { name, otp });

    return res.status(200).json({
      message: "OTP sent to your email.",
      activationToken,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Error in sending mail",
    });
  }
};

export const verify = async (req, res) => {
  try {
    const { otp, activationToken } = req.body;

    let decoded;

    try {
      decoded = jwt.verify(activationToken, process.env.ACTIVATION_SECRET);
    } catch (error) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const { user, otp: tokenOtp } = decoded;

    if (tokenOtp != otp) {
      return res.status(400).json({ message: "Incorrect OTP" });
    }

    const alreadyExists = await db.user.findUnique({
      where: { email: user.email },
    });

    if (alreadyExists) {
      return res.status(400).json({ message: "User already registered" });
    }

    const createdUser = await db.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });

    const token = jwt.sign({ id: createdUser.id }, process.env.JWT_KEY, {
      expiresIn: "7d",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "development" ? "Lax" : "None",
      secure: process.env.NODE_ENV !== "development",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
      },
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error in register user",
    });
  }
};

export const login = async (req, res) => {
  console.log("Login request received");
  const { email, password } = req.body;

  try {
    // const data = LoginUserSchema.safeParse(req.body);

    // if (!data.success) {
    //   return res.status(400).json({
    //     message: "Validation failed",
    //     errors: data.error.errors[0].message,
    //   });
    // }

    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({
        message: "User does not exist. Please check your email and try again.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password. Please try again.",
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_KEY, {
      expiresIn: "7d",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "development" ? "Lax" : "None",
      secure: process.env.NODE_ENV !== "development",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return res.status(200).json({
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
    console.log(error);
    return res.status(500).json({
      error: "An error occurred while logging in.",
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "None",
      secure: process.env.NODE_ENV !== "development",
    });

    res.status(200).json({
      success: true,
      message: "Logout successfully.",
    });
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong during logout. Please try again.",
    });
  }
};

export const checkAuth = async (req, res) => {
  try {
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
      error: "Failed to fetch playlists",
    });
  }
};
