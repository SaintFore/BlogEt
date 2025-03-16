import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, error } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await login(formData);
    setIsSubmitting(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>登录</h2>
        {error && <div className="auth-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">用户名</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">密码</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button 
            type="submit" 
            className="auth-button" 
            disabled={isSubmitting}
          >
            {isSubmitting ? '登录中...' : '登录'}
          </button>
        </form>
        <div className="auth-links">
          <Link to="/register">没有账户？注册</Link>
          <Link to="/reset-password">忘记密码？</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;