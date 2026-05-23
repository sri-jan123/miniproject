require("dotenv").config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');


// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("MongoDB connected");
})
.catch((err) => {
    console.log(err);
});


// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));

// Route imports
const authRoute = require('./routes/authRoutes');
const projectRoute = require('./routes/projectRoutes');
const ideaRoute = require('./routes/ideaRoutes');

// Route middlewares
app.use('/auth', authRoute);
app.use('/api', projectRoute);
app.use('/api', ideaRoute);

// Default route
app.get('/', (req, res) => {
    res.send("API running");
});


// Server
app.listen(process.env.PORT, () => {
   console.log(`Server running at PORT ${process.env.PORT}`);
});
