import mongoose  from "mongoose";

mongoose.connect("mongodb+srv://Warrior07A:UWrenGXgSprYx1ir@cluster0.ru0uizx.mongodb.net/");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    _id : mongoose.Types.ObjectId,
    username:{type :String,unique:true,required:true},
    password: {type : String,required:true}
})

const GamesSchema = new Schema({
    _id : mongoose.Types.ObjectId,
    title : String,
    player1 :{type :  mongoose.Types.ObjectId,ref:'Users',required: true},
    player2 :{type :  mongoose.Types.ObjectId,ref:'Users'},
    moves : [
        {
            x: Number,
            u :Number
        }
    ]
})

export const usermodel = mongoose.model("userscollection",UserSchema);
export const gamesmodel = mongoose.model("gamescollection",GamesSchema);

