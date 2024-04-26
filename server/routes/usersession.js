import express from "express";
import { createUserSession, deleteUserSession, fetchLatestUserSession } from "../controllers/usersession.js";
const app = express.Router();

// Route to create a new session.
app.post('/createsession', createUserSession);

// Route to delete an existing session.
// app.post('/deletesession', deleteUserSession);
app.get('/deletesession', deleteUserSession)

// Route to fetch latest session details.
app.get('/fetchsession', fetchLatestUserSession);

export default app;