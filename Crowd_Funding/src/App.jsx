import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import ProjectList from './pages/ProjectList';
import CreateProject from './pages/CreateProject';
import EditProject from './pages/EditProject';
import ProtectedRoute from './components/ProtectedRoute'; // 1. استدعاء ملف الحماية

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* 2. تغليف الصفحة الرئيسية (مش هيدخل هنا غير لو معاه توكن) */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <ProjectList />
            </ProtectedRoute>
          } 
        />

        {/* يفضل حماية صفحات الإنشاء والتعديل أيضاً */}
        <Route 
          path="/create-project" 
          element={
            <ProtectedRoute>
              <CreateProject />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/edit-project/:id" 
          element={
            <ProtectedRoute>
              <EditProject />
            </ProtectedRoute>
          } 
        />

        {/* الصفحات العامة (لا تحتاج حماية) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
      </Routes>
    </Router>
  );
}

export default App;