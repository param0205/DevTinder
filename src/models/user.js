const { url } = require("inspector");
const mongoose = require("mongoose");
const validator  = require("validator");


const userSchema = new mongoose.Schema({
    firstName: {
        type: "String",
        required:true,
        minLength:4,
        trim:true,
        maxLength:50
    },
    lastName: {
        type: "String",
        required:true,
        trim:true,
        maxLength:50
    },
    email: {
        type: "String",
        required:true,
        lowercase:true,
        unique:true,
        trim:true,
        maxLength:50,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address " + value);
            }
        }
    },
    password: {
        type: "String",
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter a Strong Password : "+ value)
            }
        }
    },
    age: {
        type: "Number",
        min:18,
        required:true
    },
    phNumber: {
        type: "Number",
        // required:true,
        trim:true,
        maxLength:10,
    },
    gender: {
        type:"String",
        validate(value){
            if(!["male", "female","others"].includes(value)){
                throw new Error("Gender data is not valid")
            }
        }
    },
    photoUrl:{
        type:"String",
        default :("https://p.kindpng.com/picc/s/252-2524695_dummy-profile-image-jpg-hd-png-download.png"),
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid Photo Url: "+ value);
            }
        }
    },
    about:{
        type:"String",
        minLength:10,
        default:"this is the default description",
        maxLength:100
    },
    skills:{
         type:[String]
    }
},
    {
        timestamps:true
})

module.exports = mongoose.model("User",userSchema);