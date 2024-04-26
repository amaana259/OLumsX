import mongoose from 'mongoose';
import { TryCatch } from "../middlewares/error.js";
import bcrypt from 'bcrypt';
import Ad from '../models/ad.js';

// Place Ad
// place an ad with vendorID and ad image URL.
export const placeAd = TryCatch(async (req, res, next) => {
    try {
        const { vendorID, imageUrl } = req.body;

        const ad = new Ad({
            vendorID,
            imageUrl,
        });

        await ad.save();

        res.status(201).json(ad);
    } catch (error) {
        res.status(500).json({ error: "Failed to place ad" });
    }
});

// Delete Ad
// delete an ad by its ID
export const deleteAd = TryCatch(async (req, res, next) => {
    try {
        const { adId } = req.body;
        await Ad.findByIdAndDelete(adId);
        res.status(200).json({ message: "Ad deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete ad" });
    }
});

// Fetch Vendor Ads
// fetch all ads for a given vendor ID
export const fetchVendorAds = TryCatch(async (req, res, next) => {
    try {
        const { vendorID } = req.body;
        const ads = await Ad.find({ vendorID });
        res.status(200).json(ads);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch vendor ads" });
    }
});

// Fetch All Ads
// fetch all ads
export const fetchAllAds = TryCatch(async (req, res, next) => {
    try {
        const ads = await Ad.find();
        res.status(200).json(ads);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch ads" });
    }
});