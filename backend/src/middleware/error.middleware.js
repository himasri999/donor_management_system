const logger = require('../utils/logger');

const errorMiddleware = (error, req, res, next) => {
  logger.error(error.message, { stack: error.stack, url: req.url, method: req.method });
  
  const status = error.status || 500;
  const message = error.message || 'Internal Server Error';
  
  res.status(status).json({ message });
};

module.exports = errorMiddleware;