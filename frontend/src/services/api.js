import axios from 'axios';

// 创建axios实例
const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production'
    ? '/api' // 生产环境API路径
    : 'http://localhost:8000/api', // 开发环境API路径
});

// 请求拦截器，用于添加认证信息等
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器，处理token过期等情况
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // 如果是401错误且不是刷新token的请求
    if (error.response.status === 401 && !originalRequest._retry && originalRequest.url !== '/auth/token/refresh/') {
      originalRequest._retry = true;
      
      try {
        // 尝试刷新token
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post('http://localhost:8000/api/auth/token/refresh/', {
          refresh: refreshToken
        });
        
        // 更新本地存储的token
        localStorage.setItem('token', response.data.access);
        
        // 更新原始请求的头部并重新发送
        originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
        return axios(originalRequest);
      } catch (error) {
        // 刷新失败，可能需要重新登录
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(error);
      }
    }
    
    return Promise.reject(error);
  }
);

// 封装API请求
export const apiService = {
  // 用户认证
  login: (credentials) => api.post('/login/', credentials),
  register: (userData) => api.post('/register/', userData),
  logout: () => {
    const refreshToken = localStorage.getItem('refreshToken');
    return api.post('/logout/', { refresh: refreshToken });
  },
  resetPassword: (email) => api.post('/password-reset/', { email }),
  resetPasswordConfirm: (data) => api.post('/password-reset-confirm/', data),
  getCurrentUser: () => api.get('/me/'),
  refreshToken: (refresh) => api.post('/token/refresh/', { refresh }),
  
  // 获取博客文章列表
  getPosts: (page = 1, pageSize = 10) => api.get(`/posts/?page=${page}&page_size=${pageSize}`),

  // 获取单篇文章详情
  getPost: (slug) => api.get(`/posts/${slug}/`),
  
  // 添加缺少的博客文章API
  createPost: (postData) => api.post('/posts/', postData),
  updatePost: (slug, postData) => api.put(`/posts/${slug}/`, postData),
  deletePost: (slug) => api.delete(`/posts/${slug}/`),
  
  // 获取分类列表
  getCategories: () => api.get('/categories/'),
  
  // 添加缺少的标签API
  getTags: () => api.get('/tags/'),
  
  // 添加按分类和标签查询的API
  getPostsByCategory: (slug, page = 1) => api.get(`/posts/by-category/${slug}/?page=${page}`),
  getPostsByTag: (slug, page = 1) => api.get(`/posts/by-tag/${slug}/?page=${page}`),
  
  // 添加获取最新文章的API
  getLatestPosts: () => api.get('/posts/latest/'),
};

// 身份验证工具函数
export const authUtils = {
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  setAuthTokens: (accessToken, refreshToken) => {
    localStorage.setItem('token', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  },

  clearAuthTokens: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  },

  getAuthHeader: () => {
    const token = localStorage.getItem('token');
    return token ? `Bearer ${token}` : null;
  }
};

export default api;