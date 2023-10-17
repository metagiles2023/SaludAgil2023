#!/usr/bin/bash

where_from="../dumps"
db="$1"

echo "create-and-restore.sh $1 called on $(date)"

pgserver="postgres-16"
PGUSER="metadmin"
PGPASSWORD="met!pass2023"
PGDATABASE="postgres" # Database a la que conectarse para hacer el create and restore: no es la que se va a operar. Usamos la que existe por defecto, llamada 'postgres'.


comando="CREATE DATABASE $db;"

docker exec -i -e PGPASSWORD=$PGPASSWORD -e PGUSER=$PGUSER -e PGDATABASE=$PGDATABASE $pgserver sh -c " psql -c \" $comando \" "

exit_status=$?

if [[ $exit_status -eq 0 ]]; then
	{ cat "${where_from}/${db}.sql" | docker exec -i -e PGPASSWORD=$PGPASSWORD $pgserver psql -d $db -U $PGUSER -f - ; } 2>&1 
else
	echo "Early exit after create: $?" >> $logpath
fi


