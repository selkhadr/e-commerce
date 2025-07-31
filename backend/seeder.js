const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");
const User = require("./models/User");
const Cart = require("./models/Cart");
const products = require("./data/products");

dotenv.config();

//connect to db
mongoose.connect(process.env.MONGO_URL);

//seed the data
const seedData = async () => {
  try {
    //clear existen data
    await Product.deleteMany();
    await User.deleteMany();
    await Cart.deleteMany();
    //creat default admin user
    const createdUser = await User.create({
      name: "admin user",
      email: "admin@gmail.com",
      password: "12345678",
      role: "admin",
    });
    //assign the default user id to each product
    const userId = createdUser._id;
    const sampleProducts = products.map((product) => {
      return{
        ...product,
        user: userId,
      };
    });
    await Product.insertMany(sampleProducts);
    console.log("product data seeded successfully");
    process.exit();
  } catch (err) {
    console.log("error seeding the data");
    process.exit(1);
  }
};

seedData();
