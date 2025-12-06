const express = require("express");
const app = express();
app.use(express.json());
const fs = require("fs");

let db = {};

// Initialize database with proper error handling
try {
    const data = fs.readFileSync("data.txt", "utf-8");
    if (data.trim()) {
        db = JSON.parse(data);
    } else {
        db = { users: [], movies: [] };
    }
} catch (err) {
    // If file doesn't exist or is invalid, initialize empty database
    db = { users: [], movies: [] };
}

// Initialize universal ID properly
let universalid = db["users"] && db["users"].length > 0 
    ? Math.max(...db["users"].map(u => u.id || 0)) + 1 
    : 1;

// Initialize booking ID properly - find max existing booking ID
let bookingid = 1001;
if (db["users"] && db["users"].length > 0) {
    let maxBookingId = 1000;
    db["users"].forEach(user => {
        if (user.bookings && user.bookings.length > 0) {
            user.bookings.forEach(booking => {
                if (booking.bookingId > maxBookingId) {
                    maxBookingId = booking.bookingId;
                }
            });
        }
    });
    bookingid = maxBookingId + 1;
}

app.post("/signup", function(req, res) {
    const { username, password, email } = req.body;
    
    // Validation
    if (!username || !password || !email) {
        return res.status(400).json({ "message": "All fields are required" });
    }
    
    // Check for duplicate username or email
    const existingUser = db["users"].find(
        item => item.username === username || item.email === email
    );
    
    if (existingUser) {
        return res.status(400).json({ "message": "Username or email already exists" });
    }
    
    const user = {
        "id": universalid,
        "username": username,
        "password": password,
        "email": email,
        "bookings": []
    };
    
    db["users"].push(user);
    fs.writeFileSync("data.txt", JSON.stringify(db, null, 2));
    
    const currentId = universalid;
    universalid++;
    
    res.status(201).json({
        "message": "User created successfully",
        "userId": currentId
    });
});

app.get("/all", (req, res) => {
    res.json(db);
});

app.get("/movies", function(req, res) {
    const response = db["movies"] || [];
    res.status(200).json(response);
});

app.get("/movies/:id", function(req, res) {
    const id = req.params.id;
    const response = db["movies"].find(item => item.id === parseInt(id) || item.id === id);
    
    if (response) {
        res.status(200).json(response);
    } else {
        res.status(404).json({ "message": "Movie not found" });
    }
});

app.get("/movies/:movieId/shows", function(req, res) {
    const movieId = req.params.movieId;
    const movie = db["movies"].find(
        item => item.id === parseInt(movieId) || item.id === movieId
    );
    
    if (movie) {
        const shows = movie.shows || [];
        res.status(200).json(shows);
    } else {
        res.status(404).json({ "message": "Movie not found" });
    }
});

app.post("/bookings/:userid", function(req, res) {
    const userid = parseInt(req.params.userid);
    const { movieId, showId, seats } = req.body;
    
    // Validation
    if (!movieId || !showId || !seats || seats <= 0) {
        return res.status(400).json({ "message": "Invalid booking data" });
    }
    
    const founduser = db["users"].find(
        item => item.id === parseInt(userid) || item.id === userid
    );
    
    if (!founduser) {
        return res.status(404).json({ "message": "User not found" });
    }
    
    const movie = db["movies"].find(
        item => item.id === parseInt(movieId) || item.id === movieId
    );
    
    if (!movie) {
        return res.status(404).json({ "message": "Movie not found" });
    }
    
    const show = movie.shows.find(
        item => item.showId === parseInt(showId) || item.showId === showId
    );
    
    if (!show) {
        return res.status(404).json({ "message": "Show not found" });
    }
    
    const bookingDate = new Date();
    const currentBookingId = bookingid;
    
    const newbooking = {
        "bookingid": currentBookingId,
        "bookingId": currentBookingId,
        "movieId": movieId,
        "showId": showId,
        "seats": seats,
        "totalAmount": seats * show.pricePerSeat,
        "status": "confirmed",
        "bookingDate": bookingDate
    };
    
    founduser["bookings"].push(newbooking);
    fs.writeFileSync("data.txt", JSON.stringify(db, null, 2));
    
    bookingid++;
    
    res.status(201).json(newbooking);
});

app.get("/bookings/:userid", function(req, res) {
    const userid = parseInt(req.params.userid);
    const founduser = db["users"].find(
        item => item.id === parseInt(userid) || item.id === userid
    );
    
    if (!founduser) {
        return res.status(404).json({ "message": "User not found" });
    }
    
    const bookings = founduser["bookings"] || [];
    res.status(200).json(bookings);
});

