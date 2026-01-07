import express from "express";
import { bookSchema, showSchema, signinSchema, signupschema } from "./types.js";
import jwt from "jsonwebtoken";
import { usermodel,showmodel, bookmodel } from "./models.js";
const SECRET = "akshat";
const app = express();

app.use(express.json());

async function adminmiddleware(req,res,next){
    const token = req.headers.authorization;
    // console.log(token);
    let tokeninput;
    try{
        const {_id ,role}= jwt.verify(token ,SECRET);
        req._id = _id;
        req.role = role;
        if(role == "admin"){
            next();
        }
        else{
            res.status(401).json({ "message": "Only admin can create shows" });
        }
        return;
    }catch(e){
        res.status(401).json({ "message": "Unauthorized" } );
    }
}
async function usermiddleware(req,res,next){
    const token = req.headers.authorization;
    try{
        const {_id ,role}= jwt.verify(token ,SECRET);
        req._id = _id;
        req.role = role;
        if(role == "user"){
            next();
        }
        else{
            res.status(401).json({ "message": "Admins cannot book tickets" });
        }
        return;
    }catch(e){
        res.status(401).json({ "message": "Unauthorized" } );
    }
}


app.post("/signup",async(req,res)=>{
    const {success,data} = signupschema.safeParse(req.body);
    if (success){
        try{
            if (data.role != "admin" || data.role != "user"){
                res.status(400).json({ "message": "role must be either user or admin" });
            }
            const usercheck = await usermodel.findOne({
                "username" : data.username,
                "email" : data.email
            })
            if (usercheck){
                res.status(400).json(
                    { "message": "User with this email or username already exists" }
                )
                return;
            }
            const useradd = await usermodel.create({
                "username": data.username,
                "email": data.email,
                "password": data.password,
                "role": data.role
            })
            res.status(201).json({
                "message": "Signup successful",
                "userId": useradd._id,
                "role": useradd.role
              }
              )
            return;
        }
        catch(e){
            res.json( { "message": "User with this email or username already exists" })
        }
    }
    if (data.role != "admin" || data.role != "user"){
        res.status(400).json({ "message": "role must be either user or admin" });
    }else{
        res.status(400).json({ "message": "username, email and password are required" });
    }
})

app.post("/login",async(req,res)=>{
    const {success,data} = signinSchema.safeParse(req.body);
    if (success){
        const usercheck = await usermodel.findOne({
            "email" : data.email,
            "password" : data.password
        })    
        if (!usercheck){
            res.status(401).json({ "message": "Invalid email or password" });
            return;
        }
        const _id = usercheck._id;
        const role = usercheck.role;
        const token = jwt.sign({_id : _id, role : role},SECRET); 
        res.status(200).json({
            "message": "Login successful",
            "token": token,
            "userId": usercheck._id,
            "role": usercheck.role
          })
        return;
    }
    res.status(400).json({ "message": " email and password are required" }
    )
})


app.post("/shows",adminmiddleware,async(req,res)=>{
    const _id = req._id;
    const role = req.role;
    const {success,data } = showSchema.safeParse(req.body);
    if (success){
        if (data.ticketPrice <= 0 || data.availableTickets <=0 ){
            res.status(400).json({ "message": "ticketPrice and availableTickets must be greater than 0" })
            return;
        }
        const showadd = await showmodel.create(
            {
                "movieName": data.movieName,
                "showTime": data.showTime,
                "ticketPrice": data.ticketPrice,
                "availableTickets": data.availableTickets          
            }
        )
        res.status(201).json(
            {
                "message": "Show created successfully",
                "showId": showadd._id
                }          
        )
        return;
    }
    res.json({
         "message": "movieName, showTime, ticketPrice and availableTickets are required" 
    })

})

app.get("/shows",adminmiddleware,async(req,res)=>{
    const shows = await showmodel.find().lean();
    let showarr = JSON.stringify(shows,null,4);
    res.status(201).send(showarr);


})

app.get("/shows/:showId",adminmiddleware,async(req,res)=>{
    try{
        const showId = req.params.showId;
        const showcheck = await showmodel.findOne({
            _id : showId
        })
        
        if (showcheck){
            // res.send("ok");
            // console.log(showcheck);
            res.status(200).send(showcheck);
        }else{
            res.status(404).json({ "message": "Show not found" })}
    }catch(e){
        console.log(e.message);
    }
    
})

app.post("/booking",usermiddleware,async(req,res)=>{
    const {success, data} = bookSchema.safeParse(req.body);
    const _id = req._id;
    const role = req.role;
    if (success){
        if (data.seats <= 0){
            res.status(400).json({ "message": "seats must be greater than 0" });
            return;
        }
        const showdata = await showmodel.findOne({
            _id : data.showId
        })
        if(showdata.availableTickets < data.seats){
            res.status(400).json({ "message": "Not enough tickets available" })
            return;
        }
        const bookingadd = await bookmodel.create({
            "movieName": showdata.movieName,
            "showTime": showdata.showTime,
            "seats": data.seats,
            "totalAmount":  showdata.ticketPrice * data.seats
        })
        showdata.availableTickets -= data.seats
        showdata.save();
        res.status(201).json({
            "message": "Booking successful",
            "bookingId": bookingadd._id,
            "movieName": bookingadd.movieName,
            "showTime": bookingadd.showTime,
            "seats": bookingadd.seats,
            "totalAmount": bookingadd.totalAmount
          })
          return;
    }
    res.status(400).json({ "message": "showId and seats are required" });    
})

app.get("/booking",usermiddleware,async(req,res)=>{
    const _id = req._id;
    const role = req.role;
    const bookings = await bookmodel.find().lean();
    const bookingarr = JSON.stringify(bookings , null , 2);
    res.status(201).send(bookingarr);

})
app.listen(3000);
