# Vibe Site - 让你更了解你自己

个性化占卜测试平台，通过出生日期、血型、塔罗牌等维度提供人生指引。

## 技术栈

**前端：** React 18 + Vite + TailwindCSS + Framer Motion + i18next  
**后端：** Node.js + Express + Prisma + PostgreSQL  

## 快速开始

### 后端

```bash
cd backend
npm install
cp .env.example .env
# 编辑 .env 配置数据库
npm run prisma:migrate
npm run dev
```

### 前端

```bash
cd frontend
npm install
npm run dev
```

访问 http://localhost:3000

## 功能

- ✅ 匿名测试（基于设备 ID）
- ✅ 塔罗牌抽牌
- ✅ 个性化报告生成
- ✅ 历史记录
- ✅ 中英文切换
- 🚧 用户注册/登录（待完善）

## 开发计划

查看 [MVP.md](./MVP.md) 了解详细需求和开发计划。

## License

MIT
