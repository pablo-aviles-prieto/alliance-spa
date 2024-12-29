FROM node:20-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS prod

WORKDIR /app
COPY pnpm-lock.yaml /app
COPY package.json /app
RUN pnpm fetch --prod

COPY . /app
RUN pnpm run build

FROM base
WORKDIR /app
COPY --from=prod /app/node_modules /app/node_modules
COPY --from=prod /app/package.json /app/package.json
COPY --from=prod /app/dist /app/dist

CMD ["pnpm", "preview"]