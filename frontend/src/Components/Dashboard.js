import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";
import AddTransaction from "./AddTransaction";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";

function Dashboard({ token }) {
  const [user, setUser] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [transactionType, setTransactionType] = useState('income');
  const navigate = useNavigate();

  const BASE_URL = "https://moneymate-1.onrender.com";

  const calculateTotals = (transactions) => {
    const inc = transactions.filter(t => t.type === "income").reduce((acc, cur) => acc + cur.amount, 0);
    const exp = transactions.filter(t => t.type === "expense").reduce((acc, cur) => acc + cur.amount, 0);
    setIncome(inc);
    setExpense(exp);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await axios.get(`${BASE_URL}/api/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(userRes.data);

        const trxRes = await axios.get(`${BASE_URL}/api/transactions`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTransactions(trxRes.data);
        calculateTotals(trxRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [token]);

  const deleteTransaction = async (id) => {
    if (!window.confirm("Delete this transaction?")) return;

    try {
      await axios.delete(`${BASE_URL}/api/transactions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updated = transactions.filter((t) => t._id !== id);
      setTransactions(updated);
      calculateTotals(updated);
    } catch (err) {
      console.error("Error deleting transaction:", err.response?.data || err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleAddClick = (type) => {
    setTransactionType(type);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const refreshTransactions = async () => {
    try {
      const trxRes = await axios.get(`${BASE_URL}/api/transactions`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactions(trxRes.data);
      calculateTotals(trxRes.data);
    } catch (err) {
      console.error("Error refreshing transactions:", err);
    }
  };

  const chartData = [{ name: "Total", income, expense }];
  const pieData = [
    { name: "Income", value: income },
    { name: "Expense", value: expense },
  ];
  const pieColors = ["#4caf50", "#f44336"];
  const dateWiseData = transactions.map((t) => ({
    date: t.date.split("T")[0],
    amount: t.amount,
    type: t.type,
  }));

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <div className="user-info">
          {user.profilePic && (
            <img
              className="profile-pic"
              src={`${BASE_URL}/${user.profilePic}`}
              alt="Profile"
            />
          )}
          <h1>Welcome, {user.name}</h1>
        </div>
      </div>

      {/* Summary Section */}
      <div className="summary-section">
        <div className="summary-card spent">
          <p>SPENT</p>
          <h2>₹{expense}</h2>
        </div>

        <div className="summary-graph">
          <ResponsiveContainer width="100%" height={80}>
            <BarChart data={[{ spent: expense, remaining: income - expense }]}>
              <Bar dataKey="spent" stackId="a" fill="#f44336" />
              <Bar dataKey="remaining" stackId="a" fill="#4caf50" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="summary-card remaining">
          <p>REMAINING</p>
          <h2>₹{income - expense}</h2>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button className="btn income-btn" onClick={() => handleAddClick('income')}>➕ Add Income</button>
        <button className="btn expense-btn" onClick={() => handleAddClick('expense')}>➖ Add Expense</button>
      </div>

      {/* Charts */}
      <div className="charts-grid">
        <div className="chart-card">
          <h3>Total Income vs Expense</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" fill="#4caf50" />
              <Bar dataKey="expense" fill="#f44336" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Transaction Breakdown</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Date-wise Transactions */}
      <div className="chart-card">
        <h3>Date-wise Transaction Amount</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dateWiseData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="amount" fill="#2196f3" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Transactions */}
      <div className="transactions-section">
        <h3>Recent Transactions</h3>
        <ul className="transaction-list">
          {transactions.map((trx) => (
            <li key={trx._id} className="transaction-item">
              <span>
                {trx.date.split("T")[0]} - <b>{trx.type.toUpperCase()}</b>: ₹{trx.amount} ({trx.category})
              </span>
              <button className="delete-btn" onClick={() => deleteTransaction(trx._id)}>❌</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Logout Button */}
      <button className="btn logout-btn" onClick={handleLogout}>
        Sign Out
      </button>

      {/* AddTransaction Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <AddTransaction
              token={token}
              type={transactionType}
              onClose={closeModal}
              onTransactionAdded={refreshTransactions}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
