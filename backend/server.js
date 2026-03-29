const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const { setupDefaultAdmin } = require('./controllers/adminController');

const path = require('path');

// Load env vars
dotenv.config();

// Connect to database
connectDB().then(() => {
  setupDefaultAdmin();
});

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// Serve uploads folders statically so image URLs can be fetched by the frontend
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
