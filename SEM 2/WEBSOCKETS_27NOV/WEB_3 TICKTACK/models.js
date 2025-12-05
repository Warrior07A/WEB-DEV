import mongoose  from "mongoose";
import { ref } from "process" ;

mongoose.connect("mongodb+srv://Warrior07A:UWrenGXgSprYx1ir@cluster0.ru0uizx.mongodb.net/akshat_db");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username:{type :String,unique:true,required:true},
    password: {type : String,required:true}
})

const GamesSchema = new Schema({
    title : String,
    player1 :{type :  mongoose.Types.ObjectId,ref:'userscollection',required: true},
    player2 :{type :  mongoose.Types.ObjectId,ref:'userscollection'},
    moves : [
        {
            x: {type : Number,default:0},
            y :{type : Number,default : 0}
        }
    ]
})

export const usermodel = mongoose.model("userscollection",UserSchema);
export const gamesmodel = mongoose.model("gamescollection",GamesSchema);

