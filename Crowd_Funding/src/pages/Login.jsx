import React, { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/login/', credentials);
      
      localStorage.setItem('token', response.data.token);
      
      // ملاحظة: تأكد أن الباك إند يرجع "first_name". 
      // إذا لم يرجع، سيأخذ الـ username كبديل.
      const firstName = response.data.first_name || credentials.username;
      localStorage.setItem('first_name', firstName); 
      
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('Invalid credentials');
    }
  };
  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h2 className="mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input type="text" name="username" className="form-control" placeholder="Enter username" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" name="password" className="form-control" placeholder="Enter password" onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary w-100">Sign In</button>
      </form>
    </div>
  );
};

export default Login;