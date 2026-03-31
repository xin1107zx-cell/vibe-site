# Cloudflare Pages 部署信息

**部署时间：** 2026-03-31 14:45

---

## 项目信息

| 项目 | 值 |
|------|------|
| **项目名称** | vibemirror |
| **项目 ID** | 4c5beaca-c5f3-4903-af31-bef41faa90e4 |
| **Cloudflare 账户 ID** | 4a01fb9898915faae543c0a743bca47a |
| **默认域名** | vibemirror-7lc.pages.dev |
| **自定义域名** | vibemirror.shop（绑定中） |

---

## 部署地址

- **最新部署**: https://e8020abb.vibemirror-7lc.pages.dev
- **生产环境**: https://vibemirror-7lc.pages.dev
- **自定义域名**: https://vibemirror.shop（DNS 生效后）

---

## API Token（已保存，勿泄露）

```
Token: cfut_xcckVEESronVN4GxtYYi4tgptTVLG9ff1GYjSy9o374e4250
权限: Cloudflare Pages - Edit
```

⚠️ **安全提醒**：此 Token 已在群聊中出现，建议定期轮换。

---

## 部署命令

### 手动部署
```bash
cd vibe-site/frontend
npm run build
export CLOUDFLARE_API_TOKEN="cfut_xcckVEESronVN4GxtYYi4tgptTVLG9ff1GYjSy9o374e4250"
export CLOUDFLARE_ACCOUNT_ID="4a01fb9898915faae543c0a743bca47a"
wrangler pages deploy dist --project-name=vibemirror
```

### 查看部署历史
```bash
wrangler pages deployment list --project-name=vibemirror
```

---

## DNS 配置（需要手动操作）

如果 `vibemirror.shop` 还未生效，需要在域名 DNS 设置中添加：

```
类型: CNAME
名称: @（或 vibemirror.shop）
目标: vibemirror-7lc.pages.dev
代理: 开启（橙色云朵）
```

---

## 环境变量（前端构建时）

前端使用的环境变量（已打包进 dist）：

```env
VITE_GOOGLE_CLIENT_ID=685986878598-15s935783q96d7v7fdl4g2ar6451qgvo.apps.googleusercontent.com
VITE_API_BASE_URL=https://vibemirror.shop
VITE_PAYPAL_CLIENT_ID=AfumbvylfxbD_hP3UAwsPb4O9pEGoDnuW0TaNVHq780HexGJ9SVb1P2FJ2shmLSqXLyZGjf_ZcEWIQgk
```

⚠️ **注意**：后端 API 仍在 170.106.104.250 服务器上运行，前端通过 `https://vibemirror.shop/api` 访问。

---

## 后端 API（未迁移）

后端仍在原服务器：
- 服务器：170.106.104.250
- 路径：/home/ubuntu/vibe-site/backend/
- 端口：3002
- Nginx 反向代理：`/api` → `http://localhost:3002`

---

## GitHub 集成（可选）

如需 GitHub 自动部署：
1. 登录 https://dash.cloudflare.com
2. Pages → vibemirror → Settings → Builds & deployments
3. 点击「Connect to Git」
4. 授权 GitHub 并选择仓库
5. 配置构建参数：
   - 构建命令：`npm run build`
   - 输出目录：`dist`
   - 根目录：`frontend`

---

## 状态

✅ 前端已部署到 Cloudflare Pages  
✅ 默认域名可访问：https://e8020abb.vibemirror-7lc.pages.dev  
🔄 自定义域名绑定中：vibemirror.shop  
⚠️ 后端仍在原服务器，未迁移  
⚠️ PayPal 支付功能已注释（前端改为免费领取）
