import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
// import bcrypt from "bcrypt";

import User from "./models/user.js";
import Product from "./models/product.js";
import Order from "./models/order.js";
import Cart from "./models/cart.js";
import ProductsinCart from "./models/productsInCart.js";
import Delivery from "./models/delivery.js";
import ProductsinOrder from "./models/productsInOrder.js";

import userRoute from './routes/user.js';
import productRoute from './routes/product.js';
import chatRoute from './routes/chat.js';
import orderRoute from './routes/order.js';
import cartRoute from './routes/cart.js';
import prodcartRoute from './routes/productsincart.js';
import wishlistRoute from './routes/wishlist.js'
import reviewRoute from './routes/reviews.js'
import { connectDB } from "./utils/features.js";
import { errorMiddleware } from "./middlewares/error.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

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

app.use(errorMiddleware);


// listen for requests.
try {
  mongoose
    .connect(process.env.MONG_URI)
    .then(() => {
      app.listen(process.env.PORT, () => {
        console.log(`listening on port ${process.env.PORT}`);
        console.log("Connected to Database");
      });
    })
    .catch((error) => {
      console.log(error);
    });
  } catch (err) {
  console.log(err);
}


//Make your API calls for every usecase here

// Signup Page.

// app.post ('/signup', async (req, res) => {
//   const {
//     username,
//     email,
//     password,
//     user_type,
//     first_name,
//     last_name,
//     address,
//     gender,
//     DOB,
//   } = req.body;

//   try {
//     if (
//       !username ||
//       !email ||
//       !password ||
//       !user_type ||
//       !first_name ||
//       !last_name ||
//       !address ||
//       !gender ||
//       !DOB
//     ) {
//       return res.status (400).json ({error: 'All fields required.'});
//     }

//     const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     if (!emailReg.test (email)) {
//       return res.status (400).json ({error: 'Invalid Email address entered.'});
//     }

//     const existingUser = await User.findOne ({email});
//     if (existingUser) {
//       return res.status (400).json ({error: 'Email already in use'});
//     }

//     const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//     if (!passwordReg.test (password)) {
//       return res.status (400).json ({
//         error: 'Password must be at least 8 characters long, have at least one uppercase letter, one lowercase letter, one digit and one special character.',
//       });
//     }

//     const hashedPassword = await bcrypt.hash (password, 5);
//     const newUser = new User ({
//       username,
//       email,
//       password: hashedPassword,
//       user_type,
//       first_name,
//       last_name,
//       address,
//       gender,
//       DOB,
//     });

//     await newUser.save ();

//     const cart = new Cart ({
//         customerId: newUser._id,
//         tot_price: 0,
//       });
  
//       await cart.save ();

//     res.status (201).json ({message: 'Signup successfull.'});
//   } catch (err) {
//     res.status (500).json ({error: 'Error during signup'});
//   }
// });

// // Login Page.

// app.post("/", async (req, res) => {
//   // console.log(req.body);
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ error: "Invalid email entered." });
//     }

//     const passwordMatch = await bcrypt.compare(password, user.password);
//     if (!passwordMatch) {
//       return res.status(400).json({ error: "Invalid password enter" });
//     }

//     res.status(200).json({
//       message: "Logged in successfully",
//       user_id: user._id,
//       user_type: user.user_type,
//     });
//   } catch (err) {
//     // console.log(err);
//     res.status(500).json({ error: "Error during login" });
//   }
// });

// // Products.

// // create/post a Product.
// app.post("/addproduct", async (req, res) => {
//   try {
//     const { name, color, price, vendor } = req.body;

//     const product = new Product({
//       name,
//       color,
//       price,
//       vendor,
//     });

//     await product.save();

//     res.status(201).json({ message: "Product added successfully." });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to add product." });
//   }
// });

// // get/fetch a Product.
// app.get("/fetchprod", async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch product." });
//   }
// });

// // update the information for a Product.
// app.put("/updateproduct", async (req, res) => {
//   try {
//     const { _id, name, color, price, vendor } = req.body;

//     const product = await Product.findById(_id);

//     if (!product) {
//       return res.status(404).json({ error: "Product does not exist." });
//     }
//     product.name = name;
//     product.color = color;
//     product.price = price;
//     product.vendor = vendor;

//     await product.save();

//     res.status(200).json({ message: "Product updated successfully." });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to update product details." });
//   }
// });

