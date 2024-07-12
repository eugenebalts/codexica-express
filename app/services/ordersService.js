import { Order } from '../models/orderModel.js';

class OrdersService {
  async getAll() {
    const orders = await Order.find();

    return orders;
  }

  async getById(id) {
    const order = await Order.findById(id);

    return order;
  }

  async create(order) {
    const createdOrder = await Order.create(order);

    return createdOrder;
  }
}

export default new OrdersService();
