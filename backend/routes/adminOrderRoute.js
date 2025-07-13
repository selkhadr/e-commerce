const express = require("express");
const Order = require("../models/Order");
const {protect,admin}= require("../middleware/authMiddleware");

const router = express.Router();


//get /api/admin/orders
//get all order(admin only)
//private/admin
router.get("/", protect,admin,async(req,res)=>{
    try {
        const orders = await Order.find({}).populate("user", "name email");
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"server error"});
    }
})


//route put /api/admin/orders/:id
//update order status
//private/admin
router.put("/:id", protect,admin,async(req,res)=>{
    try{
        const order = await Order.findById(req.params.id).populate("user","name");
        if(order){
            order.status = req.body.status || order.status;
            order.isDelivered = req.body.status === "Delivered"?true:order.isDelivered;
            order.deliveredAt = req.body.status === "Delivered"?Date.now():order.isDelivered;
            const updatedOrder = await order.save();
            res.json(updatedOrder);
        }else{
            res.status(404).json({message:"order not found"});
        }
    }catch(error){
        console.error(error);
        res.status(500).json({message:"server error"});
    }
});

//delete /api/admin/orders/id
//delete an order
//private/admin
router.delete("/:id", protect,admin,async(req,res)=>{
    try {
        const order = await Order.findById(req.params.id);
        if(order){
            await order.deleteOne();
            res.json({message:"Order not found"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"server error"});
    }
})


module.exports = router;
