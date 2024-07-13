import usersService from '../services/usersService.js';
import mongoose from 'mongoose';
import {
  BAD_REQUEST,
  EMAIL_IS_BUSY,
  INVALID_ID,
  USER_NOT_FOUND,
} from '../constants/errors.js';
import AppError from '../utils/appError.js';

class UsersController {
  async getAll(req, res, next) {
    try {
      const users = await usersService.getAll();

      res.json(users);
    } catch (err) {
      next(err);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new AppError(INVALID_ID, 400);
      }

      const user = await usersService.getById(id);

      if (!user) {
        throw new AppError(USER_NOT_FOUND, 404);
      }

      res.json(user);
    } catch (err) {
      next(err);
    }
  }

  async createUser(req, res, next) {
    try {
      const { email } = req.body;

      if (!email) {
        throw new AppError(BAD_REQUEST, 400);
      }

      const isUserExists = await usersService.getByEmail(email);

      if (isUserExists) {
        throw new AppError(EMAIL_IS_BUSY, 409);
      }

      const user = await usersService.create(email);

      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  }
}

export default new UsersController();
