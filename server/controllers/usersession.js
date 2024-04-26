import mongoose from 'mongoose';
import { TryCatch } from "../middlewares/error.js";
import bcrypt from 'bcrypt';
import User from '../models/user.js';
import userSession from '../models/usersession.js';
import { ObjectId } from 'mongodb';

// create user session entry.
export const createUserSession = TryCatch(async (req, res, next) => {
    try {
        const { userID, user_type } = req.body;
        const userSession = new userSession({
            userID: userID,
            role: user_type,
        });
        await userSession.save();
        res.status(201).json(userSession);
    } catch (error) {
        res.status(500).json({ error: "Failed to create user" });
    }
});

// delete user session entry.
export const deleteUserSession = TryCatch(async (req, res, next) => {
    try {
        await userSession.deleteMany({});
        res.status(200).json({ message: "User sessions deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete user sessions" });
    }
});

// // delete user session entry.
// export const deleteUserSession = TryCatch(async (req, res, next) => {
//     try {
//         console.log("here")
//         const userID = req.params.userID;
//         await userSession.deleteMany({ userID: userID });
//         res.status(200).json({ message: "User sessions deleted successfully" });
//     } catch (error) {
//         res.status(500).json({ error: "Failed to delete user sessions" });
//     }
// });

// fetch user entry with latest timestamp.
export const fetchLatestUserSession = TryCatch(async (req, res, next) => {
    try {
        const latestUserSession = await userSession.findOne().sort({ timestamp: -1 });
        if (latestUserSession) {
            const userID = new ObjectId(latestUserSession.userID);
            const role = latestUserSession.role;
            const user = await User.findOne({ _id: userID });
            if (user) {
                const userId = user._id;
                res.status(200).json({ userID: userId, role: role });
            } else {
                res.status(404).json({ error: "No user found" });
            }
        } else {
            res.status(404).json({ error: "No user session found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch latest user session" });
    }
});
