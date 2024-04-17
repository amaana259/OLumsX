import { User } from "../models/user.js";
import { TryCatch } from "../middlewares/error.js";
import bcrypt from 'bcrypt';
import Product from '../models/product.js';
import Wishlist from '../models/wishlist.js'
import Cart from '../models/cart.js'
import Reviews from "../models/reviews.js";

// Method to fetch all current products.
export const fetchProducts = TryCatch(async (req, res, next) => {
  try {
      console.log("recevied here")
      const { client_id } = req.body;                         // now need to send clientID.
      const products = await Product.find();
      const wishlistEntries = await Wishlist.find({ client_id });

      const wishlistProductIds = new Set(wishlistEntries.map(entry => entry.product_id.toString()));

      const productsWithWishlist = products.map(product => ({
          ...product.toObject(),
          wishlisted: wishlistProductIds.has(product._id.toString())
      }));

      res.status(200).json(productsWithWishlist);
  } catch (error) {
      res.status(500).json({ error: "Failed to fetch products." });
  }
});

// Method to add a product to the database.
export const addProduct = TryCatch(async(req,res,next)=>{
    try {
      const { name, category, price, vendor, description } = req.body;
    
      const product = new Product({                    // Creates a new product with input data.
        name,
        category,
        price,
        vendor,
        description,
      });
      console.log("Product: ", product)
       await product.save();
    
      res.status(201).json({ message: "Product added successfully." });
    } catch (error) {
      res.status(500).json({ error: "Failed to add product." });
    }
})

// Method to update a product currently in the database.
export const updateProduct =  TryCatch(async (req, res,next) => {
  try {
    const { _id, name, color, price, vendor, description } = req.body;

    const product = await Product.findById(_id);                          // Checks if the product exists in the database.

    if (!product) {                                                            
      return res.status(404).json({ error: "Product does not exist." });
    }
    
    product.name = name;
    product.color = color;
    product.price = price;
    product.vendor = vendor;
    product.description = description;

    await product.save();                                                // Saves updated details of product into the database.

    res.status(200).json({ message: "Product updated successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to update product details." });
  }
});

// Method to delete a product that is in the database.
export const deleteProduct =  TryCatch(async (req, res,next) => {

  try {
    const { productId } = req.body;

    const product = await Product.findByIdAndDelete(productId);         // Checks if the product exists in the database.

    if (!product) {
      return res.status(404).json({ error: "Product does not exist." });
    }

    res.status(200).json({ message: "Product deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product." });
  }
})

export const recentProducts = TryCatch(async (req, res,next) => {
  try {
    console.log("hello")
    const userId = req.query.userId;
    console.log(userId)
    const limit = parseInt(req.query.limit) ;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Assuming you have a 'createdAt' field in your Product model to track creation time
    const recentProducts = await Product.find({ vendor: userId }).sort({ _id: -1 }).limit(limit);
    console.log(recentProducts)

    res.json(recentProducts);
  } catch (error) {
    console.error('Error fetching recent products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Searchbar API
export const productSearch = TryCatch(async (req, res, next) => {
  try {
    const searchQuery = req.query.query; // Accessing the search query from the URL

    const regex = new RegExp(".*" + searchQuery + ".*", "i");

    const products = await Product.find({
      $or: [
        { name: { $regex: regex } },
        { description: { $regex: regex } }
      ]
    });

    if (products.length === 0) {
      res.status(404).json({ error: "No products found." });
    } else {
      res.status(200).json(products);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to search products." });
  }
});

// Method to fetch a product using ID
export const fetchProductById = TryCatch(async (req, res, next) => {
  try {
    const productId = req.params.id;
    console.log(productId)
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product." });
  }
});

