import express from "express";
const app = express();
import { mongoose } from "mongoose";
import jwt from "jsonwebtoken";
import { usermodel, classmodel, attendancemodel } from "./db.js";
import { classSchema, Signinschema, Signupschema, studentSchema,attendanceSchema } from "./types.js";
import { authmiddleware } from "./authmiddleware.js";
export const JWT_SECRET = "akshat123";
app.use(express.json());
mongoose.connect("mongodb+srv://Warrior07A:UWrenGXgSprYx1ir@cluster0.ru0uizx.mongodb.net/attendance")

app.post("/auth/signup", async (req, res) => {
    const { success, data } = Signupschema.safeParse(req.body);
    if (!success) {
        res.status(400).json({
            "success": false,
            "error": "Invalid request schema",
        })
    } else {
        try{
            const useradd = await usermodel.create({
                "name": data.name,
                "email": data.email,
                "password": data.password,
                role: data.role
            })
        }catch(e){
            res.status(400).json({
                "success": false,
                "error": "Email already exists"
              })
        }
        const userdata = await usermodel.findOne({
            "name": data.name,
            "email": data.email,
        })
        res.status(201).json({
            "success": true,
            "data": {
                "_id": userdata._id,
                "name": userdata.name,
                "email": userdata.email,
                "role": userdata.role
            }
        })
    }

})

app.post("/auth/login", async (req, res) => {   
    const { success, data } = Signinschema.safeParse(req.body);
    if (!success) {
        res.status(400).json({
            "success": false,
            "error": "Invalid request schema",
        })
    } else {
        try{
            const userfind = await usermodel.findOne({
                "email": data.email,
                "password": data.password,
            })
            const _id = userfind._id;
            const role = userfind.role;
            if (userfind) {
                const token = jwt.sign({ _id, role }, JWT_SECRET)
                if (userfind) {
                    const _id = userfind._id;
                    const role = userfind.role;
                    res.status(200).json({
                        "success": true,
                        "data": {
                            "token": token
                        }
                    })
                } else {
                    res.status(400).json({
                        "success": false,
                        "error": "Invalid email or password"
                    })
                }
            }
        }catch(e){
            res.status(404).json({
                "success": false,
                "error": "User not found"
              })
        }
        

    }
}
)

app.get("/auth/me", authmiddleware, async (req, res) => {
    const _id = req._id;
    const role = req.role;
    const userdata = await usermodel.findOne({
        _id: _id
    })
    res.status(200).json({
        "success": true,
        "data": {
            "_id": userdata._id,
            "name": userdata.name,
            "email": userdata.email,
            "role": userdata.role
        }
    })
})

app.post("/class", authmiddleware, async (req, res) => {
    const { success, data } = classSchema.safeParse(req.body);
    if (!success) {
        res.status(400).json({
            "success": false,
            "error": "Invalid request schema",
        })
    } else {
        const _id = req._id;
        const role = req.role;
        if (role == "teacher") {
            const classadd = await classmodel.create({
                className: data.className,
                teacherId: _id,
                studentIds: []
            })
            const classdata = await classmodel.findOne({
                teacherId: _id,
            })
            console.log(classdata);
            res.status(201).json({
                "success": true,
                "data": {
                    "_id": classdata._id,
                    "className": classdata.className,
                    "teacherId": classdata.teacherId,
                    "studentIds": classdata.studentIds
                }
            })
        } else {
            res.status(403).json({
                "success": false,
                "error": "Forbidden, teacher access required"
            })
        }
    }
})

app.post("/class/:id/add-student", authmiddleware, async (req, res) => {
    const { success, data } = studentSchema.safeParse(req.body);
    if (!success) {
        res.status(400).json({
            "success": false,
            "error": "Invalid request schema",
        })
    } else {
        const classId = req.params.id;
        const _id = req._id;
        const role = req.role;
        const classfound = await classmodel.findOne({
            _id : classId
        })
        if (classfound){
            if (role == "teacher") {
                
                const classdata = await classmodel.findOne({
                    _id: classId, 
                    teacherId : _id
                })
                if (classdata) {
                    const studentcheck = await usermodel.findOne({
                        _id : data.studentId
                    })
                    if (!classdata.studentIds.includes(data.studentId)){
                        classdata.studentIds.push(data.studentId);
                    }
                    await classdata.save();
                    res.status(200).json({
                        "success": true,
                        "data": {
                            "_id": classId,
                            "className": classdata.className,
                            "teacherId": classdata.teacherId,
                            "studentIds": classdata.studentIds
                        }
                    })
                } else {
                    res.status(403).json({
                        "success": false,
                        "error": "Forbidden, not class teacher"
                      })
                }
            } else {
                res.status(403).json({
                    "success": false,
                    "error": "Forbidden, teacher access required"
                })
            }
        }else{
            res.status(404).json({
                "success": false,
                "error": "Class not found"
              })
        }
    }
})

app.get("/class/:id",authmiddleware,async(req,res)=>{
    const classId = req.params.id;
    const classfound = await classmodel.findOne({
        _id : classId
    })
    if (classfound){
        const _id = req._id;
        const role = req.role;
        const classdata = await classmodel.findOne({
            _id : classId
        })
        let obj={
            "success": true,
            "data": {
              "_id": classdata._id,
              "className": classdata.className,
              "teacherId": classdata.teacherId,
              "students": [] 
            }
          }
        const studentIds = classfound.studentIds;
        for(let i=0;i<studentIds.length;i++){
            const userdata = await usermodel.findOne({
                _id : studentIds[i]
            })
            obj.data.students.push(userdata);
        }
        if (classdata.teacherId == _id || classdata.studentIds.includes(_id)){
            res.status(200).json(obj)
        }else{
            res.status(404).json({
                "success": false,
                "error": "User not found"
              })
        }
    }else{
        res.status(404).json({
            "success": false,
            "error": "Class not found"
          })
    }
})


app.get("/students",authmiddleware,async(req,res)=>{
    const role = req.role;
    if (role == "teacher"){
        const list_of_students = await usermodel.find({
            role : "student" 
        })
        let arr = []
        for(let i=0;i<list_of_students.length;i++){
            let obj={
                "_id" : list_of_students[i]._id,
                "name" : list_of_students[i].name,
                "email" : list_of_students[i].email
            }
            arr.push(obj)
        }
          res.status(200).json(arr);

    }else{
        res.status(403).json({
            "success": false,
            "error": "Forbidden, teacher access required"
          })
    }
})

app.post("/attendance/start",authmiddleware,async(req,res)=>{
    const role = req.role;
    const _id = req._id;
    const {success,data} = attendanceSchema.safeParse(req.body);
    if (!success) {
        res.status(400).json({
            "success": false,
            "error": "Invalid request schema",
        })
    } else{
        if (role == "teacher"){
            const classId = data.classId;
            const teacherverify = await classmodel.findOne({
                _id : classId,
                teacherId : _id
            })
            if (teacherverify){
                res.status(200).json({
                    "success": true,
                    "data": {
                      "classId": classId,
                      "startedAt": new Date().toISOString()
                    }
                  })
            }else{
                res.status(403).json({
                    "success": false,
                    "error": "Forbidden, not class teacher"
                  })
            }
        }else{
            res.status(403).json({
                "success": false,
                "error": "Forbidden, teacher access required"
              })
        }
    }

})

app.listen(3000);
