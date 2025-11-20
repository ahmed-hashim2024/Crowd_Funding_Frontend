import React from 'react';
import { Navigate } from 'react-router-dom';

// هذا المكون يستقبل "الأبناء" (الصفحة التي تريد حمايتها)
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  // إذا لم يكن هناك توكن، حوله فوراً لصفحة الدخول
  if (!token) {
    // replace تمنع المستخدم من العودة للصفحة المحمية عند الضغط على زر Back
    return <Navigate to="/login" replace />;
  }

  // إذا كان مسجلاً، اعرض الصفحة المطلوبة
  return children;
};

export default ProtectedRoute;