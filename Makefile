all: build
VERSION = 1.1

build:
	docker-compose build web
up:
	docker-compose up -d web
down:
	docker-compose down
bash: up
	docker-compose exec --user docker web bash
dev-server: up
	docker-compose exec --user docker web yarn hot-server
