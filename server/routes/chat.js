import express from "express";
import { fetchMessages, createMessage, customerChats, vendorChats } from "../controllers/chat.js";
const app = express.Router();

// Route to create a message / store entry into table.
app.post('/createmessage', createMessage);

// Route to fetch all messages for displaying.
app.post('/fetchmessages', fetchMessages);

// Route to fetch all current chats for a customer.
app.post('/customerchats', customerChats);

// Route to fetch all current chats for a vendor.
app.post('/vendorchats', vendorChats);

export default app;
