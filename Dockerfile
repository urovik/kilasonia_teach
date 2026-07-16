# Dockerfile
FROM node:18-alpine AS build

# Принимаем аргумент
ARG REACT_APP_YA_ID
ENV REACT_APP_YA_ID=$REACT_APP_YA_ID

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine

RUN apk add --no-cache bash

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]