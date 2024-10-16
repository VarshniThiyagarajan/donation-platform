require('dotenv').config(); // Load environment variables
console.log('MongoDB URI:', process.env.MONGO_URI); // Check if URI is loaded correctly

const express = require('express');
const connectDB = require('./config/db'); // Import the connectDB function
const authRoutes = require('./routes/authRoutes'); // Import authentication routes
const donationRoutes = require('./routes/donationRoutes'); // Import donation routes

const app = express(); // Initialize Express
const PORT = process.env.PORT || 5000; // Define the server port

// Connect to MongoDB
connectDB();

// Middleware to parse JSON requests
app.use(express.json());

// Test route to verify the backend is runningconst dashboardRoutes = require('./routes/dashboardRoutes');
app.use('/api/dashboard', dashboardRoutes);
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Use authentication and donation routes
app.use('/api/auth', authRoutes);
app.use('/api/donations', donationRoutes);


// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

