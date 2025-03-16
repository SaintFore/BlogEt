import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../utils/AuthContext';
import './Navbar.css';

function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // 处理滚动效果
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 路由变化时关闭菜单
  useEffect(() => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) setIsUserMenuOpen(false);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // 点击外部关闭用户菜单
  useEffect(() => {
    function handleClickOutside(event) {
      if (isUserMenuOpen && !event.target.closest('.user-menu-container')) {
        setIsUserMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isUserMenuOpen]);

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-text">BlogEt</span>
          <span className="logo-dot">.</span>
        </Link>

        <button className="navbar-toggle" onClick={toggleMenu} aria-label="菜单">
          <span className={`navbar-toggle-icon ${isMenuOpen ? 'active' : ''}`}></span>
        </button>

        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <ul className="nav-links">
            <li className="nav-item">
              <NavLink to="/" end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                首页
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/blog" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                文章
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/categories" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                分类
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/tags" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                标签
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                关于
              </NavLink>
            </li>
          </ul>

          <div className="navbar-auth">
            {isAuthenticated ? (
              <div className="user-menu-container">
                <button className="user-button" onClick={toggleUserMenu}>
                  <div className="user-avatar">
                    {user?.username.charAt(0).toUpperCase()}
                  </div>
                  <span className="user-name">{user?.username}</span>
                  <span className={`user-arrow ${isUserMenuOpen ? 'up' : 'down'}`}></span>
                </button>

                <div className={`user-dropdown ${isUserMenuOpen ? 'active' : ''}`}>
                  <div className="user-dropdown-header">
                    <p className="user-greeting">您好，{user?.username}</p>
                    <p className="user-email">{user?.email}</p>
                  </div>
                  <div className="user-dropdown-links">
                    <Link to="/profile" className="dropdown-item">
                      <span className="dropdown-icon">👤</span>
                      <span>个人资料</span>
                    </Link>
                    <Link to="/dashboard" className="dropdown-item">
                      <span className="dropdown-icon">📊</span>
                      <span>控制面板</span>
                    </Link>
                    <Link to="/my-posts" className="dropdown-item">
                      <span className="dropdown-icon">📝</span>
                      <span>我的文章</span>
                    </Link>
                    <div className="dropdown-divider"></div>
                    <div className="logout-item">
                      <button onClick={handleLogout} className="dropdown-item logout-button">
                        <span className="dropdown-icon">🚪</span>
                        <span>退出登录</span>
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="auth-button login-button">登录</Link>
                <Link to="/register" className="auth-button register-button">注册</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;