import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  
  // جلب البيانات من المتصفح
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username'); // 1. جلب اسم المستخدم

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username'); // 2. حذف الاسم عند الخروج لتنظيف البيانات
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">CrowdFunding</Link>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* استخدمنا align-items-center لضبط محاذاة العناصر رأسياً */}
          <ul className="navbar-nav ms-auto align-items-center">
            {!token ? (
              // حالة الزائر (غير مسجل دخول)
              <>
                <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
              </>
            ) : (
              // حالة المستخدم المسجل
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>

                {/* 3. رابط إنشاء مشروع جديد بلون مميز */}
                <li className="nav-item">
                  <Link className="nav-link text-success fw-bold" to="/create-project">
                    + New Project
                  </Link>
                </li>

                {/* 4. عرض اسم المستخدم */}
                <li className="nav-item ms-lg-3 me-lg-3">
                  <span className="navbar-text text-white border border-secondary rounded px-2 py-1">
                    User: {username || 'Member'}
                  </span>
                </li>

                <li className="nav-item">
                  <button className="btn btn-link nav-link text-danger" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;