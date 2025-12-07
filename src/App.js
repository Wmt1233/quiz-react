import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Admin from './Admin';

const App = () => {
  // 初始化时从 localStorage 读取登录状态，防止刷新页面后跳回登录页
  const [isLogin, setIsLogin] = useState(() => localStorage.getItem('isLogin') === 'true');

  useEffect(() => {
    if (isLogin) {
      localStorage.setItem('isLogin', 'true');
    } else {
      localStorage.removeItem('isLogin');
      localStorage.removeItem('token'); // 登出时清除token
    }
  }, [isLogin]);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={isLogin ? <Navigate to="/admin" replace /> : <Login onLogin={() => setIsLogin(true)} />}
        />
        <Route
          path="/admin"
          element={isLogin ? <Admin onLogout={() => setIsLogin(false)} /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/"
          element={<Navigate to={isLogin ? "/admin" : "/login"} replace />}
        />
      </Routes>
    </Router>
  );
};

export default App;