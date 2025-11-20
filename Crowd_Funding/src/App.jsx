import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import ProjectList from './pages/ProjectList';
import CreateProject from './pages/CreateProject';
import EditProject from './pages/EditProject';
import ProtectedRoute from './components/ProtectedRoute'; // 1. استدعاء ملف الحماية

import MyProjects from './pages/MyProjects'; // استيراد الصفحة الجديدة

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProtectedRoute><ProjectList /></ProtectedRoute>} />
        
        {/* إضافة مسار مشاريعي */}
        <Route path="/my-projects" element={<ProtectedRoute><MyProjects /></ProtectedRoute>} />
        
        <Route path="/create-project" element={<ProtectedRoute><CreateProject /></ProtectedRoute>} />
        <Route path="/edit-project/:id" element={<ProtectedRoute><EditProject /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;