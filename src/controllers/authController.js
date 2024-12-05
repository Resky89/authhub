
import { AuthService } from "../services/authService.js";
import { validate, ValidationSchemas } from "../utils/validation.js";

export class AuthController {
  

  static async register(req, res) {
    try {
      const validateData = validate(ValidationSchemas.register, req.body);
      const newUser = await AuthService.register(validateData);
      
      res.status(201).json({
        status: true,
        message: "Account created successfully",
        newUser,
      });
    } catch (error) {
      res.status(400).json({
        status: false,
        error: error.errors || error.message,
      });
    }
  }

  static async login(req, res) {
    try {
      const validatedData = validate(ValidationSchemas.login, req.body);
      const { email, password } = validatedData;
      
      const { user, accessToken, refreshToken } = await AuthService.loginUser(email, password);
      
      res.json({
        status: true,
        message: 'Login successful',
        data: {
          accessToken,
          refreshToken,
          user: {
            id: user.id,
            name: user.name,
            email: user.email
          }
        }
      });
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({
          status: false,
          error: error.errors
        });
      }
      res.status(401).json({ 
        status: false,
        error: error.message 
      });
    }
  }

  static async refreshToken(req, res) {
    try {
      const { refreshToken } = req.body;
      const { accessToken } = await AuthService.refreshAccessToken(refreshToken);
      
      res.status(201).json({
        status: true,
        message: "refresh token successfully",
        "newAccessToken": accessToken,
      });
    } catch (error) {
      res.status(403).json({
        status: false,
        error: error.message,
      });
    }
  }

  static async logout(req, res) {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return res.status(400).json({
          success: false,
          message: "Refresh token is required",
        });
      }

      await AuthService.logout(refreshToken);
      res.status(200).json({
        status: true,
        message: "logged out successfully",
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        error: error.message,
      });
    }
  }
}
