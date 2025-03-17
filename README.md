# BlogEt - 现代个人博客系统

BlogEt是一个基于Django和React构建的现代个人博客系统，提供优雅的界面和强大的内容管理功能。

## ✅ 已实现功能

### 阶段一：环境搭建与基础框架 ✓
- 完整的Django后端环境配置
- React前端应用搭建
- RESTful API设计与实现
- CORS跨域支持

### 阶段二：核心博客功能
- ✓ 用户认证系统（登录、注册、注销、密码重置）
- ✓ 文章管理（创建、读取、更新、删除）
- ✓ 分类与标签系统
- ⚠️ 后台管理界面（部分完成）
  - ✓ Django Admin配置
  - ✓ Markdown编辑器
  - ❌ 管理仪表板

## 🛠️ 技术栈

### 前端
- React 18
- React Router v6
- Axios
- Context API (状态管理)
- CSS3 (响应式设计)

### 后端
- Django 4/5
- Django REST Framework
- JWT认证
- SQLite (开发环境)

## 🎈 前端结构

```
frontend/
├── public/
├── src/
│   ├── assets/         # 图片、图标等静态资源
│   ├── components/     # 可复用组件
│   │   ├── common/     # 通用组件（按钮、输入框等）
│   │   │   ├── Button.js
│   │   │   ├── Input.js
│   │   │   ├── Modal.js
│   │   │   └── Card.js
│   │   ├── layout/     # 布局组件（导航栏、页脚等）
│   │   │   ├── Navbar.js
│   │   │   ├── Footer.js
│   │   │   ├── Sidebar.js
│   │   │   └── Layout.js
│   │   └── blog/       # 博客相关组件
│   │       └── PostCard.js  # 文章卡片组件
│   ├── hooks/          # 自定义React hooks
│   ├── pages/          # 页面组件
│   │   ├── Home/       # 首页
│   │   │   ├── Home.js
│   │   │   └── Home.css
│   │   ├── Blog/       # 博客相关页面
│   │   │   ├── BlogList.js  # 文章列表页
│   │   │   ├── BlogPost.js  # 文章详情页
│   │   │   ├── BlogEditor.js # 文章编辑页
│   │   │   ├── BlogList.css
│   │   │   └── BlogPost.css
│   │   └── Auth/       # 认证相关页面
│   │       ├── Login.js
│   │       ├── Register.js
│   │       └── ResetPassword.js
│   ├── services/       # API服务
│   │   └── api.js      # 封装API请求
│   ├── utils/          # 工具函数
│   │   └── authUtils.js # 认证辅助函数
│   ├── context/        # React上下文
│   │   └── AuthContext.js # 认证上下文
│   ├── App.js          # 应用根组件
│   ├── index.js        # 入口文件
│   └── routes.js       # 路由配置
```

## ✨ 后端结构

```
backend/                   # Django后端项目根目录
├── accounts/              # 用户账户应用
│   ├── __init__.py
│   ├── admin.py           # 管理界面配置
│   ├── apps.py
│   ├── models.py          # 用户模型定义
│   ├── serializers.py     # 用户数据序列化器
│   ├── urls.py            # 用户相关URL路由
│   └── views.py           # 用户认证API视图
├── blog/                  # 博客应用
│   ├── __init__.py
│   ├── admin.py           # 博客管理界面配置
│   ├── apps.py
│   ├── models.py          # 博客模型定义（文章、分类、标签）
│   ├── serializers.py     # 博客数据序列化器
│   ├── tests.py
│   ├── urls.py            # 博客API路由配置
│   └── views.py           # 博客API视图和逻辑
├── asgi.py                # ASGI应用入口
├── urls.py                # 项目主URL配置
├── wsgi.py                # WSGI应用入口
└── settings.py            # 项目设置(数据库、中间件等)
```

## 🚀 运行项目

### 后端
1. 进入项目目录：`cd BlogEt`
2. 激活虚拟环境（如果有）：`source venv/bin/activate`（Windows: `venv\Scripts\activate`）
3. 安装依赖：`pip install -r requirements.txt`
4. 运行数据库迁移：`python manage.py migrate`
5. 启动服务器：`python manage.py runserver`

### 前端
1. 进入前端目录：`cd frontend`
2. 安装依赖：`npm install`
3. 启动开发服务器：`npm start`

## 📝 开发计划

目前已完成前两个阶段的大部分任务，正在进行第二阶段的最后任务"后台管理界面"的实现。

## 📜 许可证

[MIT](LICENSE)