import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';
import './ResetPasswordConfirm.css';

const ResetPasswordConfirm = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    new_password: '',
    new_password2: '',
    uid,
    token
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const { resetPasswordConfirm, error } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const result = await resetPasswordConfirm(formData);
    setIsSubmitting(false);
    if (result) {
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>设置新密码</h2>
        {success ? (
          <div className="success-message">
            <p>密码已成功重置！</p>
            <p>您将在3秒后被重定向到登录页面...</p>
            <div className="auth-links">
              <Link to="/login">立即前往登录</Link>
            </div>
          </div>
        ) : (
          <>
            {error && <div className="auth-error">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="new_password">新密码</label>
                <input
                  type="password"
                  id="new_password"
                  name="new_password"
                  value={formData.new_password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="new_password2">确认新密码</label>
                <input
                  type="password"
                  id="new_password2"
                  name="new_password2"
                  value={formData.new_password2}
                  onChange={handleChange}
                  required
                />
              </div>
              <button 
                type="submit" 
                className="auth-button" 
                disabled={isSubmitting}
              >
                {isSubmitting ? '提交中...' : '重置密码'}
              </button>
            </form>
            <div className="auth-links">
              <Link to="/login">返回登录</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordConfirm;