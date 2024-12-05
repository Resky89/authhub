  /**
 * @fileoverview Authentication routes configuration
 * @description Handles all user-related routes including registration, get, update, and delete
 * @requires express
 */
import { Router } from "express";
import UserController from "../controllers/userController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/user-profile", verifyToken, UserController.getProfile);
router.put("/user-profile", verifyToken, UserController.updateProfile);
router.delete("/user-profile", verifyToken, UserController.deleteProfile);

export default router;
