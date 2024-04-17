import mongoose from 'mongoose';
import validator from 'validator';
import jwt from 'jsonwebtoken';

const ChatMessageSchema = new mongoose.Schema({
    from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    to: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    message: {type: String},
    timestamp: { type: Date, default: Date.now }
  });

export const ChatMessage = mongoose.model('ChatMessage', ChatMessageSchema);

export default ChatMessage;