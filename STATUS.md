# vibe-site 项目状态

**最后更新：** 2026-03-22  
**项目地址：** https://vibemirror.shop  
**负责人：** 蝎子

---

## 当前状态：🟡 等待 PayPal 正式账号审核

PayPal 正式账号显示 `PAYEE_ACCOUNT_RESTRICTED`，需要完成商家认证后才能收款。  
代码和配置均已就绪，审核通过后无需改代码，直接可用。

---

## 服务器信息

| 项目 | 路径 |
|------|------|
| 服务器 IP | 170.106.104.250 |
| 服务器用户 | ubuntu |
| 前端代码 | `/home/ubuntu/vibe-site/frontend/` |
| 后端代码 | `/home/ubuntu/vibe-site/backend/` |
| 前端静态文件 | `/home/ubuntu/vibe-site/frontend/dist/` |
| 数据库文件 | `/home/ubuntu/vibe-site/backend/dev.db` |
| 工作区备份 | `/root/.openclaw/agents/coding-agent/workspace/vibe-site/` |

---

## 进程管理

```bash
# 查看后端进程
ps aux | grep "vibe-site/backend/src/index.js"

# 重启后端
kill <PID>
su ubuntu -c "cd /home/ubuntu/vibe-site/backend && nohup node src/index.js > /home/ubuntu/vibe.log 2>&1 &"

# 查看后端日志
tail -f /home/ubuntu/vibe.log
```

---

## 环境配置

### 后端 `/home/ubuntu/vibe-site/backend/.env`

```
PORT=3002
DATABASE_URL="file:./dev.db"
JWT_SECRET="vibe-site-secret-key-2026"
GOOGLE_CLIENT_ID=685986878598-...
PAYPAL_CLIENT_ID=AZmqZmKm0xRJb8mI...   ← 正式环境
PAYPAL_SECRET=EBLK6JLSMhYCQrB-...       ← 正式环境
PAYPAL_MODE=live                          ← 已切换正式
SITE_URL=https://vibemirror.shop
```

### 前端（已打包进 dist）

- PayPal Client ID 已直接替换进打包 JS（正式环境）
- API 地址：`VITE_API_BASE_URL=https://vibemirror.shop`
- Google Client ID：`685986878598-15s935783q96d7v7fdl4g2ar6451qgvo.apps.googleusercontent.com`

---

## 技术栈

| 层 | 技术 |
|----|------|
| 前端 | React 18 + Vite + TailwindCSS + Framer Motion + i18next |
| 后端 | Node.js + Express + Prisma + SQLite |
| 认证 | Google OAuth（JWT） |
| 支付 | PayPal（正式环境，等待审核） |
| 部署 | 自建服务器 + Nginx 反向代理 |

---

## 已完成功能 ✅

- 首页（动画 + 渐变风格）
- 测试流程：信息收集 → 抽牌 → 结果报告
- 历史记录（按 deviceId 关联）
- 个人中心（Google 登录）
- 定价页（三档套餐：$1.9 / $9.9 / $19.9）
- PayPal 支付集成（订单创建/确认/次数充值）
- 中英文切换（i18next）
- 匿名用户支持（deviceId）
- 次数控制（credits）

---

## 待完成 / 待处理 🔧

- [ ] **PayPal 商家账号审核**（最高优先级，审核通过即可收款）
- [ ] 支付成功后前端实时更新用户 credits 显示
- [ ] 社交分享功能
- [ ] 每日运势推送（V1.1）
- [ ] AI 动态生成报告，接入 GPT API（V1.2）

---

## 已知问题 / 历史记录

| 日期 | 问题 | 解决方案 |
|------|------|----------|
| 2026-03-22 | PayPal capture 返回 404 | vite.config.js 加 proxy，开发环境 /api 转发到 3002 |
| 2026-03-22 | 前端 Client ID 硬编码 | 改为 VITE_PAYPAL_CLIENT_ID 环境变量 |
| 2026-03-22 | Order.userId 非 nullable 导致匿名购买报错 | Prisma migrate 改为 String? |
| 2026-03-22 | 线上 .env 缺少 PAYPAL_SECRET | 手动补填 /home/ubuntu/vibe-site/backend/.env |
| 2026-03-22 | 正式环境 PAYEE_ACCOUNT_RESTRICTED | 等待 PayPal 商家认证审核 |
