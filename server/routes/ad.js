import express from "express";
import { placeAd, deleteAd, fetchVendorAds, fetchAllAds } from "../controllers/ad.js";
const app = express.Router();

// Route to place an ad.
app.post('/placead', placeAd);

// Route to delete an existing ad.
app.post('/deletead', deleteAd);

// Route to fetch all ads placed by a vendor.
app.post('/fetchads', fetchVendorAds);

// Route to fetch all ads placed.
app.get('/fetchadsall', fetchAllAds);

export default app;