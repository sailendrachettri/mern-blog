const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
const bcryptjs = require('bcryptjs');
const cors = require('cors');

// Salt for password hashing
const salt = bcryptjs.genSaltSync(10);


const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://sailendrachettri:tFUZW2Q7kDSzmQHF@cluster0.73bkaub.mongodb.net/');

app.post('/register', async(req, res)=>{
    const {username, password} = req.body;

    try{
        const userDoc = await User.create({
            username,
            password:bcryptjs.hashSync(password, salt)
        });
        res.json(userDoc);

    } catch(e){
        res.status(400).json(e);
        console.log("Here error index");
    }
});

app.listen(4000);