import mongoose from 'mongoose';
import { TryCatch } from "../middlewares/error.js";
import bcrypt from 'bcrypt';
import Product from '../models/product.js';
import ProductsinCart from '../models/productsInCart.js';
import Cart from '../models/cart.js';

// ProductsinCart.

// add a product to cart.
export const addToCart = TryCatch(async (req, res, next) => {
    try {
        const { customerID, productID } = req.body;
        const cart = await Cart.findOne({ customerId: customerID });
    
        if (!cart) {
          return res
            .status(404)
            .json({ error: "Cart not found for this customer." });
        }
    
        const existingProductInCart = await ProductsinCart.findOne({
          cart: cart._id,
          product: productID,
        });
    
        if (existingProductInCart) {
          if (existingProductInCart.quantity < 5) {
            existingProductInCart.quantity += 1;
            await existingProductInCart.save();
    
            const product = await Product.findById(productID);
            cart.tot_price += product.price;
            await cart.save();
            res
              .status(200)
              .json({ message: "Product quantity updated in cart successfully." });
          } else {
            res
              .status(400)
              .json({ error: "Cannot add more than 5 of the same item." });
          }
        } else {
          const productInCart = new ProductsinCart({
            cart: cart._id,
            product: productID,
            quantity: 1,
          });
          await productInCart.save();
          res.status(200).json({ message: "Product added to cart successfully." });
    
          const product = await Product.findById(productID);
          cart.tot_price += product.price;
          await cart.save();
        }
      } catch (error) {
        res.status(500).json({ error: "Failed to add product to cart." });
      }
});

// remove a product from cart.
export const removeFromCart = TryCatch(async (req, res, next) => {
    try {
        const { customerID, productID } = req.body;
    
        const cart = await Cart.findOne({ customerId: customerID });
    
        if (!cart) {
          return res
            .status(404)
            .json({ error: "Cart not found for this customer." });
        }
    
        const existingProductInCart = await ProductsinCart.findOne({
          cart: cart._id,
          product: productID,
        });
    
        if (!existingProductInCart) {
          return res.status(404).json({ error: "Product not found in cart." });
        }
    
        if (existingProductInCart.quantity > 1) {
          existingProductInCart.quantity -= 1;
          await existingProductInCart.save();
    
          const product = await Product.findById(productID);
          cart.tot_price -= product.price;
          await cart.save();
    
          res
            .status(200)
            .json({ message: "Product quantity decreased in cart successfully." });
        } else {
          await ProductsinCart.deleteOne({ _id: existingProductInCart._id });
    
          const product = await Product.findById(productID);
          cart.tot_price -= product.price;
          await cart.save();
    
          res
            .status(200)
            .json({ message: "Product removed from cart successfully." });
        }
      } catch (error) {
        res.status(500).json({ error: "Failed to remove product from cart." });
      }
});

// Get all products in a cart
export const productsinCart = TryCatch(async (req, res, next) => {
    try {
        const { customerID } = req.body;
    
        const cart = await Cart.findOne({ customerId: customerID });
    
        if (!cart) {
          return res
            .status(404)
            .json({ error: "Cart not found for this customer." });
        }
    
        const productsInCart = await ProductsinCart.find({ cart: cart._id });
    
        const productIds = productsInCart.map((item) => item.product);
    
        const products = await Product.find({ _id: { $in: productIds } });
    
        const productsWithQuantity = products.map((product) => {
          const productInCart = productsInCart.find(
            (item) => item.product.toString() === product._id.toString()
          );
          return {
            ...product.toObject(),
            quantity: productInCart.quantity,
          };
        });
    
        res.status(200).json(productsWithQuantity);
      } catch (error) {
        res.status(500).json({ error: "Failed to get products in cart" });
      }
});

// Clear out a cart.
export const clearCart = TryCatch(async (req, res, next) => {
    try {
        const { customerID } = req.body;

        const cart = await Cart.findOne({ customerId: customerID });
        if (!cart) {
            return res.status(404).json({ message: "cart not found for this customer." });
        }

        const result = await ProductsinCart.deleteMany({ cart: cart._id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "no products found in the cart to clear." });
        }

        await Cart.updateOne({ _id: cart._id }, { $set: { tot_price: 0 } });
  
        res.status(200).json({ message: "cart cleared successfully." })
    } catch (error) {
        res.status(500).json({ error: "failed to clear cart." });
    }
});