
FROM node:alpine AS builder
WORKDIR /app
RUN npm install -g @angular/cli@14.2.10
COPY . /app
RUN npm install && ng build --aot -c production --output-path dist

FROM nginx:alpine-slim
COPY ./nginx/conf.d/ /etc/nginx/conf.d/
COPY --from=builder /app/dist /usr/share/nginx/html
