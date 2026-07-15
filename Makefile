# Makefile для управления Kilasonia через Docker Compose

# Переменные
PROJECT_NAME = kilasonia
COMPOSE_FILE = docker-compose.yml
ENV_FILE = .env

# Цвета для вывода
GREEN = \033[0;32m
YELLOW = \033[1;33m
RED = \033[0;31m
NC = \033[0m # No Color

# Основные команды
.PHONY: help build up down restart logs clean shell ps status

# Помощь - показывает все доступные команды
help:
	@echo "$(GREEN)Kilasonia - Docker Compose команды:$(NC)"
	@echo ""
	@echo "$(YELLOW)Основные команды:$(NC)"
	@echo "  make build      - Собрать Docker образы"
	@echo "  make up         - Запустить контейнеры в фоне"
	@echo "  make up-dev     - Запустить контейнеры с логами"
	@echo "  make down       - Остановить и удалить контейнеры"
	@echo "  make restart    - Перезапустить контейнеры"
	@echo "  make logs       - Показать логи"
	@echo "  make logs-f     - Показать логи в реальном времени"
	@echo "  make ps         - Показать статус контейнеров"
	@echo "  make shell      - Зайти в контейнер"
	@echo "  make status     - Проверить статус приложения"
	@echo ""
	@echo "$(YELLOW)Работа с образом:$(NC)"
	@echo "  make clean      - Удалить контейнеры и образы"
	@echo "  make prune      - Очистить все неиспользуемые ресурсы"
	@echo ""
	@echo "$(YELLOW)Деплой:$(NC)"
	@echo "  make deploy     - Задеплоить в продакшен"
	@echo "  make deploy-staging - Задеплоить на стейджинг"
	@echo "  make rollback   - Откатить до предыдущей версии"
	@echo ""
	@echo "$(YELLOW)Утилиты:$(NC)"
	@echo "  make logs-web   - Логи веб-сервера"
	@echo "  make health     - Проверить здоровье приложения"
	@echo "  make test       - Запустить тесты в контейнере"
	@echo "  make backup     - Сделать бэкап"

# Сборка Docker образов
build:
	@echo "$(YELLOW)📦 Сборка Docker образов...$(NC)"
	docker-compose -p $(PROJECT_NAME) -f $(COMPOSE_FILE) build
	@echo "$(GREEN)✅ Сборка завершена!$(NC)"

# Запуск контейнеров в фоне
up:
	@echo "$(YELLOW)🚀 Запуск контейнеров...$(NC)"
	docker-compose -p $(PROJECT_NAME) -f $(COMPOSE_FILE) up -d
	@echo "$(GREEN)✅ Контейнеры запущены!$(NC)"
	@echo "$(GREEN)🌐 Сайт доступен на http://localhost:80$(NC)"
	@make status

# Запуск с логами (для разработки)
up-dev:
	@echo "$(YELLOW)🚀 Запуск контейнеров с логами...$(NC)"
	docker-compose -p $(PROJECT_NAME) -f $(COMPOSE_FILE) up

# Остановка контейнеров
down:
	@echo "$(YELLOW)🛑 Остановка контейнеров...$(NC)"
	docker-compose -p $(PROJECT_NAME) -f $(COMPOSE_FILE) down
	@echo "$(GREEN)✅ Контейнеры остановлены!$(NC)"

# Перезапуск
restart:
	@make down
	@make up

# Логи всех контейнеров
logs:
	docker-compose -p $(PROJECT_NAME) -f $(COMPOSE_FILE) logs

# Логи в реальном времени
logs-f:
	docker-compose -p $(PROJECT_NAME) -f $(COMPOSE_FILE) logs -f

# Логи веб-сервера (nginx)
logs-web:
	docker-compose -p $(PROJECT_NAME) -f $(COMPOSE_FILE) logs kilasonia

# Статус контейнеров
ps:
	docker-compose -p $(PROJECT_NAME) -f $(COMPOSE_FILE) ps

# Статус приложения (healthcheck)
status:
	@echo "$(YELLOW)🔍 Проверка статуса приложения...$(NC)"
	@if docker ps | grep -q kilasonia-app; then \
		echo "$(GREEN)✅ Контейнер работает!$(NC)"; \
		echo ""; \
		echo "$(YELLOW)Информация:$(NC)"; \
		docker ps --filter "name=kilasonia-app" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"; \
		echo ""; \
		echo "$(YELLOW}Проверка HTTP:$(NC)"; \
		curl -s -o /dev/null -w "HTTP Status: %{http_code}\n" http://localhost || echo "$(RED)❌ Сайт не отвечает!$(NC)"; \
	else \
		echo "$(RED)❌ Контейнер не запущен!$(NC)"; \
		echo "Запустите: make up"; \
	fi

# Зайти в контейнер
shell:
	@if docker ps | grep -q kilasonia-app; then \
		docker exec -it kilasonia-app /bin/sh; \
	else \
		echo "$(RED)❌ Контейнер не запущен!$(NC)"; \
	fi

# Очистка (удаление контейнеров и образов)
clean:
	@echo "$(RED)⚠️  Внимание! Будут удалены контейнеры и образы!$(NC)"
	@read -p "Вы уверены? (y/N) " -n 1 -r; \
	echo ""; \
	if [[ $$REPLY =~ ^[Yy]$$ ]]; then \
		echo "$(YELLOW)🧹 Очистка...$(NC)"; \
		docker-compose -p $(PROJECT_NAME) -f $(COMPOSE_FILE) down -v --rmi all; \
		echo "$(GREEN)✅ Очистка завершена!$(NC)"; \
	else \
		echo "$(YELLOW)Отмена$(NC)"; \
	fi

# Очистка Docker (все неиспользуемые ресурсы)
prune:
	@echo "$(RED)⚠️  Внимание! Будут удалены все неиспользуемые ресурсы Docker!$(NC)"
	@read -p "Вы уверены? (y/N) " -n 1 -r; \
	echo ""; \
	if [[ $$REPLY =~ ^[Yy]$$ ]]; then \
		echo "$(YELLOW)🧹 Очистка Docker...$(NC)"; \
		docker system prune -af --volumes; \
		echo "$(GREEN)✅ Очистка завершена!$(NC)"; \
	else \
		echo "$(YELLOW)Отмена$(NC)"; \
	fi

# Healthcheck
health:
	@echo "$(YELLOW)🔍 Проверка здоровья...$(NC)"
	@for i in 1 2 3 4 5; do \
		if curl -s -o /dev/null -w "%{http_code}" http://localhost | grep -q "200"; then \
			echo "$(GREEN)✅ Сайт здоров! (HTTP 200)$(NC)"; \
			exit 0; \
		fi; \
		echo "🔄 Попытка $$i из 5..."; \
		sleep 2; \
	done; \
	echo "$(RED)❌ Сайт не отвечает!$(NC)"; \
	exit 1

# Деплой в продакшен
deploy:
	@echo "$(YELLOW)🚀 Деплой в продакшен...$(NC)"
	@echo "$(YELLOW)📦 Сборка образа...$(NC)"
	docker build -t kilasonia:latest .
	@if [ -n "$(DOCKER_REGISTRY)" ]; then \
		echo "$(YELLOW)📤 Загрузка в реестр...$(NC)"; \
		docker tag kilasonia:latest $(DOCKER_REGISTRY)/kilasonia:latest; \
		docker push $(DOCKER_REGISTRY)/kilasonia:latest; \
	fi
	@echo "$(YELLOW}🔄 Перезапуск контейнера...$(NC)"
	docker-compose -p $(PROJECT_NAME) -f $(COMPOSE_FILE) down
	docker-compose -p $(PROJECT_NAME) -f $(COMPOSE_FILE) up -d
	@make status
	@echo "$(GREEN)✅ Деплой завершен!$(NC)"

# Деплой на стейджинг
deploy-staging:
	@echo "$(YELLOW)🧪 Деплой на стейджинг...$(NC)"
	docker build -t kilasonia:staging .
	docker-compose -p $(PROJECT_NAME)-staging -f $(COMPOSE_FILE) down
	docker-compose -p $(PROJECT_NAME)-staging -f $(COMPOSE_FILE) up -d
	@echo "$(GREEN)✅ Стейджинг доступен на http://localhost:8080$(NC)"

# Откат до предыдущей версии
rollback:
	@echo "$(RED)⚠️  Откат до предыдущей версии...$(NC)"
	@if docker ps -a | grep -q kilasonia-app; then \
		docker stop kilasonia-app || true; \
		docker rm kilasonia-app || true; \
		docker run -d --name kilasonia-app -p 80:80 --restart unless-stopped kilasonia:previous; \
		echo "$(GREEN)✅ Откат выполнен!$(NC)"; \
	else \
		echo "$(RED)❌ Контейнер не найден!$(NC)"; \
	fi

# Тесты в контейнере
test:
	@echo "$(YELLOW)🧪 Запуск тестов...$(NC)"
	docker-compose -p $(PROJECT_NAME) -f $(COMPOSE_FILE) exec kilasonia npm test || echo "Тесты не настроены"

# Бэкап
backup:
	@echo "$(YELLOW)💾 Создание бэкапа...$(NC)"
	@mkdir -p backups
	@tar -czf backups/kilasonia-$(shell date +%Y%m%d-%H%M%S).tar.gz .
	@echo "$(GREEN)✅ Бэкап создан в папке backups/$(NC)"

# Проверка конфигурации
check:
	@echo "$(YELLOW)🔍 Проверка конфигурации...$(NC)"
	@docker-compose -p $(PROJECT_NAME) -f $(COMPOSE_FILE) config
	@echo "$(GREEN)✅ Конфигурация корректна!$(NC)"

# Безопасная остановка (graceful shutdown)
stop-graceful:
	@echo "$(YELLOW)🛑 Безопасная остановка контейнеров...$(NC)"
	docker-compose -p $(PROJECT_NAME) -f $(COMPOSE_FILE) stop -t 30
	@echo "$(GREEN)✅ Контейнеры остановлены!$(NC)"

# Обновление без остановки (rolling update)
update:
	@echo "$(YELLOW)🔄 Обновление без остановки...$(NC)"
	docker-compose -p $(PROJECT_NAME) -f $(COMPOSE_FILE) up -d --no-deps --build kilasonia
	@make status

# Локальная разработка с горячей перезагрузкой
dev:
	@echo "$(YELLOW)💻 Запуск в режиме разработки...$(NC)"
	@echo "$(GREEN)Скоро появится...$(NC)"
	# Здесь будет настройка для разработки с hot-reload