import { useState } from 'react';
import axios from 'axios';
import './AddTransaction.css';

function AddTransaction({ token, type, onClose, onTransactionAdded }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async () => {
    if (!title || !category || !amount || !date) {
      alert('Please fill all required fields!');
      return;
    }

    try {
      await axios.post('https://moneymate-1.onrender.com/api/transactions', {
        title,
        type,
        category,
        description,
        date,
        amount: parseFloat(amount),
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onTransactionAdded(); // refresh dashboard
      onClose(); // close modal
    } catch (err) {
      alert('Error adding transaction');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="add-transaction-container">
        <button className="close-btn" onClick={onClose}>×</button>

        <div className="form-card">
          <h2>MoneyMate<br />Add {type.charAt(0).toUpperCase() + type.slice(1)}</h2>

          <input
            type="text"
            placeholder="Title*"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Category*"
            value={category}
            onChange={e => setCategory(e.target.value)}
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows="3"
          />
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
          <input
            type="number"
            placeholder="Amount*"
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />

          <div className="button-group">
            <button className="submit-btn" onClick={handleSubmit}>Submit</button>
            <button className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTransaction;
