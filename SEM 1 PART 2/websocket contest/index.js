    import express from "express";
    import jwt from "jsonwebtoken";
    import { mongoose } from "mongoose";
    import { usermodel, quizmodel } from "./models.js";
    import { QuizSchema, Signupschema, SigninSchema, QuestionSchema } from "./types.js";
    const JWT_SECRET = "akshat123";
    import { authmiddlware } from "./authiddleware.js";
    await mongoose.connect("mongodb+srv://Warrior07A:UWrenGXgSprYx1ir@cluster0.ru0uizx.mongodb.net/menti");
    const app = express();
    app.use(express.json());

    app.post("/api/auth/signup", async (req, res) => {
        const { success, data } = Signupschema.safeParse(req.body);
        if (!success) {
            res.status(400).json({
                "success": false,
                "error": "Invalid request schema",
                "details": { "email": "Invalid email format" }
            });
            return;
        }
        const found = await usermodel.findOne({
            email: data.email
        })
        if (found) {
            res.status(400).json({
                success: false,
                error: "User with this email already exists",
                details: { email: "Already Exists" }
            })
            return;
        }
        const user = await usermodel.create({
            _id: data._id,
            name: data.name,
            email: data.email,
            password: data.password,
            role: data.role
        })
        if (user) {
            res.status(201).json({
                "success": true,
                "data": { "_id": user._id, "name": data.name, "email": data.email, "role": data.role }
            })
        }
        else {
            res.json({ msg: "user has not been created" });
        }
    })

    app.post("/api/auth/login", async (req, res) => {
        const { success, data } = SigninSchema.safeParse(req.body);
        if (!success) {
            res.status(400).json({
                "success": false,
                "error": "Invalid request schema",
                "details": { "email": "Invalid email format" }
            });
            return;
        }
        const found = await usermodel.findOne({
            email: data.email,
            password: data.password
        })
        if (found) {
            const _id = found._id;
            const role = found.role;

            let token = jwt.sign({ _id, role }, JWT_SECRET);
            res.status(200).json({
                "success": true,
                "data": { "token": token }
            })
        } else {
            res.status(400).json({
                success: false,
                error: "user not found",
                details: { email: "Invalid email or password" }
            })
        }

    })
    app.get("/api/auth/me", authmiddlware, async (req, res) => {
        const _id = req._id;
        const user = await usermodel.findOne({
            _id: _id
        })
        console.log("hello");
        if (user) {
            res.status(200).json({
                "success": true,
                "data": { "_id": user._id, "name": user.name, "email": user.email, "role": user.role }
            })
        }
        else {
            res.status(401).json({
                "success": false,
                "error": "Unauthorized, token missing or invalid"
            })
        }
    })

    app.post("/api/quiz", authmiddlware, async (req, res) => {
        const _id = req._id;
        const role = req.role;
        console.log(role);
        if (role == "admin") {

            const { success, data, error } = QuizSchema.safeParse(req.body);
            if (!success) {
                res.status(400).json({
                    "success": false,
                    "error": "Invalid request schema",
                })
                return;
            }
            const quizadd = await quizmodel.create({
                title: data.title,
                questions: data.questions
            })
            if (quizadd) {
                res.status(201).json({
                    "success": true,
                    "data": { "_id": quizadd._id, "title": quizadd.title }
                })
            }
        } else {
            res.status(401).json({
                "success": false,
                "error": "Unauthorized, admin access required"
            })
        }
    })

    app.post("/api/quiz/:quizId/questions", authmiddlware, async (req, res) => {
        const quizid = req.params.quizId;
        const role = req.role;
        if (role == "admin") {
            const { success, data, error } = QuestionSchema.safeParse(req.body);
            if (!success) {
                res.status(400).json({
                    "success": false,
                    "error": "Invalid request schema",
                })
                // console.log(error);
                return;
            }
            let quizfound = await quizmodel.findOne({
                _id: quizid
            })
            quizfound.question.push({
                "text": "What is Node.js?",
                "options": ["Runtime", "Framework", "Library"],
                "correctOptionIndex": 0
            })
            await quizfound.save();
            console.log(quizfound);
            res.status(201).json({
                "success": true, 
                "data": {
                    "quizId": quizid,
                    "question": {
                        "_id": quizfound.question._id,
                        "text": quizfound.question.text,
                        "options": quizfound.question.options,
                        "correctOptionIndex": quizfound.question.correctOptionIndex
                    }
                }
            })
        } else {
            res.status(401).json({
                "success": false,
                "error": "Unauthorized, admin access required"
            })
        }
    })

    app.get("/api/quiz/:quizId", authmiddlware ,async (req, res) => {
        const quizid = req.params.quizId;
        const role = req.role;
        if (role == "admin") {
            const { success, data, error } = QuizSchema.safeParse(req.body);
            if (!success) {
                res.status(400).json({
                    "success": false,
                    "error": "Invalid request schema",
                })
                return;
            }
            let quizfound = await quizmodel.findOne({
                _id: quizid
            })
            if (quizfound) {
                res.status(201).json(
                    {
                        "success": true,
                        "data": {
                            "quizId": quizid,
                            "question": {
                                "_id": _id,
                                "text": quizfound.questions.text,
                                "options": quizfound.questions.options,
                                "correctOptionIndex": quizfound.questions.correctOptionIndex
                            }
                        }
                    })
            } else {
                res.status(404).json({
                    "success": false,
                    "error": "Quiz not found"
                })
            }
        } else {
            res.status(401).json({
                "success": false,
                "error": "Unauthorized, admin access required"
            })
        }
    })

    app.get("/api/quiz/:quizId", (req, res) => {

    })
    app.listen(3000);
