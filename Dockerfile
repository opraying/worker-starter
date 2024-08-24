FROM alpine:3.18

RUN apk add --no-cache curl bash

RUN curl -fsSL https://bun.sh/install | bash

RUN apk del curl && \
    rm -rf /var/cache/apk/*

ENV PATH="/root/.bun/bin:${PATH}"

WORKDIR /app

COPY package.json bun.lockb ./
COPY dist ./dist

RUN adduser -D appuser
USER appuser

CMD ["bun", "start"]