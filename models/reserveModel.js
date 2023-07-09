var mongoose = require("mongoose");

const registerSchema = mongoose.Schema (
    {
        day :  {
            type:String
        },

        hour:{
            type:String

        },

        name:{
            type:String
        },

        phone: {
            type:String,
            unique: true
        },
        
        personCount:{
            type:String
        }, 

    }
);

const reserveModel = mongoose.model('Reserve',registerSchema);

module.exports = reserveModel;