import express from "express";
import { addToWishlist, removeFromWishlist, fetchWishlist, checkWishlist } from "../controllers/wishlist.js"
const app = express.Router();

// Route to add a product/item to client's wishlist.
app.post('/addwishlist', addToWishlist);

// Route to un-wishlist an item for a client.
app.post('/removewishlist', removeFromWishlist);

// Route to fetch wishlisted items for a client.
app.post('/fetchwishlist', fetchWishlist);

// Route to check if a client has wishlisted a product.
app.post('/checkwishlist', checkWishlist);

export default app;