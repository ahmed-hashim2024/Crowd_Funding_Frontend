import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';

const MyProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = localStorage.getItem('username'); 

  useEffect(() => {
    fetchMyProjects();
  }, []);

  const fetchMyProjects = async () => {
    try {
      const response = await api.get('/projects/');
      // ملاحظة: يفضل لو الباك إند يرجع الـ username متطابق مع الـ localStorage
      const myProjects = response.data.filter(project => project.created_by === currentUser);
      setProjects(myProjects);
    } catch (error) {
      console.error("Error fetching projects", error);
    } finally {
      setLoading(false);
    }
  };

  // دالة الحذف
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await api.delete(`/projects/${id}/`);
        // تحديث القائمة بعد الحذف بدون عمل ريفريش للصفحة
        setProjects(projects.filter(p => p.id !== id));
        alert("Project deleted successfully");
      } catch (error) {
        console.error("Error deleting project", error);
        alert("Failed to delete project");
      }
    }
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
        <h2>My Projects</h2>
        <Link to="/create-project" className="btn btn-success">
          <FaPlus className="me-2" /> Create New Project
        </Link>
      </div>

      <div className="row">
        {projects.length > 0 ? (
          projects.map((project) => (
            <div key={project.id} className="col-md-4 mb-4">
              <div className="card h-100 border-primary shadow-sm">
                <div className="card-header bg-primary text-white">
                    {project.title}
                </div>
                <div className="card-body">
                  <p className="card-text">{project.details.substring(0, 80)}...</p>
                  <strong className="text-success">{project.total_target} EGP</strong>
                </div>
                <div className="card-footer bg-white d-flex justify-content-between gap-2">
                   <Link to={`/edit-project/${project.id}`} className="btn btn-outline-warning btn-sm w-50 d-flex align-items-center justify-content-center">
                     <FaEdit className="me-1" /> Edit
                   </Link>
                   <button 
                     onClick={() => handleDelete(project.id)} 
                     className="btn btn-outline-danger btn-sm w-50 d-flex align-items-center justify-content-center"
                   >
                     <FaTrash className="me-1" /> Delete
                   </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center text-muted mt-5">
            <h4>You haven't created any projects yet.</h4>
            <Link to="/create-project" className="btn btn-primary mt-3">Start Now</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProjects;