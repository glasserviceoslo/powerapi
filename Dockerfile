FROM node:20-alpine as builder

RUN corepack enable
WORKDIR /app

COPY . .
RUN pnpm i && pnpm build

FROM builder as production
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm i --production

FROM node:20-slim as release
ENV PATH /data/app/node_modules/.bin:$PATH
WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=production /app/node_modules ./node_modules
COPY --from=production /app/package.json .

CMD ["pnpm", "start"]
