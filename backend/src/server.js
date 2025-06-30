const authRoutes = require('./routes/authRoutes');
const connectDB = require('./config/db');
const cors = require('cors');
const express = require('express');
const newsRoutes = require('./routes/newsRoutes');

const app = express();

app.use(express.json());

app.use(cors());

/*--------------------------------------------AUTH-----------------------------------------------*/
app.use('/auth', authRoutes);

/*-------------------------------------------INSERT----------------------------------------------*/
app.use('/news', newsRoutes);

app.use((err, req, res, next) => {
    console.error('ERRO GLOBAL:', err.stack);
  
    const errorMessage = process.env.NODE_ENV === 'production' 
      ? 'Ocorreu um erro interno no servidor.' 
      : err.message;
      
    res.status(err.status || 500).json({
      message: 'Algo deu errado!',
      error: errorMessage,
    });
  });

connectDB();

module.exports = app;