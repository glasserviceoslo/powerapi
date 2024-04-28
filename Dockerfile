FROM node:20-alpine

RUN corepack enable
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
COPY . .

RUN pnpm install 
RUN pnpm build

CMD ["node", "dist/server.js"]
