const newsServices = require('../services/newsServices');

exports.insert = async (req, res) => {
  try {
    console.log('req.body:', req.body);
    const newsData = req.body;

    const newNews = await newsServices.insertNews(newsData);

    return res.status(201).json({
      message: 'Notícia inserida com sucesso',
      news: newNews
    });
  }
  catch (error) {
    console.error('Erro ao inserir notícia:', error);
    return res.status(500).json({ message: 'Erro ao inserir notícia', error: error.message });
  }
}