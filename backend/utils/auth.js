const jwt = require('jsonwebtoken');

const createJWT = (res, email, userId, role) => {
  const payload = { email, userId, role };
  const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: '30d',
  });

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'development' ? true : false,
    sameSite: 'none',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
  return token;
};

module.exports = createJWT;
