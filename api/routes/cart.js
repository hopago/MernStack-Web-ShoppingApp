const Cart = require("../models/Cart");
const router = require("express").Router();
const { verifyTokenAuthorization, verifyTokenAdmin } = require("./verifyToken");


// CREATE
router.post("/", verifyTokenAuthorization, async (req, res) => {

  const newCart = new Cart(req.body);

  try {

    const savedCart = await newCart.save();

    res.status(200).json(savedCart);

  } catch (err) {
    res.status(500).json(err);
  }

});

// UPDATE
router.put("/:id", verifyTokenAuthorization, async (req, res) => {

  try {

    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedCart);

  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete
router.delete("/:id", verifyTokenAuthorization, async (req, res) => {

  try {

    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart Deleted!");

  } catch (err) {
    res.status(500).json(err);
  }

});

// Get user cart
router.get("/find/:userId", verifyTokenAuthorization, async (req, res) => {

  try {

    const cart = await Cart.findOne({ userId: req.params.userId });

    res.status(200).json(cart);

  } catch (err) {
    res.status(500).json(err);
  }

});

// Get all carts
router.get("/", verifyTokenAdmin, async (req, res) => {

  try {

    const carts = await Cart.find();

    res.status(200).json(carts);
    
  } catch (err) {
    res.status(500).json(err);
  }

});

module.exports = router;