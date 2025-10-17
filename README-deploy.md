# 部署说明（Docker / Netlify / Vercel）

此文件说明如何把 `my-genome-app` 部署到常见平台。

## 1. 本地构建

安装依赖并本地构建：

```bash
cd my-genome-app
npm install
npm run build
```

构建后静态文件位于 `dist/`。

## 2. Docker（生产镜像）

构建镜像并运行：

```bash
docker build -t chicken-sv-app .
docker run -p 8080:80 chicken-sv-app
```

访问：http://localhost:8080

## 3. Netlify

1. 将代码推送到 GitHub。2. 在 Netlify 控制台导入仓库，设置构建命令 `npm run build`，发布目录 `dist`。3. 部署后 Netlify 会提供一个公网 URL。

Netlify 已包含一个 `netlify.toml` 文件以支持 SPA 路由（全部回退到 index.html）。

## 4. Vercel

在 Vercel 控制台导入 GitHub 仓库，构建命令 `npm run build`，输出目录 `dist`。Vercel 会自动生成域名并提供 HTTPS。

### Vercel 操作详解
1. 登录 https://vercel.com 并选择 "New Project" -> Import Git Repository，连接你的 GitHub 账号并选择仓库。
2. 在配置界面：
	- Framework Preset: (选择 Other 或 leave as detected)
	- Build Command: `npm run build`
	- Output Directory: `dist`
3. 可选：在 Vercel 项目设置中启用自动分支预览（默认），并在 Domains 中添加自定义域。
4. 部署完成后，Vercel 会提供部署 URL（例如 your-app.vercel.app），任何公网用户都可以访问。

我已在仓库添加 `vercel.json` 以优化静态文件缓存和 SPA 路由（可按需修改）。

### 使用 GitHub Actions 自动部署到 Vercel（已在仓库添加 workflow）

我已在仓库中添加 `.github/workflows/deploy-vercel.yml`，它会在每次 push 到 `main` 时构建并使用 Vercel Action 将站点部署到 Vercel。

要使 workflow 成功运行，你需要在 GitHub 仓库的 Settings -> Secrets 中添加以下三个 secrets：

- `VERCEL_TOKEN`：在 Vercel 账户设置 -> Tokens 中创建（Personal Access Token）。
- `VERCEL_ORG_ID`：你的 Vercel 组织或个人帐户 ID（在 Vercel 仪表盘的团队/个人设置里可以看到）。
- `VERCEL_PROJECT_ID`：在 Vercel 项目设置 -> General -> Project ID 可以找到。

步骤概述：
1. 在 Vercel 控制台创建项目（或在导入仓库时由 Vercel 自动创建）。
2. 在 Vercel 用户设置中创建一个 Personal Access Token（复制 token）。
3. 在 Vercel 项目设置中查看 Project ID，以及你的 Org ID（团队或个人）。
4. 在 GitHub 仓库 Settings -> Secrets -> Actions 新建三个 Secrets：`VERCEL_TOKEN`、`VERCEL_ORG_ID`、`VERCEL_PROJECT_ID`，并把对应值粘贴进去。
5. Push 到 `main`（或已存在的 commit 会自动触发）。GitHub Actions 会运行并将构建部署到 Vercel（详见 Actions 运行日志）。

如果你需要，我可以帮助你找到 Vercel 上的 Org/Project ID（提供项目的 Vercel URL 或让我知道你已创建项目）。

## 5. 注意事项

- 如果 CSV 很大，建议放到对象存储（如 S3）并使用 CDN，或将其改为后端 API 供按需查询。
- 若要限制访问，请在前面放置反向代理或使用托管平台的身份认证服务。
