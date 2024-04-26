import mongoose from 'mongoose';

const usersessionSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    role: {
        type: String,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const userSession = mongoose.model('userSession', usersessionSchema);

export default userSession;