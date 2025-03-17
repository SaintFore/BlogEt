import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import Home from './pages/Home/Home';
import Layout from './components/layout/Layout/Layout';
import NotFound from './pages/NotFound/NotFound';
import Login from './components/auth/Login/Login';
import Register from './components/auth/Register/Register';
import ResetPassword from './components/auth/ResetPassword/ResetPassword';
import ResetPasswordConfirm from './components/auth/ResetPasswordConfirm/ResetPasswordConfirm';
import { useAuth } from './utils/AuthContext';

// 博客相关页面
import BlogList from './pages/Blog/BlogList';
import BlogPost from './pages/Blog/BlogPost';
import BlogEditor from './pages/Blog/BlogEditor';

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
      // 首页 - 公开
      { index: true, element: <Home /> },
      
      // 博客文章列表页 - 公开
      { path: 'blog', element: <BlogList /> },
      
      // 文章详情页 - 公开
      { path: 'blog/:slug', element: <BlogPost /> },
      
      // 分类筛选页面 - 公开
      { path: 'categories/:slug', element: <BlogList /> },
      
      // 标签筛选页面 - 公开
      { path: 'tags/:slug', element: <BlogList /> },
      
      // 需要登录才能访问的路由
      {
        element: <ProtectedRoute />,
        children: [
          // 创建文章页
          { path: 'blog/create', element: <BlogEditor /> },
          
          // 编辑文章页
          { path: 'blog/edit/:slug', element: <BlogEditor /> },
          
          // 后续可添加用户仪表盘等需要认证的页面
          // { path: 'dashboard', element: <Dashboard /> },
        ]
      },
      
      // 只有未登录用户可以访问的路由
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