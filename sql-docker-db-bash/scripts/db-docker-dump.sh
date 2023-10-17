#!/usr/bin/bash

db="$1"
if [ -z "$db" ]; then
    echo "especificar db para dump"
    exit 1
fi

echo "db-docker-dump.sh $server $db called on $(date)"

pgserver="postgres-16"
PGUSER="metadmin"
PGPASSWORD="met!pass2023"
PGDATABASE="postgres" # Database a la que conectarse para hacer el dump: no es la que se va a dumpear. Usamos la que existe por defecto, llamada 'postgres'.

docker exec $pgserver sh -c "mkdir /dumps" 2> /dev/null

comando="pg_dump -f "/dumps/${db}.sql" -d $db"

if [ -f ../dumps/${db}.sql ]; then
    echo "/dumps/${db}.sql ya existe. renombrar o eliminar antes de hacer el dump"
    exit 1
fi
docker exec -i -e PGPASSWORD=$PGPASSWORD -e PGUSER=$PGUSER -e PGDATABASE=$PGDATABASE $pgserver sh -c "$comando"

