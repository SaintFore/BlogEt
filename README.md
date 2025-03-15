# Blog System Et

## 🎈 FrontEnd Struture

```
frontend/
├── public/
├── src/
│   ├── assets/         # 图片、图标等静态资源
│   ├── components/     # 可复用组件
│   │   ├── common/     # 通用组件（按钮、输入框等）
|   |   |   ├── Button.js
|   |   |   ├── Input.js
│   │   |   ├── Modal.js
│   │   |   └── Card.js
│   │   ├── layout/     # 布局组件（导航栏、页脚等）
│   │   |   ├── Navbar.js
│   │   |   ├── Footer.js
│   │   |   ├── Sidebar.js
│   │   |   └── Layout.js
│   │   └── blog/       # 博客相关组件
│   ├── hooks/          # 自定义React hooks
│   ├── pages/          # 页面组件
│   │   ├── Home.js
│   │   ├── Login.js
│   │   ├── Register.js
│   │   ├── BlogPost.js
│   │   └── Dashboard.js
│   ├── services/       # API服务
│   │   └── api.js      # 封装API请求
│   ├── utils/          # 工具函数
│   ├── context/        # React上下文（如认证上下文）
│   ├── App.js          # 应用根组件
│   ├── index.js        # 入口文件
│   └── routes.js       # 路由配置
```

## ✨ BackEnd Struture

```
backend\                    # Django后端项目根目录
├── blog\                   # 博客应用
│   ├── __init__.py
│   ├── admin.py            # 管理界面配置
│   ├── apps.py
│   ├── models.py           # 数据库模型定义
│   ├── serializers.py      # DRF序列化器
│   ├── tests.py
│   ├── urls.py             # 应用URL路由配置
│   └── views.py            # API视图和逻辑
├── asgi.py                 # ASGI应用入口
├── urls.py                 # 项目主URL配置
└── settings.py             # 项目设置(数据库、中间件等)

```