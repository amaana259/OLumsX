import express from "express";
import { createOrder, customerOrders, vendorOrders, confirmOrder } from "../controllers/order.js";
import { createOrdersWithVendors, fetchOrderDetails } from "../controllers/productsinorder.js";
const app = express.Router();

// Route to create/place an order.
app.post('/createorder', createOrder);

// Route to fetch all orders placed by a customer.
app.post('/customerorders', customerOrders);

// Route to fetch all orders placed to a vendor.
app.post('/vendororders', vendorOrders);

// Route to confirm a placed order.
app.patch('/confirmorder', confirmOrder);

// Route to create different orders for products with different vendors in cart.
app.post('/createordersdiffvendors', createOrdersWithVendors);

// Route to fetch the product details for referenced order.
app.post('/fetchproddetails', fetchOrderDetails);

export default app;