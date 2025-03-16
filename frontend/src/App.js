import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './utils/AuthContext';
import router from './routes';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;