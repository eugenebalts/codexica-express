import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {type: String, required: true, unique: true},
  order_ids: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
  }],
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export const User = mongoose.model('User', userSchema);

class UsersService {
  async getAll() {
    const users = await User.find();

    return users;
  }

  async getById(id) {
    const user = await User.findById(id);

    return user;
  }

  async getByEmail(email) {
    const user = await User.findOne({email});

    return user;
  }

  async create(email) {
    const createdUser = await User.create({email});

    return createdUser;
  }

  async addOrder(user_id, order_id) {
    return User.findByIdAndUpdate(user_id, { $push: { order_ids: order_id } }, { new: true });
  }
}

export default new UsersService();