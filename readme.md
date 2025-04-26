# 💸 MoneyMate a Expense Tracker App

An easy-to-use Expense Tracker web app that allows users to sign up, log in, add income/expense transactions, visualize data through charts, and manage their finances securely.

## ✨ Features
- User Authentication (Signup/Login with JWT)
- Upload Profile Picture
- Add Income & Expense Transactions
- View Total Income and Expense
- Bar Chart and Pie Chart Visualization (using Recharts)
- Delete Transactions
- Responsive UI
- Secure API using Node.js, Express, MongoDB, Mongoose

## 📁 Project Structure
```
/backend
  ├── models/
  │    ├── User.js
  │    └── Transaction.js
  ├── routes/
  │    ├── userRoutes.js
  │    └── transactionRoutes.js
  ├── uploads/ (for profile pictures)
  └── server.js (Main backend server)

 /frontend
  ├── Components/
  │    ├── Login.js
  │    ├── Signup.js
  │    ├── Dashboard.js
  │    ├── AddTransaction.js
  │    └── Terms.js
  ├── App.js
  └── Dashboard.css
```

## ⚖️ Technologies Used
- **Frontend:** React.js, Axios, React Router, Recharts
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, Multer, bcryptjs, JWT
- **Styling:** Basic CSS (Dashboard.css)

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/expense-tracker.git
cd expense-tracker
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file inside `/backend`:
```plaintext
PORT=5000
MONGO_URL=your_mongodb_connection_url
JWT_SECRET=your_secret_key
```

Start the backend server:
```bash
npm start
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm start
```

The frontend runs on `http://localhost:3000`, backend runs on `http://localhost:5000`.

---

## 📷 Screenshots
| Login | Dashboard | Add Transaction |
|:-----:|:---------:|:----------------:|
| ![Login](screenshot-login.png) | ![Dashboard](screenshot-dashboard.png) | ![Add](screenshot-add.png) |

*(Add your screenshots here!)*

---

## 🚀 API Endpoints
| Method | Endpoint | Description |
|:------:|:--------:|:-----------:|
| `POST` | `/api/users/signup` | User signup (with profile picture) |
| `POST` | `/api/users/login` | User login |
| `GET`  | `/api/users/me` | Get current user |
| `POST` | `/api/transactions` | Add transaction |
| `GET`  | `/api/transactions` | Fetch all transactions |
| `DELETE` | `/api/transactions/:id` | Delete a transaction |

---

## 🔒 Security
- Passwords are hashed using bcrypt.
- Authentication is managed using JWT.
- Uploads folder access is protected.
  
---

## ✍️ Author
**Anmol Kumar** 
**anmolcricket805@gmail.com**  
Feel free to connect!

---

