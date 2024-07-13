import { STATUS_CODES } from 'http';
import mongoose from 'mongoose';
import ordersService from '../services/ordersService.js';
import usersService from '../services/usersService.js';

class OrdersController {
  async getAll(req, res) {
    try {
      const orders = await ordersService.getAll();

      res.json(orders);
    } catch (err) {
      res.status(500).json({ message: err.message ?? STATUS_CODES[500] });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: STATUS_CODES[400] });
      }

      const order = await ordersService.getById(id);

      if (!order) {
        return res.status(404).json({ message: STATUS_CODES[404] });
      }

      res.json(order);
    } catch (err) {
      res.status(500).json({ message: err.message ?? STATUS_CODES[500] });
    }
  }

  async createOrder(req, res) {
    try {
      const { user_id, status, option, price } = req.body;

      if (!(user_id && status && option && price)) {
        return res.status(400).json({ message: STATUS_CODES[400] });
      }

      const user = await usersService.getById(user_id);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
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
      res.status(500).json({ message: err.message ?? STATUS_CODES[500] });
    }
  }
}

export default new OrdersController();
