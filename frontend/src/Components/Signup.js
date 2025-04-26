import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import "./Signup.css";

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [agreed, setAgreed] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!agreed) {
      setMessage({ type: 'error', text: "You must agree to the terms and conditions." });
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    if (profilePic) formData.append('profilePic', profilePic);

    try {
      await axios.post('https://moneymate-1.onrender.com/api/users/signup', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage({ type: 'success', text: 'Signup successful!' });
      setTimeout(() => {
        navigate('/login');
      }, 3000); // 3 seconds wait
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.error || "Signup failed" });
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-left">
        <h1>MoneyMate<br />Because Every Penny Counts.<br /><br />Join Us<br /> Today</h1>
        <p>
          Create an account and start tracking your expenses smarter and faster.
          Your financial journey starts here!
        </p>
        <div className="social-icons">
          <i className="fab fa-facebook-f"></i>
          <i className="fab fa-twitter"></i>
          <i className="fab fa-instagram"></i>
          <i className="fab fa-youtube"></i>
        </div>
      </div>

      <div className="signup-right">
        <h2>Sign up</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
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
        <input
          type="file"
          accept="image/*"
          onChange={e => setProfilePic(e.target.files[0])}
        />
        <div className="agree-terms">
          <input
            type="checkbox"
            checked={agreed}
            onChange={e => setAgreed(e.target.checked)}
            id="terms"
          />
          <label htmlFor="terms">
            I agree to the
            <Link to="/terms" target="_blank" rel="noopener noreferrer"> Terms & Conditions</Link>
          </label>
        </div>
        {message && (
          <p className={message.type === 'error' ? 'error' : 'success'}>
            {message.text}
          </p>
        )}
        <button onClick={handleSignup} disabled={!agreed}>Sign up now</button>

        <p className="login-text">
          Already have an account? <Link to="/login" className="login-link">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
