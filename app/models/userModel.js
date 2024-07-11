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
