const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
            maxLength:50,
        },
        password: {
            type:String,
            required:true,
            maxLength:50,
        },    
    }
);

module.exports = mongoose.model("Todo", todoSchema);