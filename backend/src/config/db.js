const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

dotenv.config();

const createDefaultAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({
      $or: [{ username: 'admin' }, { email: 'admin@gmail.com' }],
    });

    if (!existingAdmin) {
      console.log('Nenhum usuário administrador padrão encontrado. Criando um...');
      
      const hashedPassword = await bcrypt.hash('admin', 10);

      const adminUser = new User({
        username: 'admin',
        email: 'admin@gmail.com',
        password: hashedPassword,
        isAdmin: true,
      });

      await adminUser.save();
      console.log('Usuário administrador padrão criado com sucesso!');
      console.log('Username: admin | Senha: admin');
    } else {
      console.log('Usuário administrador padrão já existe no banco de dados.');
    }
  } catch (error) {
    console.error('Erro ao tentar criar o usuário administrador padrão:', error);
  }
};

const connectDB = async () => {
  try{
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to the database');

    await createDefaultAdmin();
  } catch (error) {
    console.log('Error connecting to the database', error);
    process.exit(1);
  }

  mongoose.connection.on('error', err => {
    logError(err);
  });
};

module.exports = connectDB;