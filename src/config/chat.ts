export const toolActionMap = {
  get_all_token_balances: {
    name: '获取所有资产',
    description: '获取所有资产',
    show: true,
    requireConfirm: false,
  },
  transfer_token: {
    name: '转账',
    description: '转账',
    show: true,
    requireConfirm: true,
  },
};

export const toolActions = Object.keys(toolActionMap);