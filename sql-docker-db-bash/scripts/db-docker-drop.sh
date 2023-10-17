#!/usr/bin/bash

db="$1"

echo "db-docker-drop.sh $db called on $(date)"

pgserver="postgres-16"
PGUSER="metadmin"
PGPASSWORD="met!pass2023"
PGDATABASE="postgres" # Database a la que conectarse para hacer el drop: no es la que se va a dropear. Usamos la que existe por defecto, llamada 'postgres'.

docker exec -i -e PGPASSWORD=$PGPASSWORD -e PGUSER=$PGUSER -e PGDATABASE=$PGDATABASE $pgserver sh -c " psql -c \"select pg_terminate_backend(pid) from pg_stat_activity where datname = '$db';\" "

docker exec -i -e PGPASSWORD=$PGPASSWORD -e PGUSER=$PGUSER -e PGDATABASE=$PGDATABASE $pgserver sh -c " psql -c \"drop database if exists $db;\" "

