import mongoose from 'mongoose';

const adSchema = new mongoose.Schema({
vendorID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
},
imageUrl: {
    type: String,
},
});

const Ad = new mongoose.model('Ad', adSchema);

export default Ad;