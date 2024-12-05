/**
 * @fileoverview Authentication Service Layer
 * @description Handles core authentication business logic and database interactions
 * @requires ../repositories/authRepository
 * @requires ../utils/jwtUtils
 */

import { AuthRepository } from "../repositories/authRepository.js";
import { JWTUtils } from "../utils/jwtUtils.js";


export class AuthService {
  

  static async register(userData) {
    const existingUser = await AuthRepository.findUserByEmail(userData.email);
    if (existingUser) {
      throw new Error("Email already registered");
    }

    try {
      return await AuthRepository.createUser(userData);
    } catch (error) {
      throw new Error("Error hashing password: " + error.message);
    }
  }

  static async refreshAccessToken(refreshToken) {
    const payload = JWTUtils.verifyRefreshToken(refreshToken);
    if (!payload) {
      throw new Error("Invalid refresh token");
    }

    const tokenExists = await AuthRepository.findRefreshToken(payload.userId, refreshToken);
    if (!tokenExists) {
      throw new Error("Refresh token not found");
    }

    const newAccessToken = JWTUtils.generateAccessToken(payload.userId);
    return { accessToken: newAccessToken };
  }

  static async logout(refreshToken) {
    const payload = JWTUtils.verifyRefreshToken(refreshToken);
    if (!payload) {
      throw new Error("Invalid refresh token");
    }

    const tokenExists = await AuthRepository.findRefreshToken(payload.userId, refreshToken);
    if (!tokenExists) {
      throw new Error("Refresh token not found or already deleted");
    }

    return await AuthRepository.deleteRefreshToken(payload.userId);
  }
}
