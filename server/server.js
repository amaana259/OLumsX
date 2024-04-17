// const express = require('express')
// const mongoose = require('mongoose')
// const cors = require('cors')
// const RegisterModel = require('./models/Register')

import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors';

const app = express()
app.use(cors(
    {
        origin: ["https://olumsx-backend-deploy-new.vercel.app"],
        methods: ["POST", "GET"],
        credentials: true
    }
));
app.use(express.json())

mongoose.connect('mongodb+srv://Shayan:1234@olumsx-test.bddt8lm.mongodb.net/?retryWrites=true&w=majority&appName=OLumsX-Test');


app.get("/", (req, res) => {
  try{
    res.json("Hello");
    
  }catch(err)
  {
    res.status(500).json({ error: "Failed to create order." });
  }
})
app.post('/register', (req, res) => {
    const {name, email, password} = req.body;
    RegisterModel.findOne({email: email})
    .then(user => {
        if(user) {
            res.json("Already have an account")
        } else {
            RegisterModel.create({name: name, email: email, password: password})
            .then(result => res.json(result))
            .catch(err => res.json(err))
        }
    }).catch(err => res.json(err))
})

app.listen(3001, () => {
    console.log("Server is Running")
});