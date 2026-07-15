# Этап 1: Сборка React-приложения
# Используем официальный образ Node.js для сборки
FROM node:18-alpine AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install && npm cache clean --force

# Копируем исходный код
COPY . .

# Собираем приложение
RUN npm run build

# Этап 2: Запуск с nginx
# Используем легкий образ nginx
FROM nginx:alpine

# Устанавливаем bash для скриптов
RUN apk add --no-cache bash

# Копируем собранный React-проект в папку nginx
COPY --from=build /app/build /usr/share/nginx/html

# Копируем кастомный конфиг nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Открываем порт 80
EXPOSE 80

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]