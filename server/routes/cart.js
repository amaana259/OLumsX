import express from "express";
import { createCart, getPriceCart } from "../controllers/cart.js";
const app = express.Router();

// Route to create a cart for a new user.
app.post('/createcart', createCart);

// Route to get price of current cart.
app.post('/getcartprice', getPriceCart);

export default app;