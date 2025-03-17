import React from 'react';
import { Link } from 'react-router-dom';
import './PostCard.css';

function PostCard({ post }) {
  // 格式化日期
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="post-card">
      <div className="post-card-image">
        {/* 如果有缩略图，可以在这里显示 */}
        <div className="post-card-placeholder"></div>
      </div>
      <div className="post-card-content">
        <Link to={`/blog/${post.slug}`} className="post-card-title-link">
          <h3 className="post-card-title">{post.title}</h3>
        </Link>
        <p className="post-card-excerpt">{post.summary}</p>
        <div className="post-card-meta">
          <div className="post-meta-left">
            <span className="post-card-author">{post.author.username}</span>
            <span className="post-meta-separator">•</span>
            <span className="post-card-date">{formatDate(post.published_at)}</span>
          </div>
          <div className="post-meta-right">
            {post.category && (
              <Link to={`/categories/${post.category.slug}`} className="post-card-category">
                {post.category.name}
              </Link>
            )}
            <span className="post-card-views">
              <i className="far fa-eye"></i> {post.view_count}
            </span>
          </div>
        </div>
        {post.tags && post.tags.length > 0 && (
          <div className="post-card-tags">
            {post.tags.map(tag => (
              <Link key={tag.id} to={`/tags/${tag.slug}`} className="post-tag">
                {tag.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PostCard;