// // remove a Product.
// app.delete("/deleteproduct", async (req, res) => {
//   try {
//     const { productId } = req.body;

//     const product = await Product.findByIdAndDelete(productId);

//     if (!product) {
//       return res.status(404).json({ error: "Product does not exist." });
//     }

//     res.status(200).json({ message: "Product deleted successfully." });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to delete product." });
//   }
// });

// // Orders.

// // place an order (initial API).
// app.post("/createorder", async (req, res) => {
//   // Create Order.
//   try {
//     const { customerId, vendorId, bill, paid } = req.body;

//     const order = new Order({
//       customer: customerId,
//       vendor: vendorId,
//       bill: bill,
//       paid: paid,
//     });

//     await order.save();

//     res.status(200).json({ message: "Order placed successfully." });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to create order." });
//   }
// });

// // fetch all orders placed by a customer.
// app.post("/fetchorderscust", async (req, res) => {
//   try {
//     const { customerId } = req.body;

//     if (!customerId) {
//       return res.status(400).json({ error: "Customer ID is required." });
//     }

//     const orders = await Order.find({ customer: customerId });
//     // console.log(orders);

//     if (!orders.length) {
//       return res
//         .status(404)
//         .json({ error: "No orders found for this customer." });
//     }
//     res.status(200).json(orders);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch orders." });
//   }
// });

// // fetch all orders placed by a vendor.
// app.get("/fetchordersvend", async (req, res) => {
//   try {
//     const { vendorId } = req.body;

//     if (!vendorId) {
//       return res.status(400).json({ error: "Vendor ID is required." });
//     }

//     const orders = await Order.find({ vendor: vendorId });

//     if (!orders.length) {
//       return res
//         .status(404)
//         .json({ error: "No orders found for this vendor." });
//     }

//     res.status(200).json(orders);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch orders." });
//   }
// });

// // ProductsinCart.

// // add a product to cart.
// app.post("/addtocart", async (req, res) => {
//   try {
//     const { customerID, productID } = req.body;
//     const cart = await Cart.findOne({ customerId: customerID });

//     if (!cart) {
//       return res
//         .status(404)
//         .json({ error: "Cart not found for this customer." });
//     }

//     const existingProductInCart = await ProductsinCart.findOne({
//       cart: cart._id,
//       product: productID,
//     });

//     if (existingProductInCart) {
//       if (existingProductInCart.quantity < 5) {
//         existingProductInCart.quantity += 1;
//         await existingProductInCart.save();

//         const product = await Product.findById(productID);
//         cart.tot_price += product.price;
//         await cart.save();
//         res
//           .status(200)
//           .json({ message: "Product quantity updated in cart successfully." });
//       } else {
//         res
//           .status(400)
//           .json({ error: "Cannot add more than 5 of the same item." });
//       }
//     } else {
//       const productInCart = new ProductsinCart({
//         cart: cart._id,
//         product: productID,
//         quantity: 1,
//       });
//       await productInCart.save();
//       res.status(200).json({ message: "Product added to cart successfully." });

//       const product = await Product.findById(productID);
//       cart.tot_price += product.price;
//       await cart.save();
//     }
//   } catch (error) {
//     res.status(500).json({ error: "Failed to add product to cart." });
//   }
// });

// // remove a product from cart.
// app.post("/removefromcart", async (req, res) => {
//   try {
//     const { customerID, productID } = req.body;

//     const cart = await Cart.findOne({ customerId: customerID });

//     if (!cart) {
//       return res
//         .status(404)
//         .json({ error: "Cart not found for this customer." });
//     }

//     const existingProductInCart = await ProductsinCart.findOne({
//       cart: cart._id,
//       product: productID,
//     });

//     if (!existingProductInCart) {
//       return res.status(404).json({ error: "Product not found in cart." });
//     }

//     if (existingProductInCart.quantity > 1) {
//       existingProductInCart.quantity -= 1;
//       await existingProductInCart.save();

//       const product = await Product.findById(productID);
//       cart.tot_price -= product.price;
//       await cart.save();

//       res
//         .status(200)
//         .json({ message: "Product quantity decreased in cart successfully." });
//     } else {
//       await ProductsinCart.deleteOne({ _id: existingProductInCart._id });

//       const product = await Product.findById(productID);
//       cart.tot_price -= product.price;
//       await cart.save();

