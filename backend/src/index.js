import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"

dotenv.config();
const app = express();
const PORT = process.env.PORT||3000;

app.get("/", (req, res)=>{
    res.send("Hello");
})

app.use(cookieParser);

app.listen(PORT, ()=>{
    console.log("listening port" ,PORT);
})
