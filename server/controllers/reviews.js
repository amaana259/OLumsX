import { User } from "../models/user.js";
import { TryCatch } from "../middlewares/error.js";
import bcrypt from 'bcrypt';
import Product from '../models/product.js';
import Wishlist from '../models/wishlist.js'
import Cart from '../models/cart.js'
import Reviews from "../models/reviews.js";

// Method to add a review of a product
export const addReview = TryCatch(async (req, res, next) => {
    const { customer_id, product_id, rating, review_text } = req.body;

    if (!customer_id || !product_id || !rating || !review_text) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const newReview = new Reviews({
        customer_id,
        product_id,
        rating,
        review_text
    });

    await newReview.save();
    res.status(201).json({ message: 'Review added successfully' });
});

// Method to get reviews of a product
export const getReviews = TryCatch(async (req, res) => {
    try {
        const { productId } = req.params;
        const reviews = await Reviews.find({ product_id: productId }).populate('customer_id', 'name').populate('product_id', 'name');
        if (!reviews.length) {
            return res.status(404).json({ message: "No reviews found for this product." });
        }
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


