import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Dashboard from './Components/Dashboard';
import Terms from './Components/Terms';
import AddTransaction from './Components/AddTransaction';

function App() {
    const token = localStorage.getItem('token');

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login onLogin={() => window.location.href = '/dashboard'} />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={token ? <Dashboard token={token} /> : <Navigate to="/" />} />
                <Route path="/add/:type" element={token ? <AddTransaction token={token} /> : <Navigate to="/" />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;
