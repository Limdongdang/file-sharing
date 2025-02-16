import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const Protect = () => {
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  // 로그인이 되어 있으면 Outlet(자식 라우트)을 렌더링, 아니면 /login으로 이동
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default Protect;