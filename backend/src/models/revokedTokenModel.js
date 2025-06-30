const mongoose = require('mongoose');

const revokedTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  revokedAt: {
    type: Date,
    default: Date.now,
    //expires: '1h'
  }
});

const RevokedToken = mongoose.model('RevokedToken', revokedTokenSchema);

module.exports = RevokedToken;