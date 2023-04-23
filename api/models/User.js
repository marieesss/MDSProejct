const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        username: {type:String, required:true},
        email:{
            type:String, 
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'email invalide'],
            required:true},
        password:{
            type:String, 
            match: [/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'password invalide'], 
            required:true},
        isAdmin:{type:Boolean, default:false},
    },
    {timestamps: true}
);

module.exports = mongoose.model("User", UserSchema);