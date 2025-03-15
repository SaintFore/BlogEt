import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './components/layout/Layout/Layout';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      {index: true, element: <Home/>},
      {path: '*', element: <NotFound/>}
    ]
  },
]);

export default router;