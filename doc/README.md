# Sui Agi 开发文档

欢迎使用 Sui Agi！本项目是一个基于 Next.js、TypeScript、shadcn/ui、tRPC、Zustand、Tauri 等现代技术栈构建的多端钱包应用。

## 文档导航
- [项目总览](./PROJECT_SUMMARY.md)
- [开发环境搭建](#开发环境搭建)
- [主要技术说明](#主要技术说明)
- [目录结构说明](#目录结构说明)
- [贡献指南](#贡献指南)

---

## 开发环境搭建

1. **安装依赖**
   - 推荐使用 [bun](https://bun.sh/) 进行依赖管理：
     ```bash
     bun install
     ```
   - 也可使用 npm/yarn/pnpm：
     ```bash
     npm install
     # 或 yarn install
     # 或 pnpm install
     ```
2. **启动开发服务器**
   ```bash
   bun dev
   # 或 npm run dev
   ```
   默认端口为 3333。

3. **构建与启动**
   ```bash
   bun run build
   bun run start
   ```

4. **代码检查与格式化**
   ```bash
   bun run lint
   ```

---

## 主要技术说明

- **Next.js**：前端框架，支持 SSR/CSR。
- **shadcn/ui + Tailwind CSS**：现代 UI 组件与样式。
- **Zustand**：轻量级状态管理。
- **tRPC**：类型安全的前后端通信。
- **i18next**：国际化支持。
- **next-themes**：主题切换。
- **Tauri**：桌面端支持。
- **Mastra Agent**：后端智能代理框架。

---

## 目录结构说明

详见 [项目总览](./PROJECT_SUMMARY.md)。

---

## 贡献指南

- 遵循 TypeScript + 函数式 + 模块化风格。
- 目录与文件命名规范：小写短横线目录，PascalCase 组件。
- 提交信息规范：Commitlint + cz-git。
- 依赖管理推荐 bun。

如需详细 API、组件用法、后端接口等文档，请在 doc 目录下查找对应文档。
