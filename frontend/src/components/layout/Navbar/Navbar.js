import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">我的博客</Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className="nav-link">首页</Link>
        <Link to="/categories" className="nav-link">分类</Link>
        <Link to="/tags" className="nav-link">标签</Link>
        <Link to="/about" className="nav-link">关于</Link>
      </div>
      <div className="navbar-auth">
        <Link to="/login" className="nav-link">登录</Link>
        <Link to="/register" className="nav-link">注册</Link>
      </div>
    </nav>
  );
}

export default Navbar;