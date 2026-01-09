import {mongoose} from "mongoose";
import { date } from "zod";
import { required } from "zod/mini";

mongoose.connect("mongodb+srv://Warrior07A:UWrenGXgSprYx1ir@cluster0.ru0uizx.mongodb.net/movie");

const userSchema = new mongoose.Schema({
    username: {type :String,required: true,unique : true},
    email: {type :String,required: true,unique : true},
    password: {type :String,required: true},
    role: {
        type: String, 
        enum: ['user', 'admin'],
        default: "user"
    }
})

const showSchema = new mongoose.Schema({
    movieName: {type :String,required: true},
    showTime: {type :Date , required : true},
    ticketPrice: {type :Number,required: true},
    availableTickets: {type :Number,required: true},
    createdAt:{ type: Date,default : Date.now()}
})

const bookingSchema = new mongoose.Schema(
    {
        "userId" :{type : mongoose.Schema.Types.ObjectId},
        "showId" : {type : mongoose.Schema.Types.ObjectId},
        "seats": {type :Number,required: true},
        "totalAmount": {type :Number,required: true},
        "bookingDate" : {type : Date , required : true}
    }
)
export const usermodel = await mongoose.model("users", userSchema);
export const showmodel = await mongoose.model("shows", showSchema);
export const bookmodel = await mongoose.model("booking" ,bookingSchema);