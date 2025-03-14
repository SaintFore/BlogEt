import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
// import BlogPost from './pages/BlogPost';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Dashboard from './pages/Dashboard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
//   {
//     path: '/post/:id',
//     element: <BlogPost />,
//   },
//   {
//     path: '/login',
//     element: <Login />,
//   },
//   {
//     path: '/register',
//     element: <Register />,
//   },
//   {
//     path: '/dashboard',
//     element: <Dashboard />,
//   },
]);

export default router;