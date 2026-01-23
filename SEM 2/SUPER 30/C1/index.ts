import express, {type NextFunction, type Request ,type Response} from "express";
import { hotelschema, roomschema, siginschema, signupschema } from "./types/types";
import { prisma } from "./prisma";
const app = express();
const SECRET = "akshhat";
export {prisma} from "./prisma"
import jwt, { type JwtPayload } from "jsonwebtoken"

app.use(express.json());

function ferr(msg : string ,code : number , res: Response ){
    return res.status(code).json({
        "success": false,
        "data": null,
        "error": msg
      })
}

interface authadd extends Request{
    id? : string,
    role? :string
}

function authm (reqrole :string){
    return ((req:authadd ,res : Response,next : NextFunction)=>{
        try{
            const token = req.headers.authorization?.split(" ")[1] as string
            if (!token){
                return ferr("UNAUTHORIZED", 401, res);
            }
            let tokeninputs = jwt.verify(token , SECRET) as JwtPayload;
            let id = tokeninputs.id;
            let role = tokeninputs.role;
            if (reqrole != role && reqrole != "both"){
                return ferr("FORBIDDEN", 403, res);
            }
            req.id = id; 
            req.role = role;
            next();
        }
        catch(e){
            return ferr("UNAUTHORIZED", 401, res);
        }
    })  
}
app.post("/api/auth/signup",async(req : Request , res: Response )=>{
    const signupdata = signupschema.safeParse(req.body);
    if (!signupdata.success){
        return ferr("INVALID_REQUEST" , 400 , res);
    }
    let usercheck = await prisma.users.findUnique({
        where:{
            email : signupdata.data.email
        }
    })
    if (usercheck){
        return ferr("EMAIL_ALREADY_EXISTS" , 400 ,res);
    }
    let useradd = await prisma.users.create({
        data:{
            name : signupdata.data.name,
            email : signupdata.data.email,
            password : signupdata.data.password,
            role : signupdata.data.role,
            phone : signupdata.data.phone
        }
    })
    return res.status(201).json({
        "success": true,
        "data": {
          "id": useradd.id,
          "name": useradd.name,
          "email": useradd.email,
          "role": useradd.role,
          "phone": useradd.phone
        },
        "error": null
      })
})

app.post("/api/auth/login",async(req : Request , res: Response )=>{
    const signindata = siginschema.safeParse(req.body);
    if (!signindata.success){
        return ferr("INVALID_REQUEST" , 400 , res);
    }
    let usercheck = await prisma.users.findUnique({
        where:{
            email : signindata.data.email
        }
    })
    if (!usercheck){
        return ferr("INVALID_CREDENTIALS" , 401 , res);
    }
    const id = usercheck.id
    const role = usercheck.role
    const token = jwt.sign({id , role }, SECRET) as String
    return res.status(200).json({
        "success": true,
        "data": {
          "token": token,
          "user": {
            "id": usercheck.id,
            "name": usercheck.name,
            "email": usercheck.email,
            "role": usercheck.role
          }
        },
        "error": null
      })
    
})


app.post("/api/hotels" , authm("owner")  ,async(req : authadd , res: Response )=>{
    let id = req.id;
    let role = req.role;
    if (!id || !role){
        return ferr("UNAUTHORIZED" , 401,res);
    }
    const hoteldata = hotelschema.safeParse(req.body);
    if (!hoteldata.success){
        return ferr("INVALID_REQUEST" , 400 , res);
    }
    let hoteladd = await prisma.hotels.create({
        data:{
            "name" : hoteldata.data.name,
            "description" : hoteldata.data.description,
            "owner_id" : id,
            "city" : hoteldata.data.city,
            "country" : hoteldata.data.country,
            "amenities" :hoteldata.data.amenities,
            "rating" : hoteldata.data.rating,
            "total_reviews" : hoteldata.data.total_reviews, 
        }
    })
    return res.status(200).json({
        "success": true,
        "data": {
            "id": hoteladd.id,
            "ownerId": hoteladd.owner_id,
            "name": hoteladd.name,
            "description": hoteladd.description,
            "city": hoteladd.city,
            "country": hoteladd.country,
            "amenities": hoteladd.amenities,
            "rating":hoteladd.rating,
            "totalReviews": hoteladd.total_reviews
        },
        "error": null
        })    
})


app.post("/api/hotels/:hotelId/rooms" , authm("owner")  ,async(req :authadd  , res: Response )=>{
    let id = req.id;
    let role = req.role;
    if (!id || !role){
        return ferr("UNAUTHORIZED" , 401,res);
    }
    const hotelId = req.params.hotelId as string;
    const roomcheck = roomschema.safeParse(req.body);
    if (!roomcheck.success){
        return ferr("INVALID_REQUEST" , 400 ,res);
    }
    const hotelcheck = await prisma.hotels.findUnique({
        where:{
            id : hotelId
        }
    })
    if (!hotelcheck){
        return ferr("HOTEL_NOT_FOUND" , 404, res);
    }
    const roomexists = await prisma.rooms.findFirst({
        where:{
            room_number : roomcheck.data.roomNumber
        }
    })
    if (roomexists){
        return ferr("ROOM_ALREADY_EXISTS",400 ,res);
    }
    let roomadd = await prisma.rooms.create({
        data:{
            hotel_id : hotelId,
            room_number : roomcheck.data.roomNumber,
            room_type :roomcheck.data.roomType,
            price_per_night : roomcheck.data.pricePerNight,
            max_occupancy : roomcheck.data.maxOccupancy
        }
    })
    return res.status(201).json({
        "success": true,
        "data": {
          "id": roomadd.id,
          "hotelId": roomadd.hotel_id,
          "roomNumber": roomadd.room_number,
          "roomType": roomadd.room_type,
          "pricePerNight": roomadd.price_per_night,
          "maxOccupancy": roomadd.max_occupancy,
        },
        "error": null
      })
})

// - `city` – Filter by city (case-insensitive)
// - `country` – Filter by country (case-insensitive)
// - `minPrice` – Minimum price per night
// - `maxPrice` – Maximum price per night
// - `minRating` – Minimum rating (0-5)
// - `/api/hotels?city=Mumbai&minRating=4`
// - `/api/hotels?country=India&minPrice=3000&maxPrice=8000`

app.get("/api/hotels" , authm("both")  ,async(req :authadd  , res: Response )=>{
    let id = req.id;
    let role = req.role;
    if (!id || !role){
        return ferr("UNAUTHORIZED" , 401,res);
    }
    return res.status(201).json({
        msg :"okay"
    })
    // let {city , country , minPrice, maxPrice ,minRating  } = req.query;
    // const hotelfind = await prisma.hotels.findMany({
    //     where:{
    //         city : city?
    //         country : country?
    //         minPrice : minPrice?
    //         maxPrice : maxPrice?
    //     }
    // })
})


app.listen(3000, () => console.log("server runnning"));

