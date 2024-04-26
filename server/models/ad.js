import mongoose from 'mongoose';

const adSchema = new mongoose.Schema({
vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
},
imageUrl: {
    type: String,
    required: true,
},
});

const Ad = new mongoose.model('Ad', adSchema);

export default Ad;