/**
 * @fileoverview Authentication Service Layer
 * @description Handles core user business logic and database interactions
 * @requires ../repositories/userRepository
 */
import { UserRepository } from '../repositories/userRepository.js';

export class UserService {
  static async getUser(userId) {
    try {
      return await UserRepository.findUser(userId);
    } catch (error) {
      throw new Error(`Error getting user: ${error.message}`);
    }
  }

  static async updateUser(userId, userData) {
    try {
      await UserRepository.findUser(userId);
      
      return await UserRepository.update(userId, userData);
    } catch (error) {
      throw new Error(`Error updating user: ${error.message}`);
    }
  }

  static async deleteUser(userId) {
    try {
      await UserRepository.findUser(userId);
      
      return await UserRepository.delete(userId);
    } catch (error) {
      throw new Error(`Error deleting user: ${error.message}`);
    }
  }
}
