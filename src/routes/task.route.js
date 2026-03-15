import express from "express";
import { addTask, getTasks, updateTask, deleteTask } from "../controllers/task.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

export const taskRoute = express.Router();

taskRoute.post("/addTask",authMiddleware,  addTask);
taskRoute.get("/getTasks",authMiddleware, getTasks);
taskRoute.patch("/updateTask/:id",authMiddleware, updateTask);
taskRoute.delete("/deleteTask/:id", authMiddleware, deleteTask);