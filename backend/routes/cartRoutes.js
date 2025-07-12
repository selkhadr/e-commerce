const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

//helper function to get a cart by user id or guest id
const getCart = async (userId, guestId) => {
  if (userId) {
    return await Cart.findOne({ user: userId });
  } else if (guestId) {
    return await Cart.findOne({ guestId });
  }
  return null;
};

//Post /api/cart
//add a product to the cart for a guest or logged in user
// public
router.post("/", async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "product not found" });

    // Convert price to number to ensure proper calculation
    const productPrice = parseFloat(product.price);
    const productQuantity = parseInt(quantity);

    //determine if the user is logged in or guest
    let cart = await getCart(userId, guestId);

    //if the cart exist update it
    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) =>
          p.productId.toString() === productId &&
          p.size === size &&
          p.color === color
      );
      if (productIndex > -1) {
        cart.products[productIndex].quantity += productQuantity;
      } else {
        cart.products.push({
          productId,
          name: product.name,
          image: product.images[0].url,
          price: productPrice, // Store as number
          size,
          color,
          quantity: productQuantity,
        });
      }
      //recalculate the total price with explicit number conversion
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + parseFloat(item.price) * parseInt(item.quantity),
        0
      );
      await cart.save();
      return res.status(200).json(cart);
    } else {
      //create a new cart for the guest or user
      const newCart = await Cart.create({
        user: userId ? userId : undefined,
        guestId: guestId ? guestId : "guest_" + new Date().getTime(),
        products: [
          {
            productId,
            name: product.name,
            image: product.images[0].url,
            price: productPrice, // Store as number
            size,
            color,
            quantity: productQuantity,
          },
        ],
        totalPrice: productPrice * productQuantity, // Both are now numbers
      });
      return res.status(201).json(newCart);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "server error" });
  }
});

//put /api/cart
//update product quantity in cart for a guest or logged-in user
//public
router.put("/", async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;
  try {
    let cart = await getCart(userId, guestId);
    if (!cart) return res.status(404).json({ message: "cart not found" });

    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color
    );

    if (productIndex > -1) {
      const newQuantity = parseInt(quantity);
      //update quantity
      if (newQuantity > 0) {
        cart.products[productIndex].quantity = newQuantity;
      } else {
        cart.products.splice(productIndex, 1); //remove product if quantity is 0
      }

      // Recalculate total with explicit number conversion
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + parseFloat(item.price) * parseInt(item.quantity),
        0
      );

      await cart.save();
      return res.status(200).json(cart);
    } else {
      return res.status(404).json({ message: "product not found in cart" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "server error" });
  }
});

//delete /api/cart
//remove a product from the cart
//public
router.delete("/", async (req, res) => {
  const { productId, size, color, guestId, userId } = req.body;
  try {
    let cart = await getCart(userId, guestId);
    if (!cart) return res.status(404).json({ message: "cart not found" });

    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color
    );

    if (productIndex > -1) {
      cart.products.splice(productIndex, 1);

      // Recalculate total with explicit number conversion
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + parseFloat(item.price) * parseInt(item.quantity),
        0
      );

      await cart.save();
      return res.status(200).json(cart);
    } else {
      return res.status(404).json({ message: "product not found in cart" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
});

//get /api/cart
//get logged-in user's or guest users's cart
//public
router.get("/", async (req, res) => {
  const { userId, guestId } = req.query;
  try {
    const cart = await getCart(userId, guestId);
    if (cart) {
      res.json(cart);
    } else {
      res.status(404).json({ message: "cart not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("server error");
  }
});

//post /api/cart/merge
//merge guest cart into user cart on login
//pivate
router.post("/merge", protect, async (req, res) => {
  const { guestId } = req.body;

  try {
    //find the guest cart and user cart
    const guestCart = await Cart.findOne({ guestId });
    const userCart = await Cart.findOne({ user: req.user._id });

    if (guestCart) {
      if (guestCart.products.length === 0) {
        return res.status(400).json({ message: "guest cart is empty" });
      }

      if (userCart) {
        //merge guest cart into user cart
        guestCart.products.forEach((guestItem) => {
          const productIndex = userCart.products.findIndex(
            (item) =>
              item.productId.toString() === guestItem.productId.toString() &&
              item.size === guestItem.size &&
              item.color === guestItem.color
          );
          if (productIndex > -1) {
            //if the items exists in the user cart, update the quantity
            userCart.products[productIndex].quantity += guestItem.quantity;
          } else {
            //otherwise add the guest item to the cart
            userCart.products.push(guestItem);
          }
        });

        userCart.totalPrice = userCart.products.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
        await userCart.save();

        //remove the guest cart after merging
        try {
          await Cart.findByIdAndDelete({guestId});
        } catch (error) {
          console.error("error deleting guest cart: ",error);
        }
        res.status(200).json(userCart);
      }
      else{
        //if the user has no existing cart,assign the guest cart to the user
        guestCart.user = req.user._id;
        guestCart.guestId = undefined;
        await guestCart.save();

        res.status(200).json(guestCart);
      }
    }
    else{
      if(userCart){
        //guest cart has already been merged,return user cart
        return res.status(200).json(userCart);
      }
      res.status(400).json({message:"guest cart not found"});
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"server error"});
  }
});

module.exports = router;
