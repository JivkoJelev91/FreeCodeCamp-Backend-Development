const mongoose = require('mongoose');
require('dotenv').config({ path: './sample.env' });

const mongoUri = process.env.MONGODB_DB;

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

module.exports = mongoose;
