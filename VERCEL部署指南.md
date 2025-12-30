# Vercel 部署指南

## 🔧 修复 404 错误

您遇到的 404 错误已经修复！我已经创建了 `vercel.json` 配置文件。

### 问题原因
Vercel 默认不知道如何处理单页应用（SPA）的路由，所以当访问根路径以外的任何路径时会返回 404。

### 解决方案
`vercel.json` 文件告诉 Vercel：
- 将所有请求重定向到 `index.html`
- 让 React Router 处理客户端路由

---

## 🚀 重新部署到 Vercel

### 方法一：通过 Git 重新部署（推荐）

如果您是通过 GitHub/GitLab 部署的：

```bash
cd "/Volumes/zwx/Antigravity/关键指标平台"

# 添加新的配置文件
git add vercel.json
git commit -m "Fix: Add vercel.json for SPA routing"
git push

# Vercel 会自动重新部署
```

### 方法二：使用 Vercel CLI 重新部署

```bash
# 如果还没安装 Vercel CLI
npm install -g vercel

# 登录 Vercel
vercel login

# 重新部署
cd "/Volumes/zwx/Antigravity/关键指标平台"
vercel --prod
```

### 方法三：删除项目重新部署

1. 在 Vercel Dashboard 删除现有项目
2. 重新导入项目（此时会读取 vercel.json）
3. 部署完成

---

## ✅ 验证部署

部署成功后，访问您的 Vercel URL，应该可以正常工作：

- ✅ 首页加载正常
- ✅ 刷新页面不会出现 404
- ✅ 所有路由都能正常访问

---

## 📋 Vercel 项目设置

在 Vercel 项目设置中，确保以下配置正确：

### Build & Development Settings
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Root Directory
- 保持为 `.`（项目根目录）

---

## 🎯 完整部署流程

### 首次部署到 Vercel

1. **准备项目**
   ```bash
   cd "/Volumes/zwx/Antigravity/关键指标平台"
   
   # 确保 vercel.json 存在
   ls vercel.json
   ```

2. **推送到 Git**（如果使用 Git）
   ```bash
   git init
   git add .
   git commit -m "Initial commit with Vercel config"
   
   # 推送到 GitHub
   git remote add origin YOUR_REPO_URL
   git push -u origin main
   ```

3. **在 Vercel 中导入**
   - 访问：https://vercel.com/new
   - 选择 "Import Git Repository"
   - 选择您的仓库
   - 点击 "Deploy"

4. **等待部署完成**
   - Vercel 会自动检测到 Vite 项目
   - 使用 `vercel.json` 中的配置
   - 生成部署 URL

---

## 🔍 常见问题

### Q: 部署后仍然 404
**A:** 清除 Vercel 缓存并重新部署：
```bash
vercel --prod --force
```

### Q: 构建失败
**A:** 检查本地是否能成功构建：
```bash
npm run build
```

### Q: 环境变量问题
**A:** 在 Vercel Dashboard 的项目设置中添加环境变量

### Q: 部署很慢
**A:** Vercel 可能在冷启动，首次部署会较慢，后续会更快

---

## 🌐 自定义域名

1. 在 Vercel Dashboard 进入项目
2. 点击 "Settings" → "Domains"
3. 添加自定义域名
4. 按照提示配置 DNS

---

## ⚡ 性能优化

Vercel 自动提供：
- ✅ 全球 CDN
- ✅ 自动 HTTPS
- ✅ Edge Functions
- ✅ 资源压缩
- ✅ 图片优化

---

## 🎉 快速命令

```bash
# 本地预览生产版本
npm run build
npm run preview

# 部署到 Vercel
vercel

# 部署到生产环境
vercel --prod

# 查看部署日志
vercel logs YOUR_DEPLOYMENT_URL
```

---

需要帮助？
- Vercel 文档：https://vercel.com/docs
- Vite 部署指南：https://vitejs.dev/guide/static-deploy.html
