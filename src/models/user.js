const mongoose = require('mongoose')
const validator = require("validator")

const userSchema = new mongoose.Schema({ 
    firstName: {
        type: String,
        required: true,
        
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error("Email is not valid:" + value)
            }
        }
    },
    password: {
        type: String,
        required : true,
        validate(value) {
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter a Strong Password:" + value)
            }
        }
    },
    age: {
        type: Number,
        min: 18
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female', 'others'],
        validate(value){
            if(!["male", "female", "others"].includes(value)) {
                throw new Error("valid gender required")
            }
        } 
    },
    photoUrl: {
        type: String,
        default: function () {
            if (this.gender === 'male' || this.gender === 'others') {
                return "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671116.jpg?t=st=1744719573~exp=1744723173~hmac=b587364cd4b3bae79d3521ab47cfa1ae4d93769f4b0197723c335ba432136a50&w=740";
            } else {
                return "https://cdn5.vectorstock.com/i/1000x1000/78/44/avatar-girl-cartoon-vector-42477844.jpg";
            }
        },
        validate(value) {
            if(!validator.isURL(value)){
                throw new Error("Invalid Photo Url" + value)
            }
        }
    },
    about:{
        type:String,
        default: "This is a default about the user!"

    },

    skills: {
        type: [String],
    },
    

},
{
    timestamps: true,
}
);



module.exports = mongoose.model("User", userSchema )



