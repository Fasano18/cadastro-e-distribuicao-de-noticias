const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const RevokedToken = require("../models/revokedTokenModel");
const User = require("../models/userModel");

dotenv.config();

exports.registerUser = async (userData) => {
  const { username, email, password, isAdmin } = userData;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    isAdmin,
  });
  await newUser.save();
  return newUser;
};

exports.loginUser = async (credentials) => {
  const { username, email, password } = credentials;

  const identifier = username || email;

  if (!identifier || !password) {
    const error = new Error("Por favor, forneça seu usuário/email e senha.");
    error.status = 400;
    throw error;
  }

  const user = await User.findOne({
    $or: [{ username: identifier }, { email: identifier }],
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    const error = new Error("Credenciais inválidas.");
    error.status = 401;
    throw error;
  }

  const token = jwt.sign(
    {
      userId: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return { token };
};

exports.logoutUser = async (token) => {
  if (!token) {
    return { message: "Nenhum token fornecido." };
  }

  try {
    const newRevokedToken = new RevokedToken({ token });

    await newRevokedToken.save();

    return { message: "Logout realizado com sucesso." };
  } catch (error) {
    if (error.code === 11000) {
      return { message: "Este token já foi revogado anteriormente." };
    }
    throw error;
  }
};
