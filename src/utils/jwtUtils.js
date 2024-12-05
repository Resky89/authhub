import jwt from 'jsonwebtoken';
import 'dotenv/config';

export class JWTUtils {
  static accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
  static refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

  static generateAccessToken(userId) {
    if (!this.accessTokenSecret) {
      throw new Error('Failed to generate access token: Missing required configuration');
    }
    return jwt.sign({ userId }, this.accessTokenSecret, { expiresIn: '15m' });
  }

  static generateRefreshToken(userId) {
    if (!this.refreshTokenSecret) {
      throw new Error('Failed to generate refresh token: Missing required configuration');
    }
    return jwt.sign({ userId }, this.refreshTokenSecret, { expiresIn: '7d' });
  }

  static verifyAccessToken(token) {
    try {
      if (!this.accessTokenSecret) {
        throw new Error('Failed to verify access token: Missing required configuration');
      }
      return jwt.verify(token, this.accessTokenSecret);
    } catch (error) {
      return null;
    }
  }

  static verifyRefreshToken(token) {
    try {
      if (!this.refreshTokenSecret) {
        throw new Error('Failed to verify refresh token: Missing required configuration');
      }
      return jwt.verify(token, this.refreshTokenSecret);
    } catch (error) {
      return null;
    }
  }
}

export default JWTUtils;
