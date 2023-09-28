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
	# sudo docker volume rm frontend-data
	# sudo docker volume rm redis-data
	# sudo docker volume rm postgres-data
	# -sudo docker volume rm srcs_db-storage
	# sudo rm -rf /home/mlauro/data/mysql/*
	# sudo rm -rf /home/mlauro/data/www/*

fclean: clean

re: fclean all

.PHONY: all clean fclean re