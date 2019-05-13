import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';

const TOKENTIME = 60 * 60 * 24 * 90;
const SECRET = "W3 CHAT 4 FUN";

let authenticate = expressJwt({ secret: SECRET });

const generateAccessToken = (req, res, next) => {
  req.token = req.token || {};
  req.token = jwt.sign({
    id: req.user.id,
  }, SECRET, {
      expiresIn: TOKENTIME // 90 days
    });
  next();
}

const respond = (req, res) => {
  res.status(200).json({
    user: req.user.username,
    token: req.token
  });
}

let unAuthHandle = function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ message: 'invalid token...' });
  }
  else if (err) {
    res.status(401).json({ message: `Email or password invalid, please check your credentials` });
  }
};

let assume404 = (req, res, next) => {
  res.redirect('/');//redirect if the request cannot be hadled
};

export { authenticate, generateAccessToken, respond, unAuthHandle, assume404 }
