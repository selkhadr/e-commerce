const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

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

app.listen(Port, ()=>{
    console.log("nnnnnnn");
})
