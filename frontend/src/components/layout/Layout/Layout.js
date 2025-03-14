import React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './Layout.css';

function Layout({ children }) {
  return (
    <div className="layout">
      <Navbar />
      <main className="content">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;