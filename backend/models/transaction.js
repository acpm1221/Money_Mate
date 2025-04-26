const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true, trim: true, maxLength: 50 },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['income', 'expense'], required: true },
  date: { type: Date, required: true },
  category: { type: String, required: true, trim: true },
  description: { type: String, trim: true, maxLength: 200 },
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);
