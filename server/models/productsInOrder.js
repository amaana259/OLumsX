import mongoose from 'mongoose';

const prodinOrderSchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
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

const ProductsinOrder = new mongoose.model('ProductsinOrder', prodinOrderSchema);

export default ProductsinOrder;