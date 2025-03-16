import React, { createContext, useContext, useState, useEffect } from 'react';
import { blogApi, authUtils } from '../services/api';
import { useNavigate } from 'react-router-dom';

// 创建认证上下文
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  // 初始化认证状态
  useEffect(() => {
    const initAuth = async () => {
      if (authUtils.isAuthenticated()) {
        try {
          const response = await blogApi.getCurrentUser();
          setUser(response.data);
        } catch (err) {
          console.error('加载用户信息失败:', err);
          authUtils.clearAuthTokens();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  // 登录处理
  const login = async (credentials) => {
    setError(null);
    try {
      const response = await blogApi.login(credentials);
      authUtils.setAuthTokens(response.data.access, response.data.refresh);
      setUser(response.data.user);
      return true;
    } catch (err) {
      setError(err.response?.data?.detail || '登录失败。请检查您的凭据。');
      return false;
    }
  };

  // 注册处理
  const register = async (userData) => {
    setError(null);
    try {
      await blogApi.register(userData);
      // 自动登录
      return await login({
        username: userData.username,
        password: userData.password
      });
    } catch (err) {
      const errorMessages = err.response?.data;
      if (errorMessages) {
        // 格式化错误信息
        const formattedErrors = Object.keys(errorMessages)
          .map((key) => `${key}: ${errorMessages[key].join(' ')}`)
          .join('\n');
        setError(formattedErrors);
      } else {
        setError('注册失败。请稍后再试。');
      }
      return false;
    }
  };

  // 登出处理
  const logout = async () => {
    try {
      await blogApi.logout();
    } catch (err) {
      console.error('登出API调用失败', err);
    } finally {
      authUtils.clearAuthTokens();
      setUser(null);
    }
  };

  // 密码重置处理
  const resetPassword = async (email) => {
    setError(null);
    try {
      await blogApi.resetPassword(email);
      return true;
    } catch (err) {
      setError(err.response?.data?.detail || '密码重置请求失败。请稍后再试。');
      return false;
    }
  };

  // 密码重置确认处理
  const resetPasswordConfirm = async (data) => {
    setError(null);
    try {
      await blogApi.resetPasswordConfirm(data);
      return true;
    } catch (err) {
      setError(err.response?.data?.detail || '密码重置失败。请稍后再试。');
      return false;
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    register,
    resetPassword,
    resetPasswordConfirm,
    isAuthenticated: authUtils.isAuthenticated()
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 自定义Hook，便于组件使用认证上下文
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};