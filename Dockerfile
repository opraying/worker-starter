FROM oven/bun:latest

WORKDIR /app

COPY package.json bun.lockb ./

COPY dist ./dist

CMD ["bun", "start"]