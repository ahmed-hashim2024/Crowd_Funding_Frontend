import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { FaSearch, FaCalendarAlt } from 'react-icons/fa';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]); // حالة للمشاريع المفلترة
  const [loading, setLoading] = useState(true);
  
  // حالات البحث
  const [searchTerm, setSearchTerm] = useState('');
  const [searchDate, setSearchDate] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get('/projects/');
        setProjects(response.data);
        setFilteredProjects(response.data); // في البداية نعرض كل المشاريع
      } catch (error) {
        console.error("Error fetching projects", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // دالة الفلترة (تشتغل كل ما نغير كلمة البحث أو التاريخ)
  useEffect(() => {
    const results = projects.filter(project => {
      const matchesName = project.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDate = searchDate ? project.start_time.startsWith(searchDate) : true;
      return matchesName && matchesDate;
    });
    setFilteredProjects(results);
  }, [searchTerm, searchDate, projects]);

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container mt-5">
      <div className="row mb-4 align-items-end">
        <div className="col-md-6">
          <h2>Fundraising Campaigns</h2>
        </div>
        
        {/* قسم البحث */}
        <div className="col-md-6">
          <div className="d-flex gap-2">
            <div className="input-group">
              <span className="input-group-text"><FaSearch /></span>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Search by project name..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
              />
            </div>
            <div className="input-group" style={{ maxWidth: '200px' }}>
              <span className="input-group-text"><FaCalendarAlt /></span>
              <input 
                type="date" 
                className="form-control" 
                value={searchDate} 
                onChange={(e) => setSearchDate(e.target.value)} 
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <div key={project.id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{project.title}</h5>
                  <p className="card-text text-muted"><small>By: {project.created_by}</small></p>
                  <p className="card-text">{project.details.substring(0, 100)}...</p>
                  <h6 className="text-success">Target: {project.total_target} EGP</h6>
                </div>
                <div className="card-footer bg-white border-top-0">
                   <small className="text-muted">
                     Starts: {new Date(project.start_time).toLocaleDateString()}
                   </small>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center alert alert-warning">
            No projects match your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectList;