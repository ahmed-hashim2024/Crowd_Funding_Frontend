import React, { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    mobile_phone: '',
    password: '',
    confirm_password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/register/', formData);
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (error) {
      console.error(error);
      alert('Registration failed. Please check your data.');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4">Create an Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">First Name</label>
            <input type="text" name="first_name" className="form-control" onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Last Name</label>
            <input type="text" name="last_name" className="form-control" onChange={handleChange} required />
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Email Address</label>
          <input type="email" name="email" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Mobile Phone</label>
          <input type="text" name="mobile_phone" className="form-control" placeholder="01xxxxxxxxx" pattern="^01[0125][0-9]{8}$" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" name="password" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Confirm Password</label>
          <input type="password" name="confirm_password" className="form-control" onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary w-100">Register</button>
      </form>
    </div>
  );
};

export default Register;