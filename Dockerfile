#public.ecr.aws/bitnami/node:16
FROM node:16

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn

COPY . .

RUN yarn build
EXPOSE 3000
CMD ["yarn", "start"]