import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import { dbHealthCheck } from "./src/utils/dbHealthCheck.js";
import { taskRoute } from "./src/routes/task.route.js"
import { authRoute } from "./src/routes/auth.routes.js";
dotenv.config();

const app=express();

// app.use(cors());

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://login-frontend-six-tau.vercel.app"
  ],
  credentials: true
}));
app.use(express.json());
app.use("/tasks", taskRoute);
app.use("/auth", authRoute);


const PORT = process.env.PORT || 5547;

app.listen(PORT, async()=>{

    await dbHealthCheck();

    console.log(`Server running in port ${PORT}`);
})