//       res
//         .status(200)
//         .json({ message: "Product removed from cart successfully." });
//     }
//   } catch (error) {
//     res.status(500).json({ error: "Failed to remove product from cart." });
//   }
// });

// // Cart
// // create a new cart for a customer (initial API).
// app.post("/createcart", async (req, res) => {
//   try {
//     const { customer } = req.body;

//     const cart = new Cart({
//       customerId: customer,
//       tot_price: 0,
//     });

//     await cart.save();

//     res.status(201).json(cart);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to create cart" });
//   }
// });

// // Products of a Vendor
// app.post("/fetchproductsByVendor", async (req, res) => {
//   try {
//     const { vendorID } = req.body;

//     const products = await Product.find({ vendor: vendorID });

//     if (!products.length) {
//       return res
//         .status(404)
//         .json({ error: "No product found for this vendor." });
//     }

//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch products by vendor" });
//   }
// });

// // Get all products in a cart
// app.post("/getproductsincart", async (req, res) => {
//   try {
//     const { customerID } = req.body;

//     const cart = await Cart.findOne({ customerId: customerID });

//     if (!cart) {
//       return res
//         .status(404)
//         .json({ error: "Cart not found for this customer." });
//     }

//     const productsInCart = await ProductsinCart.find({ cart: cart._id });

//     const productIds = productsInCart.map((item) => item.product);

//     const products = await Product.find({ _id: { $in: productIds } });

//     const productsWithQuantity = products.map((product) => {
//       const productInCart = productsInCart.find(
//         (item) => item.product.toString() === product._id.toString()
//       );
//       return {
//         ...product.toObject(),
//         quantity: productInCart.quantity,
//       };
//     });

//     res.status(200).json(productsWithQuantity);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to get products in cart" });
//   }
// });

// app.get("/fetchcustomers", async (req, res) => {
//   try {
//     const customers = await User.find(
//       { user_type: "Customer" },
//       { _id: 1, username: 1, email: 1 }
//     );
//     res.json(customers);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch customers." });
//   }
// });

// app.get("/fetchvendors", async (req, res) => {
//   try {
//     const vendors = await User.find(
//       { user_type: "Vendor" },
//       { _id: 1, username: 1, email: 1 }
//     );
//     res.json(vendors);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch vendors." });
//   }
// });

// // Delete User
// app.delete("/deleteuser", async (req, res) => {
//   try {
//     const { userID } = req.body;

//     const user = await User.findById(userID);

//     if (!user) {
//       return res.status(404).json({ message: "User not found." });
//     }

//     if (user.user_type === "Customer") {

//       const orders = await Order.find({ customer: userID });

//       await ProductsinOrder.deleteMany({
//         order: { $in: orders.map((order) => order._id) },
//       });

//       await Order.deleteMany({ customer: userID });
//     } else if (user.user_type === "Vendor") {

//       const products = await Product.find({ vendor: userID });

//       const orders = await ProductsinOrder.find({
//         product: { $in: products.map((product) => product._id) },
//       });

//       await ProductsinOrder.deleteMany({
//         product: { $in: products.map((product) => product._id) },
//       });

//       await Order.deleteMany({
//         _id: { $in: orders.map((order) => order.order) },
//       });

//       await Product.deleteMany({ vendor: userID });
//     }

//     await User.findByIdAndDelete(userID);

//     res.status(200).json({ message: "User deleted successfully." });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to delete user." });
//   }
// });

// // Group products by vendor
// const groupProductsByVendor = (products) => {
//   return products.reduce((groups, product) => {
//     const vendorID = product.vendor;
//     if (!groups[vendorID]) {
//       groups[vendorID] = [];
//     }
//     groups[vendorID].push(product);
//     return groups;
//   }, {});
// };

// // Create Order with Grouped Products
// app.post("/createorderwithgroups", async (req, res) => {
//   try {
//     const { customerId, products } = req.body;
//     // console.log (customerId);
//     // console.log (tot_price);
//     // console.log (products);

//     const groupedProducts = groupProductsByVendor(products);
//     // console.log(groupedProducts)

//     const vendorKeys = Object.keys(groupedProducts);

//     for (const vendorKey of vendorKeys) {
//       const products = groupedProducts[vendorKey];
//       //   console.log (Vendor ID: ${vendorKey});
//       //   console.log ('Products:', products);

