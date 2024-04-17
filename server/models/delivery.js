import mongoose from 'mongoose';

const deliverySchema = new mongoose.Schema ({
  status: {
    type: Boolean,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true,
  },
});

const Delivery = new mongoose.model ('Delivery', deliverySchema);

export default Delivery;
