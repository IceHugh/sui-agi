# Sui Agi 技术文档

## 技术架构概述

Sui Agi 是一个基于自然语言的 AI 钱包应用，采用现代化技术栈构建。本文档详细介绍项目的技术实现细节、架构设计和开发指南。

### 系统组件

![系统架构图](https://via.placeholder.com/800x400?text=Sui+Agent+Wallet+技术架构图)

#### 1. 前端层

- **框架**: Next.js + React + TypeScript
- **UI 组件**: shadcn/ui + Tailwind CSS
- **状态管理**: Zustand
- **国际化**: i18next
- **主题**: next-themes

#### 2. 智能助手层

- **对话引擎**: CopilotKit (React Core + UI)
- **AI 模型**: 基于 OpenAI 或其他大语言模型
- **自然语言处理**: CopilotKit Actions 系统

#### 3. 区块链集成层

- **钱包连接**: @mysten/dapp-kit
- **区块链交互**: Sui SDK
- **交易管理**: 自定义 hooks 和 actions

#### 4. 后端层

- **服务运行时**: Cloudflare Workers
- **API 通信**: tRPC
- **AI 代理**: Mastra Agent 框架
- **数据存储**: LibSQL

#### 5. 桌面应用层 (计划中)

- **框架**: Tauri (Rust)
- **打包**: 跨平台桌面应用

## 技术实现细节

### 前端实现

#### 目录结构

```
src/
├─ app/             # 页面路由
├─ components/      # 组件
│  ├─ actions/      # 钱包操作组件
│  ├─ ui/           # UI 基础组件
│  └─ providers/    # 上下文提供者
├─ hooks/           # 自定义钩子
├─ lib/             # 工具库
│  └─ actions/      # CopilotKit 动作定义
├─ stores/          # Zustand 状态存储
├─ utils/           # 工具函数
├─ config/          # 配置文件
├─ assets/          # 静态资源
├─ types/           # TypeScript 类型定义
└─ I18n/            # 国际化资源
```

#### 核心组件

1. **CopilotKit 集成**

```typescript
// src/components/providers/CopilotKitProvider.tsx
export const CopilotKitProvider = ({ children }: { children: React.ReactNode }) => {
  const currentAccount = useCurrentAccount();
  return <CopilotKit
    runtimeUrl="/api/copilotkit"
    headers={{
      "address": currentAccount?.address || "",
    }}
    agent="suiWalletAgent"
  >
    {children}
  </CopilotKit>;
};
```

2. **钱包操作 Actions**

```typescript
// src/lib/actions/useTransferTokenAction.tsx (简化示例)
export const useTransferTokenAction = () => {
  return useCopilotAction({
    name: "action_transfer_token",
    description: "转移用户的token到指定地址",
    parameters: [
      {
        name: "amount",
        type: "number",
        description: "转账金额",
        required: true,
      },
      // 其他参数...
    ],
    renderAndWaitForResponse: ({ args, respond, status }) => {
      return <TransferTokenCard
        onConfirm={(data) => {
          respond?.(data);
        }}
        onCancel={(error) => {
          respond?.(error || "cancel");
        }}
        amount={args.amount ?? 0}
        toAddresses={args.toAddresses ?? []}
        coinType={args.coinType ?? ""}
        status={status}
      />
    },
  });
};
```

3. **Sui 集成**

```typescript
// src/components/providers/SuiProvider.tsx
export function SuiProvider({ children }: { children: React.ReactNode }) {
  return (
    <SuiClientProvider networks={networkConfig} defaultNetwork="testnet">
      <WalletProvider theme={[/* 主题配置 */]}>
        {children}
      </WalletProvider>
    </SuiClientProvider>
  );
}
```

### 后端实现

#### Mastra 代理

AI 功能通过 Mastra 框架实现，提供智能代理服务：

```typescript
// src/app/api/copilotkit/route.ts
export const POST = async (req: NextRequest) => {
  const clonedReq = req.clone();
  const body = await clonedReq.json();
  const resourceId = body.resourceId || "TEST";

  const baseUrl = process.env.MASTRA_BASE_URL || "http://localhost:4111";

  const mastra = new MastraClient({
    baseUrl,
    headers: {
      address: req.headers.get("address") || "",
    },
  });

  const mastraAgents = await mastra.getAGUI({
    resourceId,
  });

  const runtime = new CopilotRuntime({
    agents: mastraAgents,
  });

  const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
    runtime,
    serviceAdapter: new ExperimentalEmptyAdapter(),
    endpoint: "/api/copilotkit",
  });
  return handleRequest(req);
};
```

#### 数据流

1. 用户在 UI 中输入自然语言查询
2. CopilotKit 前端组件捕获查询并发送到后端
3. 后端 API 将请求转发给 Mastra 代理
4. Mastra 解析意图并确定要执行的操作
5. 如果需要区块链交互，则通过前端 Actions 系统处理
6. 操作结果通过 CopilotKit UI 呈现给用户

## 开发环境搭建

### 环境要求

- Node.js 16+ 或 Bun
- Git
- 网络连接（用于依赖下载）
- Sui 钱包浏览器扩展（测试用）

### 安装步骤

1. **克隆代码库**

```bash
git clone <repository-url>
cd sui-agent-wallet
```

2. **安装依赖**

推荐使用 Bun:

```bash
bun install
```

或使用 npm/yarn/pnpm:

```bash
npm install
# 或
yarn install
# 或
pnpm install
```

3. **配置环境变量**

创建 `.env.local` 文件：

```
NEXT_PUBLIC_NETWORK=testnet
MASTRA_BASE_URL=<mastra-agent-url>
```

4. **启动开发服务器**

```bash
bun dev
# 或
npm run dev
```

服务器将在 http://localhost:3333 启动

## API 参考

### 钱包 Actions

| Action 名称 | 描述 | 参数 |
|------------|------|------|
| action_balance | 查询账户余额 | address?: string |
| action_accounts | 获取所有账户 | N/A |
| action_current_wallet | 获取当前钱包信息 | N/A |
| action_disconnect_wallet | 断开钱包连接 | N/A |
| action_switch_account | 切换当前账户 | accountIndex: number |
| action_transfer_token | 转移代币 | amount: number, toAddresses: string[], coinType: string |
| action_nft | 显示 NFT 资产 | address?: string |
| action_show_stack | 显示质押信息 | address?: string |
| action_all_stack | 显示所有质押信息 | N/A |
| action_stack | 质押代币 | amount: number, validatorAddress: string |

### Mastra Agent 配置

Mastra Agent 需要配置以下功能：

- 意图识别
- 实体提取
- 对话状态管理
- 错误处理
- 结果格式化

## 部署指南

### 前端部署

1. **构建项目**

```bash
bun run build
# 或
npm run build
```

2. **部署到 Vercel/Netlify 等平台**

为获得最佳性能，推荐使用 Vercel 部署 Next.js 应用。

### 后端部署

1. **Cloudflare Workers**

Mastra 代理和 API 端点可部署到 Cloudflare Workers。

2. **环境配置**

确保在部署环境中设置必要的环境变量。

## 扩展指南

### 添加新的钱包操作

1. 在 `src/lib/actions` 中创建新的 action 文件
2. 实现 `useCopilotAction` hook
3. 创建对应的 UI 组件
4. 在 `src/lib/actions/index.ts` 导出新 action
5. 在主页面添加 action 的使用

### 集成第三方服务 (MCP)

MCP 集成将在第三阶段实现，需要：

1. 创建标准化 MCP 接口
2. 实现 MCP 注册和管理系统
3. 设计 NFT 权限控制层
4. 构建开发者工具和文档

## 测试指南

### 单元测试

使用 Jest 和 React Testing Library 进行组件和 hook 测试。

### E2E 测试

使用 Playwright 或 Cypress 进行端到端测试。

### 区块链测试

开发针对 Sui 测试网的专用测试工具和流程。

## 安全考虑

1. **前端安全**
   - 避免在前端存储敏感信息
   - 使用 Content Security Policy
   - 定期更新依赖

2. **智能合约安全**
   - 遵循 Sui Move 安全最佳实践
   - 考虑专业安全审计

3. **API 安全**
   - 实现适当的访问控制
   - 限制请求频率
   - 验证所有输入

## 性能优化

1. **前端优化**
   - 组件懒加载
   - 图片优化
   - 缓存策略

2. **API 优化**
   - 响应缓存
   - 批处理请求
   - 高效数据结构

## 结语

本技术文档提供了 Sui Agi 的架构概览和实现细节。开发者应遵循文档中的指南进行开发和扩展。随着项目演进，本文档将持续更新。
