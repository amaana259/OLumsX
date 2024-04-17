import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema ({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  bill: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
});

export const Order = new mongoose.model ('Order', orderSchema);

export default Order;
