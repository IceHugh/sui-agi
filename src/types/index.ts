export * from './sui';
export * from './tool';
export interface ToolActionResult {
  action: string;
  data: Record<string, unknown>;
}

export interface DisplayMessage {
  id: string,
  role: "user" | "assistant" | "tool";
  type: "text" | "json_tool_result";
  content?: string | ToolActionResult;
  data?: Record<string, any>;
  toolName?: string;
  action?: string;
  actionResult?: {
    status: 'pending' | 'confirmed' | 'cancelled' | 'timeout';
    data?: any;
  };
}

export interface Asset {
  icon: string; // iconify 图标名
  name: string; // 资产名称
  balance: number | string; // 余额
  symbol: string; // 单位
}
