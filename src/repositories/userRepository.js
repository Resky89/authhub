import db from '../config/config.js';

export class UserRepository {
  static async findUser(userId) {
    try {
      const doc = await db.collection('users').doc(userId).get();
      if (!doc.exists) {
        throw new Error('User tidak ditemukan');
      }
      return { id: doc.id, ...doc.data() };
    } catch (error) {
      throw new Error(`Error mencari user: ${error.message}`);
    }
  }

  static async update(userId, userData) {
    try {
      const userRef = db.collection('users').doc(userId);
      const updateData = {
        ...userData,
        updatedAt: new Date()
      };
      
      if (updateData.password) {
        delete updateData.password;
      }
      
      await userRef.update(updateData);
      
      const updatedUser = await this.findUser(userId);
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
