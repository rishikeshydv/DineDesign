import {Schema,model,models} from "mongoose";
 
const registerSchema = new Schema (
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
        
        // authToken:{
        //     type:String
        // }, 

    }
);

const User = models.User || model('Login',registerSchema);

export default User