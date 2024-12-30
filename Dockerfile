# FROM node:20-slim AS base

# ENV PNPM_HOME="/pnpm"
# ENV PATH="$PNPM_HOME:$PATH"
# RUN corepack enable

# FROM base AS prod

# WORKDIR /app
# COPY pnpm-lock.yaml /app
# COPY package.json /app
# RUN pnpm install --frozen-lockfile

# COPY . /app
# RUN pnpm run build

# FROM base
# WORKDIR /app
# COPY --from=prod /app/node_modules /app/node_modules
# COPY --from=prod /app/package.json /app/package.json
# COPY --from=prod /app/dist /app/dist

# CMD ["pnpm", "preview"]

# Stage 0
FROM node:20-slim AS build-stage

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app
COPY package*.json /app/
COPY pnpm-lock.yaml /app/
RUN pnpm install --frozen-lockfile
COPY ./ /app/
RUN pnpm run build

# Stage 1
FROM fholzer/nginx-brotli

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist/ /usr/share/nginx/html

COPY --from=build-stage /app/entrypoint.sh /usr/local/bin/entrypoint
RUN chmod +x /usr/local/bin/entrypoint

EXPOSE 80

ENTRYPOINT [ "entrypoint" ]