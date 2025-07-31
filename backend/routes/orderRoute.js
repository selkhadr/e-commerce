const express = require("express");
const Order = require("../models/Order");
const {protect} = require("../middleware/authMiddleware");

const router = express.Router();

//get /api/orders/my-orders
//get logged-in user's orders
//private
router.get("/my-orders",protect,async(req,res)=>{
    try {
        //find orders for the authentication user
        const orders = await Order.find({user:req.user._id}).sort({
            createdAt:-1,
        });//sort by most recent orders
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"server error"});
    }
});

//route get /api/orders/:id
//get order  details by id
//private
router.get("/:id", protect, async(req,res)=>{
    try {
        const order = await Order.findById(req.params.id).populate(
            "user",
            "name",
            "email"
        );
        if(!order){
            return res.status(404).json({message:"order not found"});
        }


        //return the full order details
        res.json(order);
    } catch (error) {
        console.error(error);
        console.log(500).json({message:"server error"});
    }
})

module.exports =router;