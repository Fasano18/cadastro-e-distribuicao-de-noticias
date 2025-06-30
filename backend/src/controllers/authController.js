const authService = require('../services/authServices');

exports.register = async (req, res, next) => {
    try {
        await authService.registerUser(req.body);
        res.status(201).json({ message: 'Usuário registrado com sucesso!' });
    } catch (error) {
        // Lidar com possível erro de nome de usuário duplicado do MongoDB
        if (error.code === 11000) {
            error.message = 'Nome de usuário já existe.';
            error.status = 409;
        }
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const result = await authService.loginUser(req.body);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

exports.logout = async (req, res, next) => {
    try {
        // Pega o token diretamente do objeto 'req', onde o middleware o colocou.
        // Não é mais necessário ler o header aqui.
        const token = req.token; 
        
        const result = await authService.logoutUser(token);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};