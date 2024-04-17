import { User } from "../models/user.js";
import Order from "../models/order.js";
import ProductsinOrder from "../models/productsInOrder.js";
import Product from "../models/product.js";
import Cart from "../models/cart.js";
import { TryCatch } from "../middlewares/error.js";
import bcrypt from 'bcrypt';

// Create a new user when signing up
export const newUser = TryCatch(async (req, res, next) => {
    const {
        username,
        email,
        password,
        user_type,
        first_name,
        last_name,
        address,
        gender,
        DOB,
      } = req.body;
    
      try {
        if (
          !username ||
          !email ||
          !password ||
          !user_type ||
          !first_name ||
          !last_name ||
          !address ||
          !gender ||
          !DOB
        ) {
          return res.status (400).json ({error: 'All fields required.'});
        }

          // Regex to check email format
        const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailReg.test (email)) {
          return res.status (400).json ({error: 'Invalid Email address entered.'});
        }

          // Check if user exists
        const existingUser = await User.findOne ({email});
        if (existingUser) {
          return res.status (400).json ({error: 'Email already in use'});
        }
    
        const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordReg.test (password)) {
          return res.status (400).json ({
            error: 'Password must be at least 8 characters long, have at least one uppercase letter, one lowercase letter, one digit and one special character.',
          });
        }
    
        const hashedPassword = await bcrypt.hash (password, 5);
        const newUser = new User ({
          username,
          email,
          password: hashedPassword,
          user_type,
          first_name,
          last_name,
          address,
          gender,
          DOB,
        });
    
        await newUser.save ();
    
        const cart = new Cart ({
            customerId: newUser._id,
            tot_price: 0,
          });
      
          await cart.save ();
    
        res.status (201).json ({message: 'Signup successfull.'});
      } catch (err) {
        res.status (500).json ({error: 'Error during signup'});
      }
});

// API for Logging in users. Bcrypt is used for hashing and comparing the entered password as the password is saved after hashing in the database
export const loginUser = TryCatch(async (req, res, next) => {
    const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email entered." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: "Invalid password enter" });
    }

    res.status(200).json({
      message: "Logged in successfully",
      user_id: user._id,
      user_type: user.user_type,
    });
  } catch (err) {
    // console.log(err);
    res.status(500).json({ error: "Error during login" });
  }
});

// API to update user details
export const updateUser = TryCatch(async (req, res, next) => {
    try {
    const {
      userID,
      password,
      first_name,
      last_name,
      address,
      gender,
      DOB,
    } = req.body;

    const user = await User.findById (userID);
    user._id = userID;
    user.username = user.username;
    user.email = user.email;

    const hashedPassword = await bcrypt.hash (password, 5);
    user.password = hashedPassword;

    user.user_type = user.user_type;
    user.first_name = first_name;
    user.last_name = last_name;
    user.address = address;
    user.gender = gender;
    user.DOB = DOB;

    await user.save ();

    res.status (200).json ({message: 'User updated successfully.'});
  } catch (error) {
    res.status (500).json ({message: 'Failed to update user.'});
  }
});

// Delete User
export const deleteUser = TryCatch(async (req, res, next) => {
    try {
      const { userID } = req.body;
  
      const user = await User.findById(userID);
  
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
  
      if (user.user_type === "Customer") {
  
        const orders = await Order.find({ customer: userID });
  
        await ProductsinOrder.deleteMany({
          order: { $in: orders.map((order) => order._id) },
        });
  
        await Order.deleteMany({ customer: userID });
      } else if (user.user_type === "Vendor") {
  
        const products = await Product.find({ vendor: userID });
  
        const orders = await ProductsinOrder.find({
          product: { $in: products.map((product) => product._id) },
        });
  
        await ProductsinOrder.deleteMany({
          product: { $in: products.map((product) => product._id) },
        });
  
        await Order.deleteMany({
          _id: { $in: orders.map((order) => order.order) },
        });
  
        await Product.deleteMany({ vendor: userID });
      }
  
      await User.findByIdAndDelete(userID);
  
      res.status(200).json({ message: "User deleted successfully." });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete user." });
    }
});

export const getUserDetails = TryCatch(async (req, res, next) => {
    try {
        const { UserID } = req.body;
        console.log(UserID)
        const user = await User.findById(UserID);
        console.log("this is user", user)
        res.json(user);
      } catch (error) {
        res.status(500).json({ error: "Internal server error" });
      }
});
