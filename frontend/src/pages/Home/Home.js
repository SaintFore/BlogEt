import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="home-page">
      <section className="hero-section">
        <h1 className="hero-title">欢迎来到我的博客</h1>
        <p className="hero-subtitle">分享想法，探索世界</p>
        <div className="hero-buttons">
          <a href="/blog" className="btn btn-primary">浏览文章</a>
          <a href="/about" className="btn btn-outline">关于我</a>
        </div>
      </section>
      
      <section className="featured-posts">
        <h2 className="section-title">精选文章</h2>
        <div className="posts-placeholder">
          <div className="post-card">
            <div className="post-card-image placeholder"></div>
            <div className="post-card-content">
              <h3 className="post-card-title">示例文章标题</h3>
              <p className="post-card-excerpt">
                这里将会显示文章的摘要内容。当 API 连接成功后，这里将展示真实的博客文章。
              </p>
              <div className="post-card-meta">
                <span className="post-card-date">2025年3月15日</span>
                <span className="post-card-category">技术</span>
              </div>
            </div>
          </div>
          
          <div className="post-card">
            <div className="post-card-image placeholder"></div>
            <div className="post-card-content">
              <h3 className="post-card-title">另一篇示例文章</h3>
              <p className="post-card-excerpt">
                完成用户认证和文章管理功能后，这里将展示从后端获取的实际数据。
              </p>
              <div className="post-card-meta">
                <span className="post-card-date">2025年3月10日</span>
                <span className="post-card-category">生活</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="categories-section">
        <h2 className="section-title">博客分类</h2>
        <div className="categories-container">
          <div className="category-tag">技术</div>
          <div className="category-tag">生活</div>
          <div className="category-tag">旅行</div>
          <div className="category-tag">美食</div>
          <div className="category-tag">读书</div>
        </div>
      </section>
    </div>
  );
}

export default Home;