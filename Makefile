build-image:
	docker image build . -t officialyenum/yenum-api

run-image:
	docker run -p 4000:4000 --env-file ./.env officialyenum/yenum-api:latest

up-dev:
	docker-compose up --build

up-prod:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build
	
down:
	docker-compose down