import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom';
import { FaTrash, FaEdit, FaPlus, FaCoins } from 'react-icons/fa';

const MyProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const currentUsername = localStorage.getItem('username'); 
  const borderColors = ['border-success', 'border-primary', 'border-danger', 'border-warning'];

  useEffect(() => {
    fetchMyProjects();
  }, []);

  const fetchMyProjects = async () => {
    try {
      const response = await api.get('/projects/');
      const allProjects = response.data;
      
      if (!currentUsername) {
          setProjects([]);
          setLoading(false);
          return;
      }

      const storedUserRaw = currentUsername.toLowerCase().trim();
      const storedUserPrefix = storedUserRaw.includes('@') ? storedUserRaw.split('@')[0] : storedUserRaw;

      const myProjects = allProjects.filter(project => {
        if (!project.created_by) return false;
        const owner = project.created_by.toLowerCase().trim();
        return owner === storedUserRaw || owner === storedUserPrefix;
      });
      
      setProjects(myProjects);
    } catch (error) {
      console.error("Error fetching projects", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await api.delete(`/projects/${id}/`);
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
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h2 className="fw-bold text-dark">My Projects</h2>
        <Link to="/create-project" className="btn btn-dark rounded-pill px-4">
          <FaPlus className="me-2" /> New Project
        </Link>
      </div>

      <div className="row">
        {projects.length > 0 ? (
          projects.map((project, index) => {
            const borderColor = borderColors[index % borderColors.length];
            return (
              <div key={project.id} className="col-md-6 col-lg-4 mb-4">
                <div className={`card h-100 shadow-sm border-0 border-start border-5 ${borderColor}`} style={{ borderRadius: '10px', backgroundColor: '#fff' }}>
                  <div className="card-body d-flex flex-column p-4">
                    <h5 className="card-title fw-bold mb-2 text-dark" style={{ fontSize: '1.25rem' }}>{project.title}</h5>
                    <p className="card-text text-muted mb-4 small">
                      {project.details.length > 100 ? project.details.substring(0, 100) + '...' : project.details}
                    </p>
                    <div className="mt-auto mb-3 text-secondary d-flex align-items-center">
                       <FaCoins className="me-2 text-warning" />
                       <span className="fw-bold">{project.total_target} EGP</span>
                    </div>
                    <div className="d-flex justify-content-end gap-3 pt-3 border-top">
                        <Link to={`/edit-project/${project.id}`} className="text-primary p-2 rounded-circle hover-bg-light" title="Edit">
                            <FaEdit size={20} />
                        </Link>
                        <button onClick={() => handleDelete(project.id)} className="btn btn-link text-danger p-2 rounded-circle" title="Delete">
                            <FaTrash size={20} />
                        </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-12 text-center text-muted mt-5">
            <h4>You haven't created any projects yet.</h4>
            <Link to="/create-project" className="btn btn-primary mt-3 px-4 rounded-pill">Create First Project</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProjects;