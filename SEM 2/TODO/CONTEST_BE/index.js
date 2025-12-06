const express = require('express');
const fs=require("fs")
const app = express();
app.use(express.json());

let data=JSON.parse(fs.readFileSync("data.txt","utf-8"))

let uc=data.users.length+1;
let bid=1001;

app.post('/signup', (req, res) => {
    let un = req.body.username;
    let pwd= req.body.password;
    let em= req.body.email;

    let user={
        "id": uc,
        "username":un,
        "password":pwd,
        "email":em,
        "bookings":[]
    }
    data.users.push(user)
    fs.writeFileSync("data.txt",JSON.stringify(data))
    res.status(201).json({message:"User created successfully", "userId":uc});
    uc++;
});

app.get("/movies",(req,res)=>{
    data=JSON.parse(fs.readFileSync("data.txt","utf-8"))
    res.status(200).json(data.movies)
})

app.get("/movies/:movieid",(req,res)=>{
    let mid=req.params.movieid
    data=JSON.parse(fs.readFileSync("data.txt","utf-8"))
    let movie=data.movies.find(x=>{
        if(x.id==mid)
        {
            return x
        }
    })
    if(movie==undefined)
    {
        res.status(404).json({message:"Movie not found"})
        return;
    }
    res.status(200).json(movie)
})

app.get("/movies/:movieId/shows",(req,res)=>{
    let mid=req.params.movieId
    data=JSON.parse(fs.readFileSync("data.txt","utf-8"))
    let movie=data.movies.find(x=>{
        if(x.id==mid)
        {
            return x
        }
    })
    if(movie==undefined)
    {
        res.status(404).json({message:"Movie not found"})
        return;
    }
    res.status(200).json(movie.shows)
})

app.post("/bookings/:userId",(req,res)=>{
    let uid=req.params.userId
    let mid=req.body.movieId
    let sid=req.body.showId
    let seats=req.body.seats
    //{ movieId, showId, seats }

    data=JSON.parse(fs.readFileSync("data.txt","utf-8"))
    let date=new Date()

    let movie=data.movies.find(x=>{
        if(x.id==mid)
        {
            return x
        }
    })
    let show=movie.shows.find(y=>{
                if(y.availableSeats>=seats && y.showId==sid)
                {
                    return y
                }
            })

    if(show==undefined)
    {
        res.json({message: "Not enough seats available" }); return;
    }
    let msg={
        message: "Booking successful",
        bookingId: bid,
        movieTitle: movie.title,
        showTime: show.time,
        seats: seats,
        totalAmount: seats*show.pricePerSeat
    }
    show.availableSeats-=seats;
    let book={
        "bookingId": bid,
        "movieId": mid,
        "showId": sid,
        "seats": seats,
        "totalAmount": seats*show.pricePerSeat,
        "status": "confirmed",
        "bookingDate": JSON.stringify(date).split('T')[0]+'"'
    }
    let user=data.users.find(x=>{
        if(x.id==uid)
        {
            return x
        }
    })
    user.bookings.push(book);
    fs.writeFileSync("data.txt",JSON.stringify(data))
    res.status(201).json(msg)
})

app.get("/bookings/:userId",(req,res)=>{
    let uid=req.params.userId
    data=JSON.parse(fs.readFileSync("data.txt","utf-8"))

    let books=data.users.find(x=>{
        if(x.id==uid){ return x; }
    }).bookings
    res.status(200).json(books)
})

app.get("/bookings/:userId/:bookingId",(req,res)=>{
    let uid=req.params.userId
    let bid=req.params.bookingId
    let book=data.users.find(x=>{
        if(x.id==uid){ return x; }
    }).bookings.find(y=>{
        if(y.bookingId==bid)
        {
            return y;
        }
    })
    if(book==undefined)
    {
        res.status(404).json({ "message": "Booking not found" })
        return;
    }
    res.status(200).json(book)
})

app.put("/bookings/:userId/:bookingId",(req,res)=>{
    let uid=req.params.userId
    let bid=req.params.bookingId
    let seats=req.body.seats

    data=JSON.parse(fs.readFileSync("data.txt","utf-8"))
    let movie=data.movies.find(x=>{
        if(x.id==uid)
        {
            return x
        }
    })
    let book=data.users.find(x=>{
            if(x.id==uid){ return x; }
        }).bookings.find(y=>{
        if(y.bookingId==bid)
        {
            return y;
        }
    })
    seats=seats-book.seats
    let sid=book.showId
    let show=movie.shows.find(y=>{
        if(y.availableSeats>=seats && y.showId==sid)
        {
            return y
        }
    })

    show.availableSeats-=seats
    book.seats+=seats
    book.totalAmount=book.seats*show.pricePerSeat

    let msg={
        message: "Booking updated successfully",
        bookingId: bid,
        seats: book.seats,
        totalAmount: book.totalAmount
    }
    fs.writeFileSync("data.txt",JSON.stringify(data))
    res.status(200).json(msg)
})

app.delete("/bookings/:userId/:bookingId",(req,res)=>{
    let uid=req.params.userId
    let bid=req.params.bookingId

    data=JSON.parse(fs.readFileSync("data.txt","utf-8"))
    let user=data.users.find(x=>{
        if(x.id==uid)
        {return x;}
    })
    let book=user.bookings.find(x=>{
        if(x.bookingId==bid)
        {return x}
    })
    book.status="cancelled";
    fs.writeFileSync("data.txt",JSON.stringify(data))

    let msg={ "message": "Booking cancelled successfully" }
    res.status(200).json(msg)
})

app.get("/summary/:userId",(req,res)=>{
    let uid=req.params.userId
    //{
    // "userId": 1,
    // "username": "rahul_gujjar",
    // "totalBookings": 4,
    // "totalAmountSpent": 2800,
    // "confirmedBookings": 3,
    // "cancelledBookings": 1,
    // "totalSeatsBooked": 12
    // }

    data=JSON.parse(fs.readFileSync("data.txt","utf-8"))
    let user=data.users.find(x=>{
        if(x.id==uid){return x;}
    })

    let amount=0,seats=0,conf=0,canc=0;
    for(let i in user.bookings)
    {
        if(i.status=="confirmed")
        {
            conf++;
            seats+=i.seats;
            amount+=i.totalAmount
        }
        else canc++;
    }

    let msg={
        userId: uid,
        username: user.username,
        totalBookings: conf+canc,
        totalAmountSpent: amount,
        confirmedBookings: conf,
        cancelledBookings: canc,
        totalSeatsBooked: seats
    }

    res.status(200).json(msg);
})

app.listen(3000);