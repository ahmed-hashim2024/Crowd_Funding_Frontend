import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // 1. جلب اسم المستخدم الحالي من الذاكرة
  const currentUser = localStorage.getItem('username');

  useEffect(() => {
    // ... (نفس كود الـ fetch القديم) ...
    const fetchProjects = async () => {
      try {
        const response = await api.get('/projects/');
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container mt-5">
      {/* ... (نفس كود الهيدر) ... */}
      
      <div className="row">
        {projects.length > 0 ? (
          projects.map((project) => (
            <div key={project.id} className="col-12 col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{project.title}</h5>
                  {/* عرض اسم صاحب المشروع */}
                  <p className="card-text text-muted"><small>By: {project.created_by}</small></p> 
                  <p className="card-text">{project.details.substring(0, 100)}...</p>
                  <h6 className="text-success">Target: {project.total_target} EGP</h6>
                </div>
                <div className="card-footer bg-white border-top-0">
                   <div className="d-flex justify-content-between align-items-center">
                     <small className="text-muted">
                       Ends: {new Date(project.end_time).toLocaleDateString()}
                     </small>
                     
                     <div>
                        {/* 2. الشرط السحري: هل المستخدم الحالي هو صاحب المشروع؟ */}
                        {currentUser === project.created_by && (
                            <Link to={`/edit-project/${project.id}`} className="btn btn-outline-warning btn-sm me-2">
                                Edit
                            </Link>
                        )}
                        
                     </div>
                   </div>
                </div>
              </div>
            </div>
          ))
        ) : (
            // ... (نفس كود الـ else) ...
            <div>No projects</div>
        )}
      </div>
    </div>
  );
};

export default ProjectList;