const express=require('express')
const router=express.Router()

const userm=require('../models/signupModel')
const ideam=require('../models/ideaModel')
const jwt=require('jsonwebtoken')


//create ideas
router.post('/ideas', async (req, res) => {
  const { idea } = req.body;  

  try {
    
    const token = req.headers.authorization.split(' ')[1]; 
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userEmail = decoded.email;

    
    const user = await userm.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    const newIdea = await ideam.create({
      idea,
      user: userEmail,  
    });

    res.status(201).json({
      message: "Idea created successfully",
      idea: newIdea,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating idea" });
  }
});


// get the listed ideas
router.get('/ideas', async (req, res) => {
  try {
   
    const allIdeas = await ideam.find().sort({ date: -1 });  

    res.status(200).json({
      ideas: allIdeas,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching ideas" });
  }
});

// delete the selected idea
router.delete('/ideas/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const token = req.headers.authorization.split(' ')[1];  
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "srijan");
    const userEmail = decoded.email;
    
    const idea = await ideam.findById(id);

    if (!idea) {
      return res.status(404).json({ message: "Idea not found" });
    }

    if (idea.user !== userEmail) {
      return res.status(403).json({ message: "You can only delete your own ideas" });
    }
    await idea.remove();
    
    res.status(200).json({ message: "Idea deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting idea" });
  }
});

module.exports=router

