import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>关于博客</h4>
          <p>这是一个使用Django和React构建的个人博客系统。</p>
        </div>
        <div className="footer-section">
          <h4>联系方式</h4>
          <p>邮箱：example@example.com</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} 我的博客 | 保留所有权利</p>
      </div>
    </footer>
  );
}

export default Footer;