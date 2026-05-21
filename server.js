const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/ecommerce")
.then(() => {
  console.log("MongoDB Connected");
})
.catch((error) => {
  console.log(error);
});

const Product = mongoose.model("Product", {

  name: String,

  price: Number,

  image: String,

  description: String

});


const User = mongoose.model("User", {

  name: String,

  email: String,

  password: String

});


const Order = mongoose.model("Order", {

  products: Array,

  total: Number

});


app.get("/products", async (req, res) => {

  const products = await Product.find();

  res.json(products);

});



app.post("/products", async (req, res) => {

  const product = new Product(req.body);

  await product.save();

  res.json({
    message: "Product Added Successfully",
    product
  });

});


app.post("/register", async (req, res) => {

  const user = new User(req.body);

  await user.save();

  res.json({
    message: "User Registered Successfully"
  });

});



app.post("/login", async (req, res) => {

  const { email, password } = req.body;

  const user = await User.findOne({
    email,
    password
  });

  if(user){

    res.json({
      message: "Login Successful"
    });

  }else{

    res.json({
      message: "Invalid Email or Password"
    });

  }

});


app.post("/orders", async (req, res) => {

  const order = new Order(req.body);

  await order.save();

  res.json({
    message: "Order Placed Successfully"
  });

});



app.listen(5000, () => {

  console.log("Server Running on Port 5000");

});