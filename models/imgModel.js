var mongoose = require("mongoose");

const registerSchema = mongoose.Schema (
    {
        
        images:{
            type:String
        }

    }
);

const imgModel = mongoose.model('Img',registerSchema);

module.exports = imgModel;