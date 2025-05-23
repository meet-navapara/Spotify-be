const express = require("express");
const cors = require('cors');
const userRoutes = require("./routes/user.route");
const trackRoutes = require('./routes/track.route');
const mongoose = require("mongoose");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api', trackRoutes);

const startServer = async () => {
  try {
    // MongoDB Atlas connection with proper options
    await mongoose.connect(process.env.URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      retryWrites: true,
      w: 'majority'
    });
    console.log("Database connected successfully");
    
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB Atlas", error);
    process.exit(1); // Exit with failure
  }
};

startServer();