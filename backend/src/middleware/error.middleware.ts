import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

const errorMiddleware = (error: any, req: Request, res: Response, next: NextFunction) => {
  logger.error(error.message, { stack: error.stack, url: req.url, method: req.method });
  
  const status = error.status || 500;
  const message = error.message || 'Internal Server Error';
  
  res.status(status).json({ message });
};

export default errorMiddleware;