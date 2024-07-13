import mongoose from 'mongoose';
import ordersService from '../services/ordersService.js';
import usersService from '../services/usersService.js';
import {
  BAD_REQUEST,
  INVALID_ID,
  ORDER_NOT_FOUND,
  USER_NOT_FOUND,
} from '../constants/errors.js';
import AppError from '../utils/appError.js';

class OrdersController {
  async getAll(req, res, next) {
    try {
      const orders = await ordersService.getAll();

      res.json(orders);
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

      const order = await ordersService.getById(id);

      if (!order) {
        throw new AppError(ORDER_NOT_FOUND, 404);
      }

      res.json(order);
    } catch (err) {
      next(err);
    }
  }

  async createOrder(req, res, next) {
    try {
      const { user_id, status, option, price } = req.body;

      if (!(user_id && status && option && price)) {
        throw new AppError(BAD_REQUEST, 400);
      }

      const user = await usersService.getById(user_id);

      if (!user) {
        throw new AppError(USER_NOT_FOUND, 422);
      }

      const createdOrder = await ordersService.create({
        user_id,
        status,
        option,
        price,
      });

      await usersService.addOrder(createdOrder.user_id, createdOrder._id);

      res.status(201).json(createdOrder);
    } catch (err) {
      next(err);
    }
  }
}

export default new OrdersController();
