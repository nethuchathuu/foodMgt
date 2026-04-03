const mockReq = { user: { _id: '123' } };
const mockRes = { status: () => ({ json: console.log }) };
const f = require('./controllers/restaurentsControllers/foodListingController');
f.getFoods(mockReq, mockRes).catch(console.error);
