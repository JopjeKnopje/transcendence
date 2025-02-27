all: up

run: 
	docker-compose up

up: build

build:
	docker-compose build

clean:
	@docker stop $$(docker ps -qa) || true
	@docker rm $$(docker ps -qa) || true
