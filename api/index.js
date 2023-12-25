const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
const Post = require('./models/Post');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs');

// Salt for password hashing
const salt = bcryptjs.genSaltSync(10);
const secretKey = "ThisIsASecretKey$3908";


const app = express();

app.use(cors({credentials:true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

mongoose.connect('mongodb+srv://sailendrachettri:tFUZW2Q7kDSzmQHF@cluster0.73bkaub.mongodb.net/tech-blog');

// REGINSTRATION API
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

// LOGIN API
app.post('/login', async(req, res) =>{
    const {username, password} = req.body;
    
    const userDoc = await User.findOne({username});
    console.log(userDoc);
    const passwordOk = bcryptjs.compareSync(password, userDoc.password);

    if(passwordOk){
        // user loggedIn now
        jwt.sign({username, id:userDoc._id}, secretKey, {}, (err, token) =>{
            if(err) throw err;
            res.cookie('token', token).json({
                id:userDoc._id,
                username
            });
        });
    } else{
        // Password incorrect so not logged in
        res.status(400).json('Worng Credentials');
    }
});

// USER PROFILE INFORMATION
app.get('/profile', (req, res) =>{
    const {token} = req.cookies;
    jwt.verify(token, secretKey, {}, (err, info)=>{
        if(err) throw err;
        res.json(info);
    });
});

// LOGOUT METHOD
app.post('/logout', (req, res)=>{
    res.cookie('token', '').json('ok');
});

// CREATE NEW POST
app.post('/post', uploadMiddleware.single('file'), async(req, res) =>{
    const {originalname, path} = req.file;
    const parts = originalname.split('.');
    // ext - extension eg: .jpeg, .png, .jpg
    const ext = parts[parts.length - 1]; 
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);

    // grab the author information
    const {token} = req.cookies;
    jwt.verify(token, secretKey, {}, async(err, info)=>{
        if(err) throw err;

        // fetching from frontend
        const {title, summary, content} = req.body;
        const postDoc = await Post.create({
            title,
            summary,
            content,
            cover:newPath,
            author:info.id
        });

        res.json(postDoc)
    });
})

// FETCH THE POSTS
app.get('/post', async(req, res) => {
    res.json(
        await Post.find()
            .populate('author', ['username'])
            .sort({createdAt: -1})
            .limit(50)
    );
});

// DISPLAY THE INDIVIDUAL POST USING ID
app.get('/post/:id', async(req, res) =>{
    const {id} = req.params;
    const postDoc = await Post.findById(id).populate('author', 'username');
    res.json(postDoc);
});

app.listen(4000);