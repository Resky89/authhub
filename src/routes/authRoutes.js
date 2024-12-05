  /**
 * @fileoverview Authentication routes configuration
 * @description Handles all authentication-related routes including registration, login, token refresh, and logout
 * @requires express
 */

import {Router} from "express"
import { AuthController } from "../controllers/authController.js";
import {verifyToken,validateLogin,validateRegister} from "../middlewares/authMiddleware.js";
import {loginLimiter,registerLimiter,refreshTokenLimiter} from "../middlewares/rateLimiter.js"

const router = Router();

router.post("/auth/register",validateRegister,registerLimiter,AuthController.register);
router.post("/auth/login", validateLogin, loginLimiter, AuthController.login);
router.post("/auth/refresh-token",refreshTokenLimiter, AuthController.refreshToken);
router.post("/auth/logout", verifyToken, AuthController.logout);

export default router;
