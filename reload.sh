#!/bin/bash
# reload.sh - скрипт для перезагрузки Nginx

echo "🔄 Перезагружаем Nginx после обновления сертификатов..."

# Проверяем, что контейнер существует
if docker ps | grep -q kilasonia-app; then
    docker exec kilasonia-app nginx -t  # Проверяем конфиг
    if [ $? -eq 0 ]; then
        docker exec kilasonia-app nginx -s reload  # Перезагружаем
        echo "✅ Nginx перезагружен!"
    else
        echo "❌ Ошибка в конфиге Nginx!"
        exit 1
    fi
else
    echo "❌ Контейнер kilasonia-app не запущен!"
    exit 1
fi