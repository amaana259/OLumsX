import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema ({
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'name is required.'],
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'category required',],
  },
  rating: {
    type: Number,
    required: [true, 'rating is required.'],
  },
  review_text: {
    type: String,
    required: [true, 'review text is required.'],
  },
});

const Reviews = new mongoose.model ('Reviews', reviewSchema);

export default Reviews;