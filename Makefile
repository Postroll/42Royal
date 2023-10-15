all: up 

up:
	docker compose -f ./docker-compose.yml up --build

down:
	docker compose -f ./docker-compose.yml down

clean:
	docker compose -f ./docker-compose.yml down
	docker container prune -f
	docker image prune -f
	docker rmi `docker images -qa`
	docker volume prune -f
	docker system prune -f

fclean: clean

re: fclean all

.PHONY: all clean fclean re