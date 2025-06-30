const LoginAttempt = require('../models/loginAttemptModel');
const moment = require('moment');

const MAX_ATTEMPTS = 10;
const BLOCK_TIME = 15;  // minutes

const checkLoginAttempts = async (req, res, next) => {
  const ip = req.ip;  


  const attempt = await LoginAttempt.findOne({ ipAddress: ip });

  if (attempt) {
    const blockedUntil = attempt.blockedUntil;
    if (blockedUntil && moment().isBefore(moment(blockedUntil))) {
      return res.status(403).json({ message: `Your IP is temporarily blocked. Please try again after ${BLOCK_TIME} minutes.` });
    }
  }

  next();
};

const incrementLoginAttempts = async (req, res, next) => {
  const ip = req.ip;
  const attempt = await LoginAttempt.findOne({ ipAddress: ip });

  if (attempt) {
    const isBlocked = attempt.blockedUntil && moment().isBefore(moment(attempt.blockedUntil));
    
    if (isBlocked) {
      return res.status(403).json({ message: 'Your IP is temporarily blocked.' });
    }

    if (moment().diff(moment(attempt.lastAttempt), 'minutes') > BLOCK_TIME) {
      attempt.attempts = 0; 
    }

    attempt.attempts += 1;
    attempt.lastAttempt = Date.now();

    if (attempt.attempts >= MAX_ATTEMPTS) {
      attempt.blockedUntil = moment().add(BLOCK_TIME, 'minutes'); 
    }

    await attempt.save();
  } else {
    const newAttempt = new LoginAttempt({ ipAddress: ip, attempts: 1 });
    await newAttempt.save();
  }

  next();
};

module.exports = { checkLoginAttempts, incrementLoginAttempts };