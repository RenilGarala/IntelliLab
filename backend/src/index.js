import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"

import authRoutes from "./routes/auth.routes.js";
import problemRoutes from "./routes/problem.routes.js";
import executionRoute from "./routes/execute.routes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT||3000;

app.get("/", (req, res)=>{
    res.send("Hello Bro Welcome to IntelliLab 🔥");
})

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/problems', problemRoutes)
app.use('/api/v1/execute-code', executionRoute)

app.listen(PORT, ()=>{
    console.log("listening port" ,PORT);
})
