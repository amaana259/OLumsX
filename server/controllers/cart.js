import mongoose from 'mongoose';
import { TryCatch } from "../middlewares/error.js";
import bcrypt from 'bcrypt';
import Product from '../models/product.js';
import ProductsinCart from '../models/productsInCart.js';
import Cart from '../models/cart.js';

// Cart
// create a new cart for a customer (initial API).
export const createCart = TryCatch(async (req, res, next) => {
    try {
        const { customerID } = req.body;
    
        const cart = new Cart({
          customerId: customerID,
          tot_price: 0,
        });
    
        await cart.save();
    
        res.status(201).json(cart);
      } catch (error) {
        res.status(500).json({ error: "Failed to create cart" });
      }
});

// Get Total Price of Cart.
export const getPriceCart = TryCatch(async (req, res, next) => {
    try {
        const { customerID } = req.body;
    
        const cart = await Cart.findOne({ customerId: customerID });
    
        if (!cart) {
          return res.status(404).json({ error: "Cart not found." });
        }
        res.json({ tot_price: cart.tot_price });
      } catch (error) {
        res.status(500).json({ error: "Failed to get cart total price." });
      }
});

