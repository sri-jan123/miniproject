const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const multer = require('multer');

const userm = require('../models/signupModel');
const project=require('../models/projectModel')

const upload = multer({
    dest: 'uploads/'
});

const uploadMultiple = multer({ dest: 'uploads/' }).array('images', 5); 

//create new project
router.post('/projects', uploadMultiple, async (req, res) => {
  try {
    
    console.log('Files uploaded:', req.files);

    const token = req.headers.authorization.split(' ')[1]; 
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userEmail = decoded.email; 

    const user = await userm.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log('Received captions:', req.body.captions);

    const images = req.files.map((file, index) => ({
      url: `http://localhost:${process.env.PORT}/uploads/${file.filename}`,
      caption: req.body.captions ? req.body.captions[index] : "", 
    }));

    console.log('Images with captions:', images);

    const newProject = await project.create({
      user: userEmail,
      images,
    });

    res.status(201).json({
      message: "Project created successfully",
      project: newProject,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating project" });
  }
});

// get all projects
router.get('/projects', async (req, res) => {
  try {
    const projects = await project.find().sort({ date: -1 });  
    res.status(200).json({ projects });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching projects" });
  }
});

module.exports=router;




