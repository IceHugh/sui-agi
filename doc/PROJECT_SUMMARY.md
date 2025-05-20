# 项目简介：Sui Agi

Sui Agi 是一个基于 Next.js、TypeScript、shadcn/ui、tRPC、Zustand、Tauri 等现代技术栈构建的多端钱包应用，支持 Web 和桌面端，具备账户管理、国际化、主题切换、类型安全 API、现代 UI/UX 等特性。

## 主要功能
- 多账户管理与切换
- 钱包操作与区块链交互（基于 Sui 区块链）
- 国际化（i18next，支持中英文）
- 主题切换（亮/暗模式，next-themes）
- 现代 UI 组件（shadcn/ui + Tailwind CSS）
- 类型安全 API 通信（tRPC）
- 状态管理（Zustand）
- 跨平台桌面端支持（Tauri）

## 技术栈
- **前端**：Next.js、React、TypeScript、shadcn/ui、Tailwind CSS、Zustand、tRPC、i18next、next-themes
- **后端**：Cloudflare Worker、tRPC、Mastra Agent 框架、LibSQL
- **桌面端**：Tauri（Rust）
- **工具库**：date-fns、radash、react-use、zod
- **开发工具**：Vite、Biome、Husky、Commitlint、cz-git

## 目录结构说明

```
/                 # 项目根目录
├─ src/           # 前端主目录
│  ├─ components/ # 组件（actions, common, providers, ui 等）
│  ├─ hooks/      # 自定义 hooks
│  ├─ lib/        # 工具库
│  ├─ types/      # 类型定义
│  ├─ stores/     # 状态管理
│  ├─ app/        # 页面
│  ├─ assets/     # 静态资源
│  ├─ utils/      # 工具函数
│  ├─ I18n/       # 国际化相关
│  └─ ...
├─ server/        # 后端服务（Cloudflare Worker, Mastra Agent, tRPC）
│  └─ src/mastra/ # 主要后端逻辑
├─ src-tauri/     # Tauri 桌面端
├─ public/        # 静态资源与国际化文件
├─ scripts/       # 辅助脚本
├─ README.md      # 项目说明
├─ package.json   # 依赖与脚本
├─ tsconfig.json  # TypeScript 配置
└─ ...
```

## 关键依赖
- next, react, typescript, tailwindcss, shadcn/ui, zustand, tRPC, i18next, next-themes, @mysten/dapp-kit, @iconify-icon/react, tauri, mastra, zod, date-fns, radash, react-use

## 运行与开发
- 前端开发：`bun dev` 或 `npm run dev`，默认端口 3333
- 构建：`bun run build` 或 `npm run build`
- 启动：`bun run start` 或 `npm run start`
- 代码检查：`bun run lint` 或 `npm run lint`

## 贡献与规范
- 代码风格：TypeScript + 函数式 + 模块化，目录与文件命名规范见上
- 提交规范：Commitlint + cz-git，自动化检查
- 依赖管理：bun

---
如需详细开发文档、API 说明、组件用法等，请参见 doc 目录下其他文档。
