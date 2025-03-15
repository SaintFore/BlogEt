import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">ET</Link>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">首页</Link>
          </li>
          <li className="navbar-item">
            <Link to="/categories" className="navbar-link">分类</Link>
          </li>
          <li className="navbar-item">
            <Link to="/tags" className="navbar-link">标签</Link>
          </li>
          <li className="navbar-item">
            <Link to="/about" className="navbar-link">关于</Link>
          </li>
        </ul>
        <div className="navbar-auth">
          <Link to="/login" className="navbar-button navbar-login">登录</Link>
          <Link to="/register" className="navbar-button navbar-signup">注册</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;