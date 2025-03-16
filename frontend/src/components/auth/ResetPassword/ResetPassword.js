import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';
import './Auth.css';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { resetPassword, error } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const success = await resetPassword(email);
    setIsSubmitting(false);
    if (success) {
      setSubmitted(true);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>重置密码</h2>
        {submitted ? (
          <div className="success-message">
            <p>如果该邮箱存在于我们的系统中，您将收到一封密码重置邮件。</p>
            <p>请检查您的收件箱，并按照邮件中的说明操作。</p>
            <div className="auth-links">
              <Link to="/login">返回登录</Link>
            </div>
          </div>
        ) : (
          <>
            {error && <div className="auth-error">{error}</div>}
            <p>请输入您的电子邮箱地址，我们将发送密码重置链接给您。</p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">电子邮箱</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button 
                type="submit" 
                className="auth-button" 
                disabled={isSubmitting}
              >
                {isSubmitting ? '发送中...' : '发送重置链接'}
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

export default ResetPassword;