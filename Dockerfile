FROM node:16-alpine AS deps

WORKDIR /opt/app
COPY package.json yarn.lock next-i18next.config.js ./
RUN yarn install --frozen-lockfile

FROM node:16-alpine AS builder

ENV NODE_ENV=production
WORKDIR /opt/app
COPY . .
COPY --from=deps /opt/app/node_modules ./node_modules
COPY --from=deps /opt/app/next-i18next.config.js ./next-i18next.config.js
RUN yarn build

FROM node:16-alpine AS runner

ARG X_TAG
WORKDIR /opt/app
ENV NODE_ENV=production
COPY --from=builder /opt/app/next.config.js ./
COPY --from=builder /opt/app/public ./public
COPY --from=builder /opt/app/.next ./.next
COPY --from=builder /opt/app/node_modules ./node_modules
COPY --from=builder /opt/app/next-i18next.config.js ./next-i18next.config.js
CMD ["node_modules/.bin/next", "start"]