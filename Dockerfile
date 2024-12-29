FROM node:18-alpine

RUN mkdir -p /home/app
WORKDIR /home/app

COPY package*.json .

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

CMD ["pnpm", "preview"]