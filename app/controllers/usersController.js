import { STATUS_CODES } from 'http';
import usersService from '../services/usersService.js';
import mongoose from 'mongoose';

class UsersController {
  async getAll(req, res) {
    try {
      const users = await usersService.getAll();

      res.json({
        users,
      });
    } catch (err) {
      res.status(500).json({ message: err.message ?? STATUS_CODES['500'] });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: STATUS_CODES['400'] });
      }

      const user = await usersService.getById(id);

      if (user) {
        return res.json(user);
      }

      res.status(404).json({ message: STATUS_CODES[404] });
    } catch (err) {
      res.status(500).json({ message: err.message ?? STATUS_CODES[500] });
    }
  }

  async createUser(req, res) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ message: STATUS_CODES[400] });
      }

      const isUserExists = await usersService.getByEmail(email);

      if (isUserExists) {
        return res
          .status(409)
          .json({
            message: `${STATUS_CODES[409]}: User with this email already exists`,
          });
      }

      const user = await usersService.create(email);

      res.status(201).json(user);
    } catch (err) {
      res.status(500).json({ message: err.message ?? STATUS_CODES[500] });
    }
  }
}

export default new UsersController();
