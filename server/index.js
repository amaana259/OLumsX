import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from "dotenv";

import userRoute from './routes/user.js';
import productRoute from './routes/product.js';
import chatRoute from './routes/chat.js';
import orderRoute from './routes/order.js';
import cartRoute from './routes/cart.js';
import prodcartRoute from './routes/productsincart.js';
import wishlistRoute from './routes/wishlist.js'
import reviewRoute from './routes/reviews.js'
import adRoute from './routes/ad.js'

import { connectDB } from "./utils/features.js";
import { errorMiddleware } from "./middlewares/error.js";

import AWS from 'aws-sdk';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const S3 = new AWS.S3();
const bucketName = 'olumsx';

dotenv.config();

const awsAccessKeyId = process.env.AWS_ACCESS_KEY_ID;
const awsSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'Europe (Stockholm) eu-north-1',
});

const app = express()
app.use(cors(
    {
        origin: "*",
        methods: ["POST", "GET", "PATCH", "DELETE", "PUT"],
        credentials: true
    }
));

// app.use(cors(
//     {
//         origin: ["https://olumsx-backend-deploy-new.vercel.app"],
//         methods: ["POST", "GET", "PATCH", "DELETE", "PUT"],
//         credentials: true
//     }
// ));

app.use(express.json())

try {
  mongoose
    .connect("mongodb+srv://Shayan:1234@olumsx-test.bddt8lm.mongodb.net/?retryWrites=true&w=majority&appName=OLumsX-Test")
    .then(() => {
      app.listen(3001, () => {
        console.log(`listening on port ${3001}`);
        console.log("Connected to Database");
      });
    })
    .catch((error) => {
      console.log(error);
    });
  } catch (err) {
  console.log(err);
}
// User api routing
app.use("/api/user", userRoute);

// Product api routing
app.use("/api/product", productRoute);

// Chat api routing
app.use("/api/chat", chatRoute);

// Cart api routing
app.use("/api/cart", cartRoute);

// Products in Cart api routing
app.use("/api/prodcart", prodcartRoute);

// Wishlist api routing
app.use("/api/wishlist", wishlistRoute);

// Orders api routing
app.use("/api/orders", orderRoute);

// Reviews api routing
app.use("/api/review", reviewRoute);

// Reviews ad routing
app.use("/api/ad", adRoute);

app.use(errorMiddleware);

app.get("/", (req, res) => {
  try{
    res.json("Hello");
    
  }catch(err)
  {
    res.status(500).json({ error: "Failed to create order." });
  }
})

// app.post('/uploadproductimages', upload.array('productImages', 4), (req, res) => {
//   console.log('Request received');
//   console.log('Authorization:', req.headers.authorization);
//   console.log('AWS Credentials:', {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   });

//   const files = req.files;
//   const uploadPromises = files.map((file, index) => {
//     const uniqueKey = `${Date.now()}-${index}-${file.originalname}`;
//     const params = {
//       Bucket: 'your-bucket-name',
//       Key: uniqueKey,
//       Body: file.buffer,
//       ContentType: file.mimetype,
//       ACL: 'public-read',
//     };

//     return S3.upload(params).promise();
//   });

//   Promise.all(uploadPromises)
//     .then((results) => {
//       const imageUrls = results.map((r) => r.Location);
//       res.json({ imageUrls });
//     })
//     .catch((error) => {
//       console.error('Error uploading to S3:', error);
//       res.status(500).json({ error: 'Failed to upload files.' });
//     });
// });
