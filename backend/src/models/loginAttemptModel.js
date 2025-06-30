const mongoose = require('mongoose');

const loginAttemptSchema = new mongoose.Schema({
  ipAddress: { 
    type: String, 
    required: true 
  },
  attempts: { 
    type: Number, 
    default: 0 
  },
  lastAttempt: { 
    type: Date, 
    default: Date.now 
  },
  blockedUntil: { 
    type: Date, 
    default: null 
  }
});

const LoginAttempt = mongoose.model('LoginAttempt', loginAttemptSchema);

module.exports = LoginAttempt;