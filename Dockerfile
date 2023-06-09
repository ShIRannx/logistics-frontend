
FROM node:alpine AS builder
WORKDIR /app
COPY . /app
RUN npm install -D --registry=https://registry.npm.taobao.org && npm run build-prod

FROM nginx:alpine-slim
COPY ./nginx/conf.d/ /etc/nginx/conf.d/
COPY --from=builder /app/dist /usr/share/nginx/html
