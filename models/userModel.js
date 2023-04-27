const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please Add the User Name"],
    },
    email:{
        type:String,
        required:[true,"Please Add email"],
        unique:[true,"Email address is already in use"]
    },
    password:{
        type:String,
        required:[true,"Please Add the contact phone"],
    },
},{
    timestamps:true,
})

module.exports = mongoose.model("Users",userSchema);