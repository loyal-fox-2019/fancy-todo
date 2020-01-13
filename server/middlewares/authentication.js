const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  if (req.headers.hasOwnProperty('token')) {
    try {
      const payload = jwt.verify(req.headers.token, process.env.JWT_SECRET_KEY);
      req.userLogin = payload;
      next();
    } catch (error) {
      res.status(400).json({
        message: `Invalid token!`
      });
    }
  }
};
