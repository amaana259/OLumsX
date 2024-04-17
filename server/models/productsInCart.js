import mongoose from 'mongoose';

const prodinCartSchema = new mongoose.Schema({
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart',
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    max: [5, 'cannot add more than 5 of the same item.']
  },
});

const ProductsinCart = new mongoose.model('ProductsinCart', prodinCartSchema);

export default ProductsinCart;