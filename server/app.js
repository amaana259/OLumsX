import express from "express";
import userRoute from './routes/user.js';
import productRoute from './routes/product.js';
import { connectDB } from "./utils/features.js";
import { errorMiddleware } from "./middlewares/error.js";

// setting port to 3000
const port = 3000;

//connect to MongoDB
connectDB();

const app = express();
app.use(express.json());

// User api routing
app.use("/api/user", userRoute);

// Product api routing
app.use("/api/product", productRoute);

app.use(errorMiddleware);

app.listen(port, () => {
    console.log(`Server is working on http://localhost:${port}`);
});
