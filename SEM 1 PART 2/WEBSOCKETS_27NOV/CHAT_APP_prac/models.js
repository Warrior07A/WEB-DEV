import mongoose from "mongoose";

const UserSchema =new mongoose.Schema ({
    username : {type:String,unqiue:true,required:true},
    password :{type:String,required: true},
    rooms: [String]
})

const roomSchema = new mongoose.Schema({
    user_id : {type: mongoose.Types.ObjectId ,ref:"users",required:true},
    rooms: [String]
})
export const usermodel =  mongoose.model ("users",UserSchema);

export const roommodel = mongoose.model("rooms",roomSchema);