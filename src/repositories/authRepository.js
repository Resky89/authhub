/**
 * @fileoverview Authentication Repository Layer
 * @description Handles database operations for authentication-related functions
 * @requires ../config/config
 * @requires bcrypt
 */

import db from "../config/config.js";
import bcrypt from "bcrypt";

export class AuthRepository {

   static async validatePassword(inputPassword, hashedPassword) {
    return await bcrypt.compare(inputPassword, hashedPassword);
  }

  static async saveRefreshToken(userId, refreshToken) {
    const hashedToken = await bcrypt.hash(refreshToken, 10);
    await db
      .collection("tokens")
      .doc(userId)
      .set(
        {
          refreshToken: hashedToken,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
        { merge: true }
      );
  }

  static async findRefreshToken(userId, refreshToken) {
    const tokenDoc = await db.collection("tokens").doc(userId).get();

    if (!tokenDoc.exists) return false;

    const data = tokenDoc.data();
    if (data.expiresAt <= new Date()) return new Error("Token expired");

    const isValid = await bcrypt.compare(refreshToken, data.refreshToken);
    return isValid;
  }

  static async findUserByEmail(email) {
    const snapshot = await db
      .collection("users")
      .where("email", "==", email)
      .limit(1)
      .get();
    
    if (snapshot.empty) return null;
    const userDoc = snapshot.docs[0];
    return { id: userDoc.id, ...userDoc.data() };
  }

  static async createUser(userData) {
    const hashPassword = await bcrypt.hash(userData.password, 10);
    const userToSave = {
      ...userData,
      password: hashPassword,
    };

    const docRef = await db.collection("users").add(userToSave);
    const newUser = await docRef.get();
    const { password, ...userWithOutPassword } = {
      id: newUser.id,
      ...newUser.data(),
    };
    return userWithOutPassword;
  }

  static async deleteRefreshToken(userId) {
    const docRef = await db.collection("tokens").doc(userId).delete();
    return { id: docRef.id };
  }
}
