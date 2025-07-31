const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoute");
const productRoutes = require("./routes/productRoute");
const cartRoutes = require("./routes/cartRoutes");
const checkoutRoutes = require("./routes/checkoutRoute");
const orderRoutes = require("./routes/orderRoute");
const uploadRoutes = require("./routes/uploadRoute");
const subscribeRoute = require("./routes/subscribeRoute");
const adminRoute = require("./routes/adminRoute");
const productAdminRoute = require("./routes/productAdminRoute");
const adminOrderRoute   = require("./routes/adminOrderRoute");

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

const Port = process.env.PORT||3000;

//connect to db
connectDB();

app.get("/", (req,res)=>{
    res.send("hee");
});

//api routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/subscribe", subscribeRoute);


//admin
app.use("/api/admin/users", adminRoute);
app.use("/api/admin/products", productAdminRoute);
app.use("/api/admin/orders", adminOrderRoute);



app.listen(Port, ()=>{
    console.log(`port: ${Port}`);
})
