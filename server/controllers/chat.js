import { User } from "../models/user.js";
import { ChatMessage } from "../models/chat.js";
import mongoose from 'mongoose';
import { TryCatch } from "../middlewares/error.js";
import bcrypt from 'bcrypt';
import Product from '../models/product.js'; 

export const fetchMessages = TryCatch(async (req, res, next) => {
    const { clientID, vendorID } = req.body;
    try {
        const messages = await ChatMessage.find({
            $or: [
                { from: clientID, to: vendorID },
                { from: vendorID, to: clientID }
            ]
        })
        .sort({ timestamp: 1 })
        .populate('from', 'username user_type')
        .populate('to', 'username user_type');

        if (messages.length === 0) 
        {
            res.status(404).json({ message: "No messages found between the specified client and vendor." });
        } 
        else 
        {
            res.status(200).json(messages);
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch messages." });
    }
});

export const createMessage = TryCatch(async (req, res, next) => {
    const { from, to, message } = req.body;

    if (!from || !to || !message) {
        return res.status(400).json({ error: "Missing required fields: from, to, message." });
    }

    const newMessage = new ChatMessage({
        from,
        to,
        message
    });

    await newMessage.save();

    res.status(201).json(newMessage);
});

export const customerChats = TryCatch(async (req, res, next) => {
    const { customerID } = req.body;

    const customer = await User.findOne({ _id: customerID, user_type: 'Customer' });
    if (!customer) 
    {
        return res.status(404).json({ message: "no customer found with the given ID." });
    }

    const results = await ChatMessage.aggregate([
        {
            $match: {
                $or: [
                    { from: new mongoose.Types.ObjectId(customerID) },
                    { to: new mongoose.Types.ObjectId(customerID) }
                ]
            }
        },
        {
            $sort: { timestamp: -1 }
        },
        {
            $group: {
                _id: {
                    $cond: [
                        { $eq: ["$from", new mongoose.Types.ObjectId(customerID)] },
                        "$to",
                        "$from"
                    ]
                },
                lastMessage: { $first: "$$ROOT" }
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "_id",
                foreignField: "_id",
                as: "vendorInfo"
            }
        },
        {
            $unwind: "$vendorInfo"
        },
        {
            $project: {
                _id: 0,
                vendorID: "$_id",
                lastMessage: "$lastMessage.message",
                timestamp: "$lastMessage.timestamp",
                fromCustomer: {
                    $eq: ["$lastMessage.from", new mongoose.Types.ObjectId(customerID)]
                },
                vendorUsername: "$vendorInfo.username"
            }
        }
    ]);

    if (results.length === 0) {
        return res.status(404).json({ message: "No chats found for this customer." });
    } else {
        return res.status(200).json(results);
    }
});

export const vendorChats = TryCatch(async (req, res, next) => {
    const { vendorID } = req.body;

    const vendor = await User.findOne({ _id: vendorID, user_type: 'Vendor' });
    if (!vendor) 
    {
        return res.status(404).json({ message: "no customer found with the given ID."});
    }

    const results = await ChatMessage.aggregate([
        {
            $match: {
                $or: [
                    { from: new mongoose.Types.ObjectId(vendorID) },
                    { to: new mongoose.Types.ObjectId(vendorID) }
                ]
            }
        },
        {
            $sort: { timestamp: -1 }
        },
        {
            $group: {
                _id: {
                    $cond: [
                        { $eq: ["$to", new mongoose.Types.ObjectId(vendorID)] },
                        "$from",
                        "$to"
                    ]
                },
                lastMessage: { $first: "$$ROOT" }
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "_id",
                foreignField: "_id",
                as: "customerInfo"
            }
        },
        {
            $unwind: "$customerInfo"
        },
        {
            $project: {
                _id: 0,
                customerID: "$_id",
                lastMessage: "$lastMessage.message",
                timestamp: "$lastMessage.timestamp",
                fromVendor: {
                    $eq: ["$lastMessage.from", new mongoose.Types.ObjectId(vendorID)]
                },
                customerUsername: "$customerInfo.username"
            }
        }
    ]);

    if (results.length === 0) {
        return res.status(404).json({ message: "No chats found for this vendor." });
    } else {
        return res.status(200).json(results);
    }
});