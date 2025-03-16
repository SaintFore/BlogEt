import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import Home from './pages/Home/Home';
import Layout from './components/layout/Layout/Layout';
import NotFound from './pages/NotFound/NotFound';
import Login from './components/auth/Login/Login';
import Register from './components/auth/Register/Register';
import ResetPassword from './components/auth/ResetPassword/ResetPassword';
import ResetPasswordConfirm from './components/auth/ResetPasswordConfirm/ResetPasswordConfirm';
import { useAuth } from './utils/AuthContext';

// 受保护路由组件
const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="loading">加载中...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

// 已认证用户路由（已登录用户不应该访问登录页面等）
const AuthRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div className="loading">加载中...</div>;
  }
  
  return !isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

const router = createBrowserRouter([
  // 公共布局
  {
    path: '/',
    element: <Layout />,
    children: [
      // 受保护的路由
      {
        element: <ProtectedRoute />,
        children: [
          { index: true, element: <Home /> },
          // 这里可以添加更多需要登录才能访问的路由
        ]
      },
      
      // 不需要登录即可访问的路由
      {
        element: <AuthRoute />,
        children: [
          { path: 'login', element: <Login /> },
          { path: 'register', element: <Register /> },
          { path: 'reset-password', element: <ResetPassword /> },
          { path: 'reset-password/:uid/:token', element: <ResetPasswordConfirm /> },
        ]
      },
      
      // 404页面
      { path: '*', element: <NotFound /> }
    ]
  },
]);

export default router;