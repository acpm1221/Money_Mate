import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import "./Login.css";

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('https://moneymate-1.onrender.com/api/users/login', { email, password });
      localStorage.setItem('token', res.data.token);
      onLogin(res.data.token);
      navigate('/dashboard');
    } catch (err) {
      const message = err.response?.data?.error || "Login failed";
      setError(message);
      console.error('Login error:', message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <h1>MoneyMate<br/>Because Every Penny Counts.</h1>
        <p>
          Login and start tracking your expenses smarter and faster.
          Your financial journey starts here!
        </p>
        <div className="social-icons">
          <i className="fab fa-facebook-f"></i>
          <i className="fab fa-twitter"></i>
          <i className="fab fa-instagram"></i>
          <i className="fab fa-youtube"></i>
        </div>
      </div>

      <div className="login-right">
        <h2>Sign in</h2>
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <div className="remember-me">
          <input type="checkbox" id="remember" />
          <label htmlFor="remember">Remember Me</label>
        </div>
        {error && <p className="error">{error}</p>}
        <button onClick={handleLogin}>Sign in now</button>

        <Link to="/forgot-password" className="forgot-password">Lost your password?</Link>

        <p className="signup-text">
          New user? <Link to="/signup" className="signup-link">Sign up here</Link>
        </p>

        <p className="terms">
          By clicking on "Sign in now" you agree to 
          <Link to="/terms" className="terms-link"> Terms of Service</Link> | 
          <Link to="/privacy" className="terms-link"> Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
