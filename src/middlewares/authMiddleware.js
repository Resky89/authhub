import { JWTUtils } from '../utils/jwtUtils.js';
import { validate, ValidationSchemas } from '../utils/validation.js';

export const authMiddleware = {
  verifyToken: async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ 
          status: false,
          message: 'Akses ditolak. Token tidak ditemukan' 
        });
      }

      const token = authHeader.split(' ')[1];
      const decoded = JWTUtils.verifyAccessToken(token);
      
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ 
        status: false,
        message: 'Akses ditolak. Token tidak valid' 
      });
    }
  },

  validateLogin: (req, res, next) => {
    try {
      const validatedData = validate(ValidationSchemas.login, req.body);
      req.validatedData = validatedData;
      next();
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({
          status: false,
          message: 'Validation Error',
          errors: error.errors
        });
      }
      return res.status(500).json({
        status: false,
        message: 'Internal Server Error'
      });
    }
  },

  validateRegister: (req, res, next) => {
    try {
      const validatedData = validate(ValidationSchemas.register, req.body);
      req.validatedData = validatedData;
      next();
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({
          status: false,
          message: 'Validation Error',
          errors: error.errors
        });
      }
      return res.status(500).json({
        status: false,
        message: 'Internal Server Error'
      });
    }
  }
};

export const verifyToken = authMiddleware.verifyToken;
export const validateLogin = authMiddleware.validateLogin;
export const validateRegister = authMiddleware.validateRegister;

export default authMiddleware;
