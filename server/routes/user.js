import express from "express";
import { newUser, loginUser , updateUser, deleteUser, getUserDetails} from "../controllers/user.js";
const app = express.Router();

// Route to Signup page
app.post("/signup", newUser);

// Route to login page
app.post("/login", loginUser);

// Route to update user API
app.put('/updateuser', updateUser);

// API to delete user by ID
app.delete('/deleteuser', deleteUser);

// Finding user details by ID
app.post('/getuserbyid', getUserDetails);

export default app;
