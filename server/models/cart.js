import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  tot_price: {
    type: Number,
    required: [true, 'total price of cart is required.'],
    max: [9999999999, 'total price of cart cannot be larger than 9999999999.']
  },
});

const Cart = new mongoose.model('Cart', cartSchema);

export default Cart;