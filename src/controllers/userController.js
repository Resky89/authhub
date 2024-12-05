import { UserService } from '../services/userService.js';

export class UserController {
  static async getProfile(req, res) {
    try {
      const userId = req.user.userId;
      const user = await UserService.getUser(userId);
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updateProfile(req, res) {
    try {
      const userId = req.user.userId;
      const userData = req.body;
      
      if (!userData || Object.keys(userData).length === 0) {
        return res.status(400).json({
          status: false,
          message: 'No update data provided'
        });
      }
      
      const updatedUser = await UserService.updateUser(userId, userData);
      
      return res.json({
        status: true,
        message: 'Profile successfully updated',
        data: {
          user: {
            id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
            phoneNumber: updatedUser.phoneNumber
          }
        }
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: error.message || 'An error occured while updating the profile'
      });
    }
  }

  static async deleteProfile(req, res) {
    try {
      if (!req.user || !req.user.userId) {
        return res.status(401).json({
          status: false,
          message: 'User authentication required'
        });
      }

      const userId = req.user.userId;
      await UserService.deleteUser(userId);
      
      return res.json({
        status: true,
        message: 'Profile successfully deleted'
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: error.message || 'An error occured while deleting the profile'
      });
    }
  }
}

export default UserController;
