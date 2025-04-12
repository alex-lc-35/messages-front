#!/bin/bash

# Helper multi-commande pour le projet-5 (frontend web)

DOCKER_COMPOSE_FILE="_docker/docker-compose.yml"
SERVICE_NAME="web"

show_help() {
  echo ""
  echo "🌐 Helper Docker - projet-5"
  echo ""
  echo "Commandes disponibles :"
  echo "  up             → Démarrer le conteneur Nginx"
  echo "  down           → Arrêter le conteneur"
  echo "  logs           → Afficher les logs Nginx"
  echo "  sh             → Shell dans le conteneur Nginx"
  echo "  curl-api       → Tester l'appel vers projet4.traefik.me/api.php"
  echo ""
  echo "Exemples :"
  echo "  ./_docker/helper.sh up"
  echo "  ./_docker/helper.sh curl-api"
  echo ""
}

if [ $# -lt 1 ]; then
  show_help
  exit 0
fi

COMMAND=$1
shift

case "$COMMAND" in
  up)
    docker compose -f "$DOCKER_COMPOSE_FILE" up -d
    ;;
  down)
    docker compose -f "$DOCKER_COMPOSE_FILE" down
    ;;
  logs)
    docker compose -f "$DOCKER_COMPOSE_FILE" logs -f
    ;;
  sh)
    docker compose -f "$DOCKER_COMPOSE_FILE" exec "$SERVICE_NAME" sh
    ;;
  curl-api)
    docker compose -f "$DOCKER_COMPOSE_FILE" exec "$SERVICE_NAME" sh -c "apk add --no-cache curl > /dev/null && curl -s http://projet4.traefik.me/api.php"
    ;;
  *)
    echo "❌ Commande inconnue: $COMMAND"
    show_help
    exit 1
    ;;
esac
