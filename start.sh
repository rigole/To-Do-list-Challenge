
#Stop running docker compose container
docker-compose -f ./configs/docker-compose.yml down --remove-orphans

# Prune Docker system
docker system prune -f

# Start docker compose container with build flag
docker compose -f ./configs/docker-compose.yml up --build