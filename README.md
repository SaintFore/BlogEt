# Blog System Et

## 🎈 FrontEnd Struture

```
frontend/
├── public/
├── src/
│   ├── assets/         # 图片、图标等静态资源
│   ├── components/     # 可复用组件
│   │   ├── common/     # 通用组件（按钮、输入框等）
│   │   ├── layout/     # 布局组件（导航栏、页脚等）
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