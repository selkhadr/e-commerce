const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const {protect} = require("../middleware/authMiddleware");

const router = express.Router();

//post /api/users/register
router.post("/register", async(req,res)=>{
    const {name, email, password}=req.body;

    try{
        let user = await User.findOne({email});

        if(user)return res.status(400).json({message:"User already exist"});

        user = new User({name,email,password});
        await user.save();

        
        //create JWT Payload
        const payload = {user:{
            id: user._id,role:user.role
        }};
        //sign and return the token along with user data
        jwt.sign(payload, process.env.JWT_SECRET_KEY,{expiresIn:"40h"},(err,token)=>{
            if(err) throw err;
            res.status(201).json({
                user:{
                    _id:user._id,
                    name:user.name,
                    email:user.email,
                    role:user.role,
                },
                token
            });
            //send the user and token in response
        });

    }catch(err){
        console.log(err);
        res.status(500).send("Server Error");
    }
});


//@route post /api/users/login
//@desc Authenticate user
//^access public
router.post("/login", async(req,res)=>{
    const {email, password} =req.body;
    try{
        let user = await User.findOne({email});
        if(!user) return res.status(400,).json({message:"invalid credentials"});
        const isMatch = await user.matchPassword(password);

        if(!isMatch)return res.status(400).json({message:"invalid credentials"});

        //create JWT Payload
        const payload = {user:{
            id: user._id,role:user.role
        }};
        //sign and return the token along with user data
        jwt.sign(payload, process.env.JWT_SECRET_KEY,{expiresIn:"40h"},(err,token)=>{
            if(err) throw err;
            res.json({
                user:{
                    _id:user._id,
                    name:user.name,
                    email:user.email,
                    role:user.role,
                },
                token
            });
            //send the user and token in response
        });
    }catch(err){
        console.log(err);
        res.status(500).send("server error");
    }
})

//@route get /api/users/profile
//@desc get logged-in user's profile(protected route)
//^access private
router.get("/profile", protect, async(req,res)=>{
    res.json(req.user);
})

module.exports = router;
