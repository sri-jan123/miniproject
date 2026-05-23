const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const multer = require('multer');

const userm = require('../models/signupModel');

// multer setup
const upload = multer({
    dest: 'uploads/'
});


router.post('/', function(req, res) {
    let { username, email, password } = req.body;
  
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return res.status(500).json({ message: "Error generating salt" });
  
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) return res.status(500).json({ message: "Error hashing password" });
  
        try {
          const user = await userm.create({
            username,
            email,
            password: hash,
          });
  
          let token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" }); 
          console.log(user);
          return res.status(201).json({ message: "User created successfully", user, token });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: "Error creating user" });
        }
      });
    });
  });

router.post('/login', async function (req, res) {
    const { email, password } = req.body;

    try {
        
        const user = await userm.findOne({ email });

        if (!user) {
            console.log('User not found');
            return res.status(404).json({ message: "User not found" });
        }
       
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Invalid credentials');
            return res.status(401).json({ message: "Invalid credentials" });
        }
       
        let token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({
            message: "Login successful",
            user: {
                username: user.username,
                email: user.email,
                profilepic: user.profilepic 
            },
            token
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


router.post('/logout', (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
});

router.post('/profilepic', upload.single('avatar'), async (req, res) => {
  try {
    const imageUrl = `http://localhost:${process.env.PORT}/uploads/${req.file.filename}`;

    const token = req.headers.authorization.split(' ')[1]; 
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const userEmail = decoded.email;  
    const user = await userm.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.profilepic = imageUrl;
    await user.save();

    res.status(200).json({ message: 'File uploaded successfully', profilePicUrl: imageUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'File upload failed' });
  }
});


router.get('/profile', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];  
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userEmail = decoded.email;  
    
    const user = await userm.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      username: user.username,
      email: user.email,
      profilepic: user.profilepic,  
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch profile data' });
  }
});

module.exports=router;
