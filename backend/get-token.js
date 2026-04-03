const jwt = require('jsonwebtoken');
require('dotenv').config();
const token = jwt.sign({ id: '69d02f689e865862386bef16' }, process.env.JWT_SECRET, { expiresIn: '1h' });
const http = require('http');
const req = http.get('http://localhost:5000/api/food-listings', { headers: { Authorization: 'Bearer ' + token } }, (res) => {
  let rawData = '';
  res.on('data', chunk => rawData += chunk);
  res.on('end', () => console.log('Status:', res.statusCode, rawData));
});
