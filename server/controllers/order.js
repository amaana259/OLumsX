import { User } from "../models/user.js";
import { Order } from "../models/order.js";
import mongoose from 'mongoose';
import { TryCatch } from "../middlewares/error.js";
import bcrypt from 'bcrypt';
import Product from '../models/product.js'; 

// Orders.

// place an order (initial API).
export const createOrder = TryCatch(async (req, res, next) => {
    try {
        const { customerID, vendorID, bill, status } = req.body;                // status must be false initially.
    
        const order = new Order({
          customer: customerID,
          vendor: vendorID,
          bill: bill,
          status: status,
        });
    
        await order.save();
    
        res.status(200).json({ message: "Order placed successfully." });
      } catch (error) {
        res.status(500).json({ error: "Failed to create order." });
      }
});

// fetch all orders placed by a customer.
export const customerOrders = TryCatch(async (req, res, next) => {
    try {
        const { customerID } = req.body;
    
        if (!customerID) {
          return res.status(400).json({ error: "Customer ID is required." });
        }
    
        const orders = await Order.find({ customer: customerID });
        // console.log(orders);
    
        if (!orders.length) {
          return res
            .status(404)
            .json({ error: "No orders found for this customer." });
        }
        res.status(200).json(orders);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch orders." });
      }
});

// fetch all orders placed to a vendor.
export const vendorOrders = TryCatch(async (req, res, next) => {
    try {
        const { vendorID } = req.body;
    
        if (!vendorID) {
          return res.status(400).json({ error: "Vendor ID is required." });
        }
    
        const orders = await Order.find({ vendor: vendorID });
    
        if (!orders.length) {
          return res
            .status(404)
            .json({ error: "No orders found for this vendor." });
        }
    
        res.status(200).json(orders);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch orders." });
      }
});

// vendor confirms a placed order.
export const confirmOrder = TryCatch(async (req, res, next) => {
    try {
        const { orderId } = req.body;
    
        if (!orderId) {
          return res.status(400).json({ error: "Order ID is required." });
        }
  
        const updatedOrder = await Order.findByIdAndUpdate(
          orderId,
          { status: true },
          { new: true }
        );
    
        if (!updatedOrder) {
          return res.status(404).json({ error: "No order found with the given ID." });
        }
    
        res.status(200).json({ message: "Order confirmed successfully.", order: updatedOrder });
      } catch (error) {
        res.status(500).json({ error: "Failed to confirm the order." });
      }
});


  