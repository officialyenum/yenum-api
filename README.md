
"test": "docker-compose -f docker/docker-compose.test.yml up --build --abort-on-container-exit",
"production": "docker-compose -f docker/docker-compose.yml up -d",
"build": "docker-compose -f docker/docker-compose.yml build",