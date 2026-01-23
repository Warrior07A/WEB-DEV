import express from "express";
import {Client} from "pg";
import jwt from "jsonwebtoken"
import { bookingSchema, bookingupdateSchema, signinSchema, signupSchema } from "./types.js";
const app = express();
const SECRET = "Akshat";
app.use(express.json());

const client = new Client({
    connectionString : "postgresql://neondb_owner:npg_E1MsNnuU3IDZ@ep-divine-block-ahro28uc-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
})

client.connect();

function ferr(msg ,code, res){
    return res.status(code).json({
        success:false,
        error:msg
    })
}
async function authm(req,res,next){
    let token = req.headers.authorization;
    if (!token){
        return ferr("Authorization header missing" , 401 , res);
    }
    token = token.split(" ")[1];
    if(!token){
        return ferr("Token missing after Bearer",401 , res);
    }
    try{
        const {id,username} = jwt.verify(token , SECRET);
        req.user = {
            userId:id,
            username : username
        };
        next();
    }catch(e){
        ferr("Token invalid",401 , res);
    }
    
}
app.post("/auth/signup",async(req,res)=>{
    const {success,data} = signupSchema.safeParse(req.body);
    if(!success){
        return ferr("invalid inputs" , 400 , res);
    }
    try{
        const checkuser = await client.query(
        `
            SELECT *  FROM users WHERE username = '${data.username}'   
        `)
        // res.json(checkuser);
        if (checkuser.rowCount){
            return ferr("username already exists",409 , res);
        }
        const adduser  = await client.query(
            `
            INSERT INTO users (username , password) 
            VALUES ('${data.username}' , '${data.password}')
            RETURNING *
            `
        )

        return res.status(201).json({
            success: true,
            data: {
            "message":"User created successfully",
            "userId": adduser.rows[0].id
            }}
        )
    }catch(e){
        return ferr(e.message , 500 , res);
    }
})

app.post("/auth/login",async(req,res)=>{
    const {success,data} = signinSchema.safeParse(req.body);
    if(!success){
        ferr("invalid inputs" , 400 ,res);
    }
    const checkuser = await client.query(
    `
        SELECT *  FROM users
        WHERE username = '${data.username}' 
    `)
    if (!checkuser.rowCount){
        ferr("user does not exist",401 ,res);
    }
    const checkpass = await client.query(
        `
        SELECT * FROM users 
        WHERE password = '${data.password}'
        `
    )
    if (!checkpass){
        ferr("incorrect password",401,res);
    }
    const id = checkuser.rows[0].id;
    const username = data.username;
    const token = jwt.sign({id,username} ,SECRET);
    return res.status(200).json({
        success: true,
        data: {
        "message":"Login successful",
        "token" : token
        }}
    )

})

app.post("/bookings", authm,async(req,res)=>{
    const {userId , username } = req.user;
    const {success,data} = bookingSchema.safeParse(req.body);
    if(!success || data.days > 365 || data.rentPerDay > 2000){
        return ferr("invalid inputs" , 400 , res);
    }
    try{
        const adddata  = await client.query(
            `
            INSERT INTO bookings 
            (user_id, car_name , days,  rent_per_day)
            VALUES ('${userId}' , '${data.carName}'  , '${data.days}' , '${data.rentPerDay}')
            RETURNING *
            `
        )
        if (adddata.rowCount){
            return res.status(201).json({
                success: true,
                data: {
                "message":"Booking created successfully",
                "bookingId":adddata.rows[0].id,
                "totalCost":adddata.rows[0].days * adddata.rows[0].rent_per_day
                }
            })
        }
    }catch(e){
        return ferr(e.message, 500,res);
    }

})

