import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PostCard from '../../components/blog/PostCard';
import { apiService } from '../../services/api';
import './BlogList.css';

function BlogList() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
    fetchPosts();
  }, [currentPage, activeCategory]);

  const fetchCategories = async () => {
    try {
      const response = await apiService.getCategories();
      setCategories(response.data);
    } catch (err) {
      console.error('获取分类失败', err);
    }
  };

  const fetchPosts = async () => {
    setLoading(true);
    try {
      let response;
      if (activeCategory) {
        response = await apiService.getPostsByCategory(activeCategory, currentPage);
      } else {
        response = await apiService.getPosts(currentPage);
      }
      
      setPosts(response.data.results);
      setTotalPages(Math.ceil(response.data.count / 10)); // 假设每页10篇文章
      setError(null);
    } catch (err) {
      setError('获取文章失败，请稍后再试');
      console.error('获取文章失败', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (slug) => {
    setActiveCategory(slug === activeCategory ? null : slug);
    setCurrentPage(1); // 重置到第一页
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); // 滚动到页面顶部
  };

  // 生成分页按钮
  const renderPagination = () => {
    const pages = [];
    
    // 省略号函数
    const ellipsis = (key) => <span key={key} className="pagination-ellipsis">...</span>;
    
    // 始终显示第一页
    pages.push(
      <button 
        key={1} 
        onClick={() => handlePageChange(1)}
        className={currentPage === 1 ? 'pagination-button active' : 'pagination-button'}
      >
        1
      </button>
    );
    
    // 显示当前页附近的页码
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);
    
    // 添加前部省略号
    if (startPage > 2) pages.push(ellipsis('start-ellipsis'));
    
    // 添加中间页码
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button 
          key={i} 
          onClick={() => handlePageChange(i)}
          className={currentPage === i ? 'pagination-button active' : 'pagination-button'}
        >
          {i}
        </button>
      );
    }
    
    // 添加后部省略号
    if (endPage < totalPages - 1) pages.push(ellipsis('end-ellipsis'));
    
    // 显示最后一页（如果总页数大于1）
    if (totalPages > 1) {
      pages.push(
        <button 
          key={totalPages} 
          onClick={() => handlePageChange(totalPages)}
          className={currentPage === totalPages ? 'pagination-button active' : 'pagination-button'}
        >
          {totalPages}
        </button>
      );
    }
    
    return pages;
  };

  return (
    <div className="blog-list-page">
      <div className="page-header blog-header">
        <div className="container">
          <h1 className="page-title">博客文章</h1>
          <p className="page-description">探索各种话题的精彩内容，了解最新技术和见解。</p>
        </div>
      </div>

      <div className="container">
        {/* 分类过滤器 */}
        <div className="category-filter">
          <button 
            className={`category-filter-button ${activeCategory === null ? 'active' : ''}`}
            onClick={() => handleCategoryClick(null)}
          >
            全部
          </button>
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-filter-button ${activeCategory === category.slug ? 'active' : ''}`}
              onClick={() => handleCategoryClick(category.slug)}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* 写作按钮（如果用户已登录） */}
        {localStorage.getItem('token') && (
          <div className="write-post-button-container">
            <Link to="/blog/create" className="btn btn-primary write-post-button">
              <i className="fas fa-pencil-alt"></i> 写文章
            </Link>
          </div>
        )}

        {loading ? (
          <div className="loading">加载文章中...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : posts.length > 0 ? (
          <>
            <div className="posts-grid">
              {posts.map(post => (
                <div key={post.id} className="post-grid-item">
                  <PostCard post={post} />
                </div>
              ))}
            </div>
            
            {/* 分页控件 */}
            {totalPages > 1 && (
              <div className="pagination">
                <button 
                  className="pagination-arrow" 
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  &larr; 上一页
                </button>
                
                <div className="pagination-numbers">
                  {renderPagination()}
                </div>
                
                <button 
                  className="pagination-arrow" 
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  下一页 &rarr;
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">📝</div>
            <h3>暂无文章</h3>
            <p>当前分类下还没有文章发布，请稍后再来查看。</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogList;