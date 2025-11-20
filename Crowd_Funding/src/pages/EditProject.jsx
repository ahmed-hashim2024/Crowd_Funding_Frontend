import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditProject = () => {
  const { id } = useParams(); // لجلب رقم المشروع من الرابط
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  const [project, setProject] = useState({
    title: '',
    details: '',
    total_target: '',
    start_time: '',
    end_time: ''
  });

  // دالة مساعدة لتنسيق التاريخ ليناسب input type="datetime-local"
  const formatDateForInput = (isoDateString) => {
    if (!isoDateString) return '';
    const date = new Date(isoDateString);
    // نقوم بقتصاص الجزء الخاص بالثواني والمنطقة الزمنية ليقبلها الحقل
    return date.toISOString().slice(0, 16);
  };

  // جلب بيانات المشروع عند فتح الصفحة
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await api.get(`/projects/${id}/`);
        const data = response.data;
        
        // تحديث الحالة بالبيانات القادمة من السيرفر
        setProject({
          title: data.title,
          details: data.details,
          total_target: data.total_target,
          // تحويل التاريخ للصيغة المناسبة للـ input
          start_time: formatDateForInput(data.start_time),
          end_time: formatDateForInput(data.end_time),
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching project data", error);
        alert("Project not found or unauthorized");
        navigate('/');
      }
    };

    fetchProject();
  }, [id, navigate]);

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // نستخدم PUT للتعديل
      await api.put(`/projects/${id}/`, project);
      alert('Project updated successfully!');
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('Failed to update project.');
    }
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container mt-5" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4">Edit Campaign</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Campaign Title</label>
          <input 
            type="text" 
            name="title" 
            className="form-control" 
            value={project.title} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Details</label>
          <textarea 
            name="details" 
            className="form-control" 
            rows="4" 
            value={project.details} 
            onChange={handleChange} 
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Target Amount (EGP)</label>
          <input 
            type="number" 
            name="total_target" 
            className="form-control" 
            value={project.total_target} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Start Date</label>
            <input 
              type="datetime-local" 
              name="start_time" 
              className="form-control" 
              value={project.start_time} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">End Date</label>
            <input 
              type="datetime-local" 
              name="end_time" 
              className="form-control" 
              value={project.end_time} 
              onChange={handleChange} 
              required 
            />
          </div>
        </div>
        <button type="submit" className="btn btn-warning w-100">Update Campaign</button>
      </form>
    </div>
  );
};

export default EditProject;