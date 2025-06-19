import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import problemRoutes from "./routes/problem.routes.js";
import executionRoute from "./routes/execute.routes.js";
import submissionRoute from "./routes/submission.routes.js";
import playlistRoutes from "./routes/playlist.routes.js";
import cors from "cors";
import sheetRoutes from "./routes/sheet.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = [
  "http://localhost:5173", 
  "https://intelli-lab.vercel.app",
  "https://www.intellilab.in",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(cookieParser());


app.get("/", (req, res) => {
  res.send("Hello Bro Welcome to IntelliLab 🔥");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/problems", problemRoutes);
app.use("/api/v1/execute-code", executionRoute);
app.use("/api/v1/submission", submissionRoute);
app.use("/api/v1/playlist", playlistRoutes);
app.use("/api/v1/sheet", sheetRoutes);

app.listen(PORT, () => {
  console.log("listening port", PORT);
});