app.get("/bookings",authm,async(req,res)=>{
    const {userId , username } = req.user;
    let bookingId = req.query.bookingId;
    const summary = req.query.summary;
    try{
        let bookingdata = await client.query(
            `
            SELECT * FROM bookings 
            WHERE id = '${bookingId}' AND STATUS != 'cancelled'
            `
        )
        let userbooking = await client.query(
            `
            SELECT * FROM bookings
            WHERE user_id = '${userId}'
            `
        )
        let bdata = bookingdata;
        let totalAmountSpent = 0;
        for(let i = 0;i<userbooking.rows.length;i++){
            totalAmountSpent += userbooking.rows[i].rent_per_day * userbooking.rows[i].days;
        }
        bookingdata  = bookingdata.rows[0];
        let totalCost = bookingdata.days * bookingdata.rent_per_day;
        if (!summary){
            return res.status(200).json({
                success: true,
                data: [
                {
                "id":bookingdata.id,
                "car_name" : bookingdata.car_name,
                "days":bookingdata.days,
                "rent_per_day":bookingdata.rent_per_day,
                "status":bookingdata.status,
                "totalCost":totalCost
                }]
            })
        }else{
            return res.status(200).json({
                success: true,
                data: {
                "userId":userId,
                "username" : username,
                "totalBookings": userbooking.rowCount,
                "totalAmountSpent": totalAmountSpent
                }
                })
        }
    }catch(e){
        ferr("bookingId not found" , 404,res);
    }
})

app.put("/bookings/:bookingId",authm, async(req,res)=>{
    let bookingId = req.params.bookingId;
    const {userId , username} = req.user;
    let {success,data} = bookingupdateSchema.safeParse(req.body);
    if (!success){
        ferr("invalid inputs", 400 , res);
    }
    try{
        const checkbooking  = await client.query(
            `
            SELECT * FROM bookings 
            WHERE id = '${bookingId}'
            `
        )
        if (!checkbooking.rowCount){
            ferr("booking not found" ,404 ,res );
        }
        const checkuser = await client.query(
            `
            SELECT * FROM bookings 
            WHERE user_id = '${userId} AND id = '${bookingId}'
            `
        )
        if (!checkuser){
            ferr("booking does not belong to user" , 403 ,res);
        }
        const userdata = checkuser.rows[0];
        let updatedata ;
        if (!data.status){
            updatedata = await client.query(
                `
                UPDATE bookings 
                SET 
                carName = '${data.carName}',
                days = '${data.days}',
                rent_per_day = '${data.rentPerDay}'
                `
            ) 
        }else{
            updatedata = await client.query(
                `
                UPDATE bookings 
                SET status = '${completed}'  
                `
            )
        }
        return res.status(200).json({
            success: true,
            data: {
            "message":"Booking updated successfully",
            "booking":{
            "id":updatedata.id,
            "car_name":updatedata.car_name,
            "days":updatedata.days,
            "rent_per_day":updatedata.rent_per_day,
            "status" : updatedata.status,
            "totalCost": updatedata.days * updatedata * rent_per_day
            }
            }
        })
    }catch(e){
        ferr(e.message , 500,res);
    }
})

app.post("/bookings/:bookingId",authm, async(req,res)=>{
    const {userId , username} = req.user;
    const bookingId = req.params.bookingId;
    try{
        const checkbooking = await client.query(
            `
            SELECT * FROM bookings 
            WHERE id = '${bookingId}'
            `
        )
        if (!checkbooking.rowCount){
            ferr("booking not found",404 , res);
        }
        const checkuser = await client.query(
            `
            SELECT * FROM bookings 
            WHERE id = '${bookingId}' AND user_id  = '${userId}'
            `
        )
        if (!checkuser.rowCount){
            ferr("booking does not belong to user",403 ,res) ;
        }
        const deletebooking = await client.query(
            `
            DELETE FROM bookings    
            WHERE id = '${bookingId}'
            `
        )
        return res.status(200).json({
            success: true,
            data: {
            "message":"Booking deleted successfully"
            }
            })
    }catch(e){
        ferr(e.message , 500,res);
    }
})

app.listen(3000);