//       let tot_price = 0;

//       for (const product of products) {
//         tot_price += product.price * product.quantity;
//       }

//       //   console.log(tot_price)

//       const order = new Order({
//         customer: customerId,
//         vendor: vendorKey,
//         bill: tot_price,
//         paid: true,
//       });

//       await order.save();

//       for (const product of products) {
//         // console.log (product);

//         const productInOrder = new ProductsinOrder({
//           order: order._id,
//           product: product._id,
//           quantity: product.quantity,
//         });

//         // console.log(productInOrder)

//         await productInOrder.save();
//       }
//     }

//     res.status(200).json({ message: "Orders placed successfully." });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to check test." });
//   }
// });

// // Get Total Price of Cart
// app.post("/getcarttotalprice", async (req, res) => {
//   try {
//     const { customerID } = req.body;

//     const cart = await Cart.findOne({ customerId: customerID });

//     if (!cart) {
//       return res.status(404).json({ error: "Cart not found." });
//     }
//     res.json({ tot_price: cart.tot_price });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to get cart total price." });
//   }
// });

// // View Profile Information
// app.post("/getuserbyid", async (req, res) => {
//   try {
//     const { UserID } = req.body;
//     const user = await User.findById(UserID);
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // SearchBar API
// app.post("/searchbar", async (req, res) => {
//   try {
//     const { searchString } = req.body;

//     const regex = new RegExp(".*" + searchString + ".*", "i");
//     const products = await Product.find({ name: regex });

//     if (products.length === 0) {
//       res.status(404).json({ error: "No products found." });
//     } else {
//       res.status(200).json(products);
//     }
//   } catch (error) {
//     res.status(500).json({ error: "Failed to search products." });
//   }
// });

// // Fetch undelivered orders
// app.get("/fetchundeliveredorders", async (req, res) => {
//   try {
//     const undeliveredOrders = await Order.find(
//       { _id: { $nin: await Delivery.distinct("order") } },
//       { _id: 1 }
//     );

//     const undeliveredOrderData = await Order.find({
//       _id: { $in: undeliveredOrders },
//     });

//     res.json(undeliveredOrderData);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch undelivered orders." });
//   }
// });

// // Create Delivery
// app.post("/createdelivery", async (req, res) => {
//   try {
//     const { orderID } = req.body;

//     const existingDelivery = await Delivery.findOne({ order: orderID });
//     if (existingDelivery) {
//       return res
//         .status(400)
//         .json({ message: "Order has already been dispatched." });
//     }

//     const futureDate = new Date();
//     futureDate.setDate(futureDate.getDate() + Math.floor(Math.random() * 7));

//     const delivery = new Delivery({
//       status: true,
//       date: futureDate,
//       order: orderID,
//     });

//     await delivery.save();

//     res.status(200).json({ message: "Delivery created successfully." });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to create delivery." });
//   }
// });

// // Fetch all Deliveries
// app.get("/fetchdeliveries", async (req, res) => {
//   try {
//     const deliveries = await Delivery.find();

//     if (deliveries.length === 0) {
//       return res.json({ error: "No deliveries dispatched." });
//     }

//     res.json(deliveries);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch deliveries." });
//   }
// });

// // Fetch all managers.
// app.get("/fetchmanagers", async (req, res) => {
//   try {
//     const managers = await User.find(
//       { user_type: "Manager" },
//       { _id: 1, username: 1, email: 1 }
//     );

//     res.json(managers);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch managers." });
//   }
// });


// // Update Profile Information
// app.put ('/updateuser', async (req, res) => {
//   try {
//     const {
//       userID,
//       password,
//       first_name,
//       last_name,
//       address,
//       gender,
//       DOB,
//     } = req.body;

//     const user = await User.findById (userID);
//     user._id = userID;
//     user.username = user.username;
//     user.email = user.email;

//     const hashedPassword = await bcrypt.hash (password, 5);
//     user.password = hashedPassword;

//     user.user_type = user.user_type;
//     user.first_name = first_name;
//     user.last_name = last_name;
//     user.address = address;
//     user.gender = gender;
//     user.DOB = DOB;

//     await user.save ();

//     res.status (200).json ({message: 'User updated successfully.'});
//   } catch (error) {
//     res.status (500).json ({message: 'Failed to update user.'});
//   }
// });