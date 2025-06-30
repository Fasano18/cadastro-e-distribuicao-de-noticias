const moongose = require('mongoose');

const newsSchema = new moongose.Schema({
  tema: {
    type: String,
    required: true,
    index: true
  },
  titulo: {
    type: String,
    required: true,
    index: true
  },
  subtitulo: {
    type: String,
    required: true
  },
  descricao: {
    type: String,
    required: true
  },
  autor: {
    type: String,
    required: true
  },
  local: {
    cidade: { type: String, required: false },
    estado: { type: String, required: false },
    pais: { type: String, required: true }
  },
  dataPublicacao: {
    type: Date,
    required: true,
    default: Date.now,
    index: true
  },
  categoria: {
    type: String,
    required: true,
  },
  imagem: {
    type: String,
    required: false,
  },
},
{
  timestamps: true
});

module.exports = moongose.model('News', newsSchema);
