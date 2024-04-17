import express from "express";
import { addReview, getReviews } from "../controllers/reviews.js";
const app = express.Router();

// Route to add a review
app.post('/addreview', addReview);

// Route to get reviews
app.get('/getreviews/:productId', getReviews);

export default app;