app.get("/bookings/:userid/:bookingid", function(req, res) {
    const userid = parseInt(req.params.userid);
    const bookingid = parseInt(req.params.bookingid);
    
    const founduser = db["users"].find(
        item => item.id === parseInt(userid) || item.id === userid
    );
    
    if (!founduser) {
        return res.status(404).json({ "message": "Booking not found" });
    }
    
    const booking = founduser["bookings"].find(
        item => item.bookingId === parseInt(bookingid) || item.bookingId === bookingid
    );
    
    if (booking) {
        res.status(200).json(booking);
    } else {
        res.status(404).json({ "message": "Booking not found" });
    }
});

app.put("/bookings/:userid/:bookingid", function(req, res) {
    const userid = parseInt(req.params.userid);
    const bookingid = parseInt(req.params.bookingid);
    const { seats } = req.body;
    
    // Validation
    if (!seats || seats <= 0) {
        return res.status(400).json({ "message": "Invalid number of seats" });
    }
    
    const founduser = db["users"].find(
        item => item.id === parseInt(userid) || item.id === userid
    );
    
    if (!founduser) {
        return res.status(404).json({ "message": "Booking not found" });
    }
    
    const booking = founduser["bookings"].find(
        item => item.bookingId === parseInt(bookingid) || item.bookingId === bookingid
    );
    
    if (!booking) {
        return res.status(404).json({ "message": "Booking not found" });
    }
    
    // Find the show to recalculate totalAmount
    const movie = db["movies"].find(
        item => item.id === parseInt(booking.movieId) || item.id === booking.movieId
    );
    
    if (!movie) {
        return res.status(404).json({ "message": "Movie not found" });
    }
    
    const show = movie.shows.find(
        item => item.showId === parseInt(booking.showId) || item.showId === booking.showId
    );
    
    if (!show) {
        return res.status(404).json({ "message": "Show not found" });
    }
    
    booking["seats"] = seats;
    booking["totalAmount"] = seats * show.pricePerSeat;
    
    fs.writeFileSync("data.txt", JSON.stringify(db, null, 2));
    
    const response = {
        "message": "Booking updated successfully",
        "bookingId": bookingid,
        "seats": seats,
        "totalAmount": booking["totalAmount"]
    };
    
    res.status(200).json(response);
});

app.delete("/bookings/:userid/:bookingid", (req, res) => {
    const userid = parseInt(req.params.userid);
    const bookingid = parseInt(req.params.bookingid);
    
    const founduser = db["users"].find(
        item => item.id === parseInt(userid) || item.id === userid
    );
    
    if (!founduser) {
        return res.status(404).json({ "message": "Booking not found" });
    }
    
    const booking = founduser["bookings"].find(
        item => item.bookingId === parseInt(bookingid) || item.bookingId === bookingid
    );
    
    if (!booking) {
        return res.status(404).json({ "message": "Booking not found" });
    }
    
    booking.status = "cancelled";
    fs.writeFileSync("data.txt", JSON.stringify(db, null, 2));
    
    res.status(200).json({ "message": "Booking cancelled successfully" });
});

app.get("/summary/:userid", (req, res) => {
    const userid = parseInt(req.params.userid);
    const founduser = db["users"].find(
        item => item.id === parseInt(userid) || item.id === userid
    );
    
    if (!founduser) {
        return res.status(404).json({ "message": "User not found" });
    }
    
    const bookings = founduser["bookings"] || [];
    const totalbookings = bookings.length;
    
    // Calculate actual values
    let totalAmountSpent = 0;
    let confirmedBookings = 0;
    let cancelledBookings = 0;
    let totalSeatsBooked = 0;
    
    bookings.forEach(booking => {
        if (booking.status === "confirmed") {
            confirmedBookings++;
            totalAmountSpent += booking.totalAmount || 0;
        } else if (booking.status === "cancelled") {
            cancelledBookings++;
        }
        totalSeatsBooked += booking.seats || 0;
    });
    
    const response = {
        "userId": userid,
        "username": founduser["username"],
        "totalBookings": totalbookings,
        "totalAmountSpent": totalAmountSpent,
        "confirmedBookings": confirmedBookings,
        "cancelledBookings": cancelledBookings,
        "totalSeatsBooked": totalSeatsBooked
    };
    
    res.status(200).json(response);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
