# --- 构建阶段 ---
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json bun.lock ./
RUN npm install -g bun && bun install --frozen-lockfile
COPY . .
COPY .env.production .
RUN npm run build

# --- 生产运行阶段 ---
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
# 示例：设置一个默认环境变量（可被 docker run -e 覆盖）
ENV API_URL=https://api.example.com
# 只复制生产依赖和构建产物
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/tsconfig.json ./
COPY --from=builder /app/src ./src
COPY --from=builder /app/.env.production .
EXPOSE 3000
CMD ["npm", "start"]
