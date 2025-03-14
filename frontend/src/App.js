import React from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import router from './routes';
import Layout from './components/layout/Layout/Layout';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        
      </Layout>
    </BrowserRouter>
  );
}

export default App;