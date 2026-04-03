const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const Restaurant = require('./models/Restaurant');
    const FoodListing = require('./models/FoodListing');
    const reqs = await Restaurant.find({});
    console.log('Total Restaurants:', reqs.length);
    for(const r of reqs) {
      console.log('Rest: ', r._id, ' userId: ', r.userId);
    }
    const foods = await FoodListing.find({});
    console.log('Total Foods:', foods.length);
    for(const f of foods) {
      console.log('Food: ', f._id, ' restaurantId: ', f.restaurantId);
    }
    process.exit();
  });
