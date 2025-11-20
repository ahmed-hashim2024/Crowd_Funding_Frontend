import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaUser } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const firstName = localStorage.getItem('first_name'); // جلب الاسم الأول

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">CrowdFunding</Link>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          {token && (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/my-projects">My Projects</Link>
              </li>
            </ul>
          )}

          <div className="d-flex align-items-center ms-auto gap-3">
            {!token ? (
              <ul className="navbar-nav">
                <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
              </ul>
            ) : (
              <>
                {/* عرض الاسم الأول */}
                <div className="text-white d-flex align-items-center gap-2 border px-3 py-1 rounded border-secondary">
                  <FaUser className="text-warning" />
                  <span className="fw-bold small">Hi, {firstName}</span>
                </div>

                <button className="btn btn-link text-danger p-0" onClick={handleLogout} title="Logout">
                  <FaSignOutAlt size={20} />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;