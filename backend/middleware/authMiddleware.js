const jwt = require("jsonwebtoken");
const User = require("../models/User");

//Middleware to protect routes
const protect = async (req,res, next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Baerer"))
    {
        try{
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
            req.user = await User.findById(decoded.user.id).select("-password");
            next();
        }catch(err){
            console.log("token verification failed: ", err);
            res.status(401).json({message:"not authorized token failed"});
        }
    }else{
        res.status(401).json({message: "not authorized, no token provided"});
    }
}

//check if the user is an admin
const admin = (req,res,next)=>{
    if(req.user && req.user.role === "admin"){
        next();
    }else{
        res.status(403).json({message:"not authorized as admin"});
    }
}

module.exports = {protect, admin}
