const express= require("express");
const app =express();

app.use(express.json());
const fs = require("fs");


let db = {};
let universalid ;
function readData(){
    try{
        universalid = db["users"].length + 1;
        db = JSON.parse(fs.readFileSync("data.txt","utf-8",(err,data)=>{})); ///reading from the file
    }
    catch{
        db = {"users" : [],"movies" : [],};
    }
}
readData();


function writeData(){
    fs.writeFileSync("data.txt",JSON.stringify(db,null,2));
}

const totalspent = 0;


app.post("/signup",function(req,res){
    readData();
    const {username,password,email}  = req.body;
    const found = db["users"].find((item => item.email == email) || (item => item.username == username))
    const emailcheck = email.includes("@"); 
    if (username == '' || password == '' || email == ''){
        res.send("Incorrect credentials write it again");
    }
    else if (found){
        res.send("User exists ! ");
    }
    else if (!emailcheck){
        res.send("your email is incorrect");
    }
    else{
        const user = {"id": universalid ,
            "username":username,
            "password":password,
            "email" : email,
            "bookings" : []
        };
        db["users"].push(user);
        writeData()
        res.status(201).json({
        "message": "User created successfully",
        "userId": universalid
        });
        universalid++;
    }
})

app.get("/all",(req,res)=>{
    readData();
    res.json(db);
})
app.get("/movies",function(req,res){
    readData();
    const response = db["movies"];
    res.status(200).send(response);
})

app.get("/movies/:id",function(req,res){
    const id = req.params.id;
    if(isNaN(parseInt(id))){
        res.send("movie id must be a NUmber");
    }
    else{
        readData();
        const response =  db["movies"].find(item=>item.id == id);
        if (response)
        {
            writeData();
            res.json(response);
        }
        else{
            res.status(404).json({ "message": "Movie not found" });
        }   
    }
})

app.get("/movies/:movieId/shows",function(req,res){
    readData();
    const movieId = req.params.movieId;
    if (isNaN(parseInt(movieId))){
        res.send("Write the movieId correctly !");
    }
    else{
        const response =  db["movies"].find(item=>item.id == movieId);
        if (response)
        {
            const shows= response.shows;
            res.status(200).json(shows);
        }
        else{
            res.status(404).json({ "message": "Movie not found" });
        }
    }
})
const bookingid = 1001;
const bookingDate = new Date().getDate;


app.post("/bookings/:userid",function(req,res){
    readData();
    const userid = req.params.userid;
    if (isNaN(parseInt(userid)))
    {
        res.send("userid must be a number");
    }
    else{
        const {movieId,showId,seats} = req.body;
        if (isNaN(parseInt(movieId)) && isNaN(parseInt(showId)) && isNaN(parseInt(seats)) && parseInt(seats) > 0)
            {
                res.send("userid must be a number");
            }
        else{
            const founduser = db["users"].find(item=>item.id == userid)
            console.log(showId);
            const movie = db["movies"].find(item=>item.id == movieId);
            const show = movie["shows"].find(item => item.showId == showId)
            if (founduser){
                const newbooking = {"bookingid" :bookingid,
                    "bookingId": 1001,
                    "movieId": movieId,
                    "showId": showId,
                    "seats": seats,
                    "totalAmount": seats * show["pricePerSeat"],
                    "status": "confirmed",
                    "bookingDate": bookingDate
                };
                founduser["bookings"].push(newbooking);
                writeData();
                res.status(201).send(newbooking);
                bookingid++;
            }
        }
    }
})

app.get("/bookings/:userid",function(req,res){
    readData();
    const userid = req.params.userid;
    const response = db["users"].find(item =>item.id == userid);
    const bookings = response["bookings"];
    res.json(bookings);
})


app.get("/bookings/:useerid/:bookingid",function(req,res){
    readData();
    const userid = req.params.id;
    const bookingid= req.params.bookingid;
    const founduser = db["users"].find(item=>item.id == userid)
    if (founduser){
        founduser["bookings"].find(item=>item.bookingId == bookingid)
        if (founduser){
            writeData();
            res.json(founduser);
        }
        else{
            res.json({ "message": "Booking not found" });
        }
    }
    else{
        res.json({ "message": "Booking not found" });

    }
})

app.put("/bookings/:userid/:bookingid",function(req,res){
    readData();
    const userid = req.params.id;
    const bookingid= req.params.bookingid;
    const {seats} = req.body;
    const founduser = db["users"].find(item=>item.id == userid)
    
    if (founduser){
        const booking = founduser["bookings"].find(item => item.bookingId == bookingid)
        booking["seats"] = seats;
        const response = {
                        "message": "Booking updated successfully",
                        "bookingId": bookingid,
                        "seats": seats,
                        "totalAmount":  1250
                        }
        writeData();
        res.status(200).json(reponse);
    }
})

app.delete("/bookings/:userid/:bookingid",(req,res)=>{
    readData();
    const userid = req.params.userid;
    const bookingid= req.params.bookingid;
    const founduser = db["users"].find(item=>item.id == userid)
    if (founduser){
        const booking = founduser["bookings"].find(item => item.bookingId == bookingid)
        booking.status = "cancelled";
        writeData();
        res.status(200).json({ "message": "Booking cancelled successfully" });
    }
})

app.get("/summary/:userid",(req,res)=>{
    readData();
    const userid = req.params.userid;
    const founduser = db["users"].find(item=>item.id == userid)
    console.log(founduser);
    const totalbookings = founduser["bookings"].length;
    let cnt = 0;
    if (founduser)
    {
        const number = founduser["bookings"].find(item=>item.status == "confirmed")
    }
    const response = {
                    "userId": userid,
                    "username":  founduser["username"],
                    "totalBookings": totalbookings,
                    "totalAmountSpent": 2800,
                    "confirmedBookings": 3,
                    "cancelledBookings": 1,
                    "totalSeatsBooked": 12
                    }

    res.json(response);
})
app.listen(3000);
