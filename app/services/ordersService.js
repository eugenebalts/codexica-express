import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  status: {
    type: String,
    required: true,
  },
  option: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export const Order = mongoose.model('Order', orderSchema);

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