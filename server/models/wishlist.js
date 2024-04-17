import mongoose from 'mongoose';
import validator from 'validator';
import jwt from 'jsonwebtoken';

const WishlistSchema = new mongoose.Schema({
    client_id: {
      type: mongoose.Types.ObjectId,
      required: [true, 'Client ID is required.'],
      ref: 'User'
    },
    product_id: {
      type: mongoose.Types.ObjectId,
      required: [true, 'Product ID is required.'],
      ref: 'Product'
    }
  });
  
export const Wishlist = mongoose.model('Wishlist', WishlistSchema);

export default Wishlist;