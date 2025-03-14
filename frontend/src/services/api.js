import axios from 'axios';

// 创建axios实例
const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
    ? '/api' // 生产环境API路径
    : 'http://localhost:8000/api', // 开发环境API路径
});

// 请求拦截器，用于添加认证信息等
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 封装API请求
export const blogApi = {
  // 获取博客文章列表
  getPosts: (page = 1) => api.get(`/posts/?page=${page}`),
  
  // 获取单篇文章详情
  getPost: (id) => api.get(`/posts/${id}/`),
  
  // 获取分类列表
  getCategories: () => api.get('/categories/'),
  
  // 用户认证
  login: (credentials) => api.post('/auth/login/', credentials),
  register: (userData) => api.post('/auth/register/', userData),
};

export default api;