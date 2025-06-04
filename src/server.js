const connectDB = require('./config/db');
const express = require('express');

const app = express();

app.use(express.json());

connectDB();

module.exports = app;