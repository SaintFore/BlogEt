import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-waves">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="#355C7D" fillOpacity="0.2" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,234.7C960,235,1056,181,1152,170.7C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      <div className="footer-content">
        <div className="footer-section">
          <h4>关于 BlogEt</h4>
          <p>BlogEt是一个优雅的个人博客系统，专注于为创作者提供简洁而强大的写作平台，让思想与知识自由流动。</p>
          <div className="footer-features">
            <div className="feature-item">
              <span className="feature-icon">✨</span>
              <span>优雅简洁的设计</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📱</span>
              <span>响应式布局</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🚀</span>
              <span>高性能体验</span>
            </div>
          </div>
        </div>
        
        <div className="footer-section">
          <h4>博客统计</h4>
          <div className="stats-container">
            <div className="stat-item">
              <div className="stat-value">58</div>
              <div className="stat-label">文章数</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">12</div>
              <div className="stat-label">分类数</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">124</div>
              <div className="stat-label">标签数</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">13,579</div>
              <div className="stat-label">总访问量</div>
            </div>
          </div>
        </div>
        
        <div className="footer-section">
          <h4>最新文章</h4>
          <ul className="recent-posts">
            <li>
              <Link to="/blog/post-1">
                <span className="post-title">如何构建高性能React应用</span>
                <span className="post-date">2025-03-15</span>
              </Link>
            </li>
            <li>
              <Link to="/blog/post-2">
                <span className="post-title">Python与数据科学的完美结合</span>
                <span className="post-date">2025-03-10</span>
              </Link>
            </li>
            <li>
              <Link to="/blog/post-3">
                <span className="post-title">人工智能在现代生活中的应用</span>
                <span className="post-date">2025-03-05</span>
              </Link>
            </li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>联系与订阅</h4>
          <div className="contact-methods">
            <div className="contact-item">
              <span className="contact-icon">📧</span>
              <span>contact@bloget.com</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">🌍</span>
              <span>www.bloget.com</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📱</span>
              <span>+86 123 4567 8901</span>
            </div>
          </div>
          <div className="newsletter">
            <p>订阅我们的新文章提醒</p>
            <div className="newsletter-form">
              <input type="email" placeholder="请输入您的邮箱" />
              <button type="submit">订阅</button>
            </div>
          </div>
        </div>
      </div>

      <div className="social-bar">
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-icon github">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon twitter">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
          </svg>
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon linkedin">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon instagram">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </a>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} BlogEt - 您的数字花园</p>
        <div className="footer-links">
          <Link to="/privacy">隐私政策</Link>
          <span className="link-divider">•</span>
          <Link to="/terms">使用条款</Link>
          <span className="link-divider">•</span>
          <Link to="/sitemap">网站地图</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;