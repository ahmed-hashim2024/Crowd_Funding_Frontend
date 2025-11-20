import React, { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

const CreateProject = () => {
  const navigate = useNavigate();
  const [project, setProject] = useState({
    title: '',
    details: '',
    total_target: '',
    start_time: '',
    end_time: ''
  });

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/projects/', project);
      alert('Project created successfully!');
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('Failed to create project.');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4">Create New Campaign</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Campaign Title</label>
          <input type="text" name="title" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Details</label>
          <textarea name="details" className="form-control" rows="4" onChange={handleChange} required></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Target Amount (EGP)</label>
          <input type="number" name="total_target" className="form-control" onChange={handleChange} required />
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Start Date</label>
            <input type="datetime-local" name="start_time" className="form-control" onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">End Date</label>
            <input type="datetime-local" name="end_time" className="form-control" onChange={handleChange} required />
          </div>
        </div>
        <button type="submit" className="btn btn-success">Launch Campaign</button>
      </form>
    </div>
  );
};

export default CreateProject;