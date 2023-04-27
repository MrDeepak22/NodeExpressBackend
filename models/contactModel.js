const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({

    user_id: {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    name:{
        type:String,
        required:[true,"Please Add the contact Name"],
    },
    email:{
        type:String,
        required:[true,"Please Add the contact email add"],
    },
    phone:{
        type:String,
        required:[true,"Please Add the contact phone"],
    },
},{
    timestamps:true,
})

module.exports = mongoose.model("Contact",contactSchema);