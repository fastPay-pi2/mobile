up:
	docker-compose up

stop:
	docker-compose stop

down:
	docker-compose down

runserver:
	docker-compose up authentication_app authentication_db products_api products_db purchase_api purchase_db
