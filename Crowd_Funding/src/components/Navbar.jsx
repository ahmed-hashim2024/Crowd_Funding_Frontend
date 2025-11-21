import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa'; // حذفنا FaUser لعدم الحاجة له

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  
  // لم نعد بحاجة لجلب الاسم
  // const firstName = localStorage.getItem('first_name');

  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">CrowdFunding</Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={toggleMenu}
          aria-controls="navbarNav"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
          
          {token && (
            // التعديل هنا: غيرنا mx-auto إلى ms-auto لتروح يمين
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 text-center align-items-center">
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={() => setIsOpen(false)}>Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/my-projects" onClick={() => setIsOpen(false)}>My Projects</Link>
              </li>
            </ul>
          )}

          {/* قسم الخروج والدخول */}
          <div className="d-flex align-items-center justify-content-center gap-3 mt-3 mt-lg-0 ms-lg-3">
            {!token ? (
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/login" onClick={() => setIsOpen(false)}>Login</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/register" onClick={() => setIsOpen(false)}>Register</Link>
                </li>
              </ul>
            ) : (
              <>
                {/* تم حذف كود عرض الاسم من هنا */}
                
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