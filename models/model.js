var mongoose = require("mongoose");

const registerSchema = mongoose.Schema (
    {
        username :  {
            type:String,
            required:[true,"Please enter a username"]
        },

        password:{
            type:String,
            required:[true,"Please enter a password"]

        },

        name:{
            type:String,
            required:[true,"Please enter a name"]
        },

        email: {
            type:String,
            unique: true,
            required:[true,"Please enter a password"]
        },
        
        authToken:{
            type:String
        }, 

    }
);

const dataModel = mongoose.model('Login',registerSchema);

module.exports = dataModel;