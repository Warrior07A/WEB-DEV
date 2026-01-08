import express from "express";
import { signinSchema, signupSchema, todoSchema, updatetodo } from "./types.js";
import {Client} from "pg";
import jwt  from "jsonwebtoken";
import { auth } from "./auth.js";
export const SECRET = "akshat";
const app = express();
app.use(express.json());

const client = new Client({
    connectionString : "postgresql://neondb_owner:npg_gexACwsrh4o2@ep-polished-fog-adbzsatz-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
})
client.connect();

async function tableCreate(){
    const response = await client.query(`
        CREATE TABLE IF NOT EXISTS users (
            id  SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL 
        )`)
    if (response.rows && response.rows[0]){
        console.log("table1 created successfully");
    }else console.log("table1 already there");
    
    const r2 = await client.query(`
        CREATE TABLE IF NOT EXISTS todo(
            id SERIAL NOT NULL PRIMARY KEY,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            completed BOOLEAN NOT NULL,
            userid INT NOT NULL REFERENCES users(id)
        )`)
    if (r2.rows  && r2.rows[0]){
        console.log("table2 created successfully");
    }else console.log("table2 already there");

    }
tableCreate();


app.post("/signup",async(req,res)=>{
    const {success,data} = signupSchema.safeParse(req.body);
    if (success){
        const finduser = await client.query(
            `
            SELECT * FROM users WHERE "username" = '${data.username}'
            `
        )
        if (finduser.rows && finduser.rows[0]){
            return res.json({
                msg  :"user already exists"
            })
        }
        const dataentry = await client.query(
            `INSERT INTO "users" 
            ("name" , "username" , "password")
             VALUES ('${data.name}', '${data.username}', '${data.password}') RETURNING *`
        )
        return res.json({
            "id" : dataentry
        })
    }
    return res.json({
        "msg" : "invalid credentials"
    })
})

app.post("/signin",async(req,res)=>{
    const {success,data} = signinSchema.safeParse(req.body);
    if (success){
        const userfound = await client.query(
            `
            SELECT * FROM users
            WHERE "username" = '${data.username}'
            AND "password" = '${data.password}'`
        )
        const id = userfound.rows[0].id;
        if (userfound.rows && userfound.rows[0]){
            const token = jwt.sign({id}, SECRET);
            res.json({
                id : id ,   
                token : token
            })
            return;
        }
        res.json({
            msg : "user doesn't exist"
        })
        return;
    }
    return res.json({
        "msg" : "invalid credentials"
    })

})

app.post("/todos",auth,async(req,res)=>{
    const userid = req.id;
    const {success,data} = todoSchema.safeParse(req.body);
    if (success){
        const todoadd = await client.query(
            `
            INSERT INTO "todo"
             ("title" , "description", "completed" , "userid")
             VALUES ('${data.title}' , '${data.description}' , '${data.completed}' , '${data.user_id}' )
                RETURNING *
             `
        )
        if (todoadd.rows && todoadd.rows[0]){
            return res.json({
                id : todoadd.rows.id ,
                msg : "todo has been added successfully"
            })
        }
        res.json({
            msg : "error adding todo"
        })
        return;
    }
    return res.json({
        "msg" : "invalid credentials"
    })
})

app.get("/todos",async(req,res)=>{
    const todos = await client.query(`
        SELECT * FROM todo
        `)
        res.json({
            todos : todos.rows
        })
})

app.put("/update",auth,async(req,res)=>{
    const userid = req.id;
    const {success,data} = updatetodo.safeParse(req.body);
    if (success){
        try{
            const todoadd = await client.query(
                `
                UPDATE todo 
                SET "completed" = '${data.completed}'
                WHERE "id" = '${data.id}'
                RETURNING *
                `
            )
            if (todoadd.rows && todoadd.rows[0]){
                return res.json({
                    id : todoadd.rows[0].id ,
                    msg : "todo has been UPDATED successfully"
                })
            }
            res.json({
                msg : "error updating todo"
            })
            return;
        }catch(e){
            res.json({
                msg : "do not try to update other's todo do onloy yours"
            })
        }
    }
    return res.json({
        "msg" : "invalid credentials"
    })
})

app.delete("/delete",auth,async(req,res)=>{
    const {id} = req.body;
    try{
        const todod = await client.query(
            `
            DELETE FROM todo
            WHERE "id" = '${id}'
            RETURNING *
            `
        )
        if (todod.rows && todod.rows[0]){
            res.json({
                msg : "todo has been deleted successfully"
            })
        }
    }catch(e){
        res.json({
            msg : e.message
        })
    }
})


app.listen(3000);
