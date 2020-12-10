const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const routes = require('./routes');

const app = express();
app.use(express.json({extended: false}));

app.use('/api/auth', routes);


mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useFindAndModify: true,
  useCreateIndex: true,
}).then(result => app.listen(process.env.PORT, () => console.log(`server running ${process.env.PORT}.....`))
).catch(err => console.error(err));