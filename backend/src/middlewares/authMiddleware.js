const jwt = require("jsonwebtoken");
const RevokedToken = require("../models/revokedTokenModel");

const optionalAuthMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (token) {
      const isRevoked = await RevokedToken.findOne({ token });
      if (!isRevoked) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
      }
    }
  } catch (error) {}
  next();
};

const authMiddleware = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Acesso negado. Nenhum token fornecido." });
  }

  const token = authHeader.substring(7);

  const isRevoked = await RevokedToken.findOne({ token: token });
  if (isRevoked) {
    return res.status(401).json({ message: "Token inválido ou expirado." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    req.token = token;

    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido ou erro na verificação." });
  }
};

const adminMiddleware = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res
      .status(403)
      .json({ msg: "Acesso negado. Requer privilégios de administrador" });
  }
};

module.exports = {
  optionalAuthMiddleware,
  authMiddleware,
  adminMiddleware,
};
