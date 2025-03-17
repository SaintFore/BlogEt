import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { apiService } from '../../services/api';
import './BlogPost.css';

function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    setLoading(true);
    try {
      const response = await apiService.getPost(slug);
      setPost(response.data);
      
      // 检查当前用户是否是文章作者
      const currentUser = JSON.parse(localStorage.getItem('user'));
      if (currentUser && response.data.author.id === currentUser.id) {
        setIsOwner(true);
      }
      
      setError(null);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError('文章不存在或已被删除');
      } else {
        setError('加载文章失败，请稍后再试');
      }
      console.error('获取文章详情失败', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    navigate(`/blog/edit/${slug}`);
  };

  const handleDelete = async () => {
    if (!window.confirm('确定要删除这篇文章吗？此操作不可撤销。')) {
      return;
    }
    
    try {
      await apiService.deletePost(slug);
      navigate('/blog');
    } catch (err) {
      console.error('删除文章失败', err);
      alert('删除文章失败，请稍后再试');
    }
  };

  // 格式化日期
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  if (loading) {
    return <div className="loading">正在加载文章...</div>;
  }

  if (error) {
    return (
      <div className="post-error-container">
        <div className="post-error">
          <h2>出错了</h2>
          <p>{error}</p>
          <Link to="/blog" className="btn btn-primary">返回博客列表</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-post-page">
      {post && (
        <>
          <div className="post-header">
            <div className="container">
              <div className="post-meta-top">
                {post.category && (
                  <Link to={`/categories/${post.category.slug}`} className="post-category">
                    {post.category.name}
                  </Link>
                )}
                <span className="post-date">{formatDate(post.published_at)}</span>
              </div>
              
              <h1 className="post-title">{post.title}</h1>
              
              <div className="post-meta">
                <div className="post-author">
                  <div className="author-avatar">
                    {/* 如果有头像，可以在这里显示 */}
                    <div className="author-avatar-placeholder">
                      {post.author.username.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <div className="author-info">
                    <span className="author-name">{post.author.username}</span>
                    <span className="post-views">
                      <i className="far fa-eye"></i> {post.view_count} 阅读
                    </span>
                  </div>
                </div>
                
                {isOwner && (
                  <div className="post-actions">
                    <button onClick={handleEdit} className="post-action-button edit-button">
                      <i className="fas fa-edit"></i> 编辑
                    </button>
                    <button onClick={handleDelete} className="post-action-button delete-button">
                      <i className="fas fa-trash"></i> 删除
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="container">
            <div className="post-content">
              {/* 使用dangerouslySetInnerHTML需要注意XSS风险，生产环境应该使用安全的HTML解析库 */}
              <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
            </div>
            
            {post.tags && post.tags.length > 0 && (
              <div className="post-tags">
                <span className="tags-title">标签：</span>
                {post.tags.map(tag => (
                  <Link key={tag.id} to={`/tags/${tag.slug}`} className="post-tag">
                    {tag.name}
                  </Link>
                ))}
              </div>
            )}
            
            <div className="post-footer">
              <div className="post-nav">
                <Link to="/blog" className="post-nav-link">
                  <i className="fas fa-arrow-left"></i> 返回文章列表
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default BlogPost;