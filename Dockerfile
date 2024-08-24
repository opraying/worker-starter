FROM oven/bun:alpine

WORKDIR /app

COPY package.json bun.lockb ./
COPY dist ./dist

CMD ["bun", "start"]