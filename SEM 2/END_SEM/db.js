import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true }
})

const classSchema = new mongoose.Schema({
    className: { type: String, required: true },
    teacherId: { type: mongoose.Types.ObjectId, required: true, ref: "classes" },
    studentIds: [{ type: mongoose.Types.ObjectId, ref: "users" }]
})
const attendanceSchema = new mongoose.Schema({
    classId: { type: mongoose.Types.ObjectId, required: true, ref: "classes" },
    studentId: { type: mongoose.Types.ObjectId, required: true, ref: "classes" },
    status: { type: String, required: true }
})

export const usermodel = mongoose.model("users", UserSchema);
export const classmodel = mongoose.model("classes", classSchema);
export const attendancemodel = mongoose.model("attendance", attendanceSchema);