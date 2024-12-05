/**
 * @fileoverview Authentication Repository Layer
 * @description Handles database operations for user-profile-related functions
 * @requires ../config/config
 */

import db from '../config/config.js';

export class UserRepository {
  static async findUser(userId) {
    try {
      const doc = await db.collection('users').doc(userId).get();
      if (!doc.exists) {
        throw new Error('User Not Found');
      }
      return { id: doc.id, ...doc.data() };
    } catch (error) {
      throw new Error(`Error Find user: ${error.message}`);
    }
  }

  static async update(userId, userData) {
    try {
      if (!userData || typeof userData !== 'object') {
        throw new Error('Invalid update data provided');
      }

      const userRef = db.collection('users').doc(userId);
      const updateData = {
        ...userData,
        updatedAt: new Date()
      };
      
      if (updateData.password) {
        delete updateData.password;
      }
      
      const writeResult = await userRef.update(updateData);
      if (!writeResult.writeTime) {
        throw new Error('Update operation failed');
      }
      
      const updatedUser = await this.findUser(userId);
      
      const hasChanges = Object.keys(userData).some(key => 
        userData[key] !== undefined && updatedUser[key] === userData[key]
      );
      
      if (!hasChanges) {
        throw new Error('Data was not updated successfully');
      }
      
      return updatedUser;
    } catch (error) {
      throw new Error(`Error update user: ${error.message}`);
    }
  }

  static async delete(userId) {
    try {
      await db.collection('users').doc(userId).delete();
      return true;
    } catch (error) {
      throw new Error(`Error delete user: ${error.message}`);
    }
  }
}
