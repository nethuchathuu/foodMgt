const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const inventoryRoutes = require('./routes/restaurentsRoutes/inventoryRoutes');
const dashboardRoutes = require('./routes/restaurentsRoutes/dashboardRoutes');
const foodListingRoutes = require('./routes/restaurentsRoutes/foodListingRoutes');
const wastageRoutes = require('./routes/restaurentsRoutes/wastageRoutes');
const financialLossRoutes = require('./routes/restaurentsRoutes/financialLossRoutes');
const organizationRoutes = require('./routes/organizationRoutes');
const browseFoodRoutes = require('./routes/receiverRoutes/browseFoodRoutes');
const { setupDefaultAdmin } = require('./controllers/adminController');

const path = require('path');

// Load env vars
dotenv.config();

// Connect to database
connectDB().then(() => {
  setupDefaultAdmin();
  // Start cron jobs after DB connect
  try {
    require('./cron/expiryJob');
  } catch (err) {
    console.error('Failed to start cron jobs', err.message);
  }
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
app.use('/api/inventory', inventoryRoutes);
app.use('/api/restaurants', dashboardRoutes);
app.use('/api/food-listings', foodListingRoutes);
app.use('/api/wastage', wastageRoutes);
app.use('/api/financial-loss', financialLossRoutes);
app.use('/api/organization', organizationRoutes);
app.use('/api/browse-food', browseFoodRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
