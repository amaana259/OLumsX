import mongoose from 'mongoose';
import { TryCatch } from "../middlewares/error.js";
import bcrypt from 'bcrypt';
import Product from '../models/product.js';
import ProductsinCart from '../models/productsInCart.js';
import ProductsinOrder from '../models/productsInOrder.js';
import Order from '../models/order.js';
import Cart from '../models/cart.js';

// ProductsinOrder.

// group products by vendor.
const groupProductsByVendor = (products) => {
  return products.reduce((groups, product) => {
    const vendorID = product.vendor;
    if (!groups[vendorID]) {
      groups[vendorID] = [];
    }
    groups[vendorID].push(product);
    return groups;
  }, {});
};

// create multiple orders, for each unique vendor.
export const createOrdersWithVendors = TryCatch(async (req, res, next) => {
    try {
        const { customerId, products } = req.body;
        console.log("here order ", req.body);
        const groupedProducts = groupProductsByVendor(products);
        const vendorKeys = Object.keys(groupedProducts);
        console.log("vendor keys ", vendorKeys)
        for (const vendorKey of vendorKeys) {
          const products = groupedProducts[vendorKey];
          let tot_price = 0;
    
          for (const product of products) {
            tot_price += product.price * product.quantity;
          }
    
          const order = new Order({
            customer: customerId,
            vendor: vendorKey,
            bill: tot_price,
            status: false,
          });
    
          await order.save();
    
          for (const product of products) {
    
            const productInOrder = new ProductsinOrder({
              order: order._id,
              product: product._id,
              quantity: product.quantity,
            });
    
            await productInOrder.save();
          }
        }

        try 
        {
            const cart = await Cart.findOne({ customerId: customerId });
    
            const result = await ProductsinCart.deleteMany({ cart: cart._id });

            await Cart.updateOne({ _id: cart._id }, { $set: { tot_price: 0 } });

        } catch (error) {}
    
        res.status(200).json({ message: "Orders placed successfully." });

      } catch (error) {
        console.log("this error ", error)
        res.status(500).json({ error: "Failed to check tests." });
      }
});

// fetch the product details for order referenced.
export const fetchOrderDetails = TryCatch(async (req, res, next) => {
    try {
        const { orderID } = req.body;
        const productsInOrder = await ProductsinOrder.find({ order: orderID })
          .populate('product')
          .exec();
    
        if (!productsInOrder) {
          return res.status(404).send('Order not found');
        }

        const productDetails = productsInOrder.map(p => ({
          productId: p.product._id,
          name: p.product.name,
          category: p.product.category,
          price: p.product.price,
          vendor: p.product.vendor,
          imageUrls: p.product.imageUrls,
          description: p.product.description,
          wishlisted: p.product.wishlisted,
          quantity: p.quantity
        }));

        res.json(productDetails);
      } catch (error) {
        console.error('Failed to fetch products in order:', error);
        res.status(500).send('Internal Server Error');
      }
});

