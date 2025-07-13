const express = require("express");
const router = express.Router();
const Subscriber = require("../models/Subscriber");


//post /api/subscriber
//handle newsletter subscriper
//public
router.post("/subscribe", async(req,res)=>{
    const {email} = req.body;

    if(!email){
        return res.status(400).json({message:"email is required"});
    }
    try {
        //check if the email is already subscribed
        let subscriber = await Subscriber.findOne({email});
        if(subscriber){
            return res.status(400).json({message:"email is already subscribed"});
        }


        //cretae a new subscriber
        Subscriber = new Subscriber({email});
        await subscriber.save();

        res
        .status(201)
        .json({message:"Successfuly subscribed to the newsletter!"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Server Error"});
    }
});


module.exports = router;
