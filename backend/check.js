const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const FoodListing = require('./models/FoodListing');
    const foods = await FoodListing.find({});
    for(const f of foods) {
      console.log('FoodId:', f._id, 'restaurantId:', f.restaurantId);
    }
    process.exit();
  });
