import express from "express";
import dotenv from "dotenv";
import { SignUpSchema, SigninSchema, inputtodoSchema } from "./types.js";
import { usermodel } from "./db.js";
import mongoose from "mongoose";
import { authmiddleware } from "./authmiddlware";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());

// Environment variables
const SECRET = process.env.JWT_SECRET || "fallback-secret-change-in-production";
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://Warrior07A:UWrenGXgSprYx1ir@cluster0.ru0uizx.mongodb.net/new";
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect(MONGODB_URI);

// Export SECRET for authmiddleware
export { SECRET };
app.post("/signup", async (req, res) => {
    try {
        const { success, data } = SignUpSchema.safeParse(req.body);
        
        if (!success) {
            return res.status(400).json({ 
                error: "Invalid input. Please check your data and try again." 
            });
        }

        const emailfound = await usermodel.findOne({
            email: data.email
        });

        if (emailfound) {
            return res.status(409).json({ 
                error: "Email already exists" 
            });
        }

        // Hash password before storing
        const hashedPassword = await bcrypt.hash(data.password, 10);
        
        const newUser = await usermodel.create({
            name: data.name,
            email: data.email,
            password: hashedPassword,
            todos: []
        });

        if (newUser) {
            res.status(201).json({ 
                message: "You are signed up successfully" 
            });
        } else {
            res.status(500).json({ 
                error: "Failed to create user" 
            });
        }
    } catch (error) {
        res.status(500).json({ 
            error: "Internal server error" 
        });
    }
});

app.post("/signin", async (req, res) => {
    try {
        const { success, data } = SigninSchema.safeParse(req.body);
        
        if (!success) {
            return res.status(400).json({ 
                error: "Invalid input. Please check your data and try again." 
            });
        }

        const userfind = await usermodel.findOne({
            email: data.email
        });

        if (!userfind) {
            return res.status(401).json({ 
                error: "Invalid email or password" 
            });
        }

        // Compare password with hashed password
        const passwordMatch = await bcrypt.compare(data.password, userfind.password);
        
        if (!passwordMatch) {
            return res.status(401).json({ 
                error: "Invalid email or password" 
            });
        }

        const _id = userfind._id;
        const token = jwt.sign({ _id: _id, email: data.email }, SECRET);
        
        res.status(200).json({
            message: "Token has been created",
            token: token
        });
    } catch (error) {
        res.status(500).json({ 
            error: "Internal server error" 
        });
    }
});

app.post("/todo", authmiddleware, async (req, res) => {
    try {
        const { success, data } = inputtodoSchema.safeParse(req.body);
        const _id = req._id;

        if (!success) {
            return res.status(400).json({ 
                error: "Invalid input. Please check your data and try again." 
            });
        }

        const updatedUser = await usermodel.findOneAndUpdate(
            { _id: _id },
            { $push: { todos: data } },
            { runValidators: true, new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ 
                error: "User not found" 
            });
        }

        res.status(200).json({
            message: "Todo added successfully",
            todos: updatedUser.todos,
            success: true
        });
    } catch (error) {
        res.status(500).json({ 
            error: "Internal server error" 
        });
    }
});

app.delete("/todo", authmiddleware, async (req, res) => {
    try {
        const userId = req._id;
        const { todoid } = req.body;

        const result = await usermodel.findOneAndUpdate(
            { _id: userId },
            {
                $pull: {
                    todos: { _id: todoid }
                }
            },
            { new: true }
        );

        if (!result) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({
            message: "Todo deleted successfully",
            todos: result.todos
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.get("/todos", authmiddleware, async (req, res) => {
    try {
        const _id = req._id;
        const userTodos = await usermodel.findOne({
            _id: _id
        });

        if (!userTodos) {
            return res.status(404).json({ 
                error: "User not found" 
            });
        }

        res.status(200).json({
            todos: userTodos.todos
        });
    } catch (error) {
        res.status(500).json({ 
            error: "Internal server error" 
        });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});