import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './components/layout/Layout/Layout';
import NotFound from './pages/NotFound/NotFound';


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