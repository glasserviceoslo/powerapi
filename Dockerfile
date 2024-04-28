FROM node:20-alpine as builder

RUN corepack enable
WORKDIR /app

COPY . .

RUN pnpm install 
RUN pnpm build

CMD ["node", "dist/server.js"]
