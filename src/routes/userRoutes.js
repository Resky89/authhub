  /**
 * @fileoverview Authentication routes configuration
 * @description Handles all user-related routes including get, put, and delete
 * @requires express
 */
import { Router } from "express";
import UserController from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/user-profile", authMiddleware.verifyToken, UserController.getProfile);
router.put("/user-profile", authMiddleware.verifyToken, UserController.updateProfile);
router.delete("/user-profile", authMiddleware.verifyToken, UserController.deleteProfile);

export default router;
