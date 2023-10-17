Indice
- [Como ejecutar los servidores](#como-ejecutar-los-servidores)
- [Credenciales](#credenciales)
- [Scripts](#scripts)

# Como ejecutar los servidores

En el docker-compose.yml (archivo de descripcion de containers) hay dos servicios: postgres-16 y pgadmin4

Son dos servidores que van a correr postgres y pgadmin respectivamente. Uno en el puerto 5432, otro en el 5050, ambos localhost.
> Esos containers se conocen mediante una docker-network llamada 'network-metagiles'. Eso es util para la resolucion de DNS dentro del container. Se conocen, son amigos digamos.

Lista de comandos para levantar los containers. Todos hacen lo mismo con algunas variantes:
- docker-compose -f path/to/docker-compose.yml **up** (generico, recomendado)
- docker-compose **up** (si estas parado en el directorio y el archivo se llama docker-compose.yml)
- docker-compose **up** -d (para correrlo en el background y desatarlo de la terminal)
- docker-compose **up** --force-recreate (si le modificaste algo al yml)

Para bajarlos o reiniciarlos:
- docker-compose -f path/to/docker-compose.yml **down** (generico, recomendado)
- docker-compose -f path/to/docker-compose.yml **restart** (generico, recomendado)
- docker-compose **down** (si estas parado en el directorio y el archivo se llama docker-compose.yml)
- docker-compose **restart** (si estas parado en el directorio y el archivo se llama docker-compose.yml)

Para ver los containers en ejecucion
- docker ps

Para ver los containers en ejecucion o detenidos
- docker ps -a

Para ver los logs de un container
- docker logs nombre-container
- docker logs -f nombre-container (para atarlo a la terminal)

Para pullear una imagen (el docker-compose up lo hace solo, es raro necesitar esto)
- docker pull image-name

# Credenciales
En el docker-compose.yml estan definidos los usuario y contrasena de pgadmin y de postgres.

# Scripts
Hay una carpeta de [scripts](/scripts/) con tres utilidades: dropear una base, dumpearla, y hacer create y restore.

- [db-docker-drop.sh](/scripts/db-docker-drop.sh): dropea una base.

```sh
bash db-docker-drop.sh dbname
```
- [db-docker-dump.sh](/scripts/db-docker-dump.sh): hace un dump (un volcado) de una base de datos. Ese dump se puede dar a otra persona para que utilize el comando de create-and-restore para crear una base a partir de dicho dump.

```sh
bash db-docker-dump.sh dbname
```
- [db-docker-create-and-restore.sh](/scripts/db-docker-create-and-restore.sh): es el unico que hay que ejecutar en el directorio de la carpeta /scripts. El resto se puede ejecutar de cualquier lado. Crea una base nueva con el nombre {db}, y pone en dicha base los datos del dump correspondiente tomado de /dumps/{db}.sql

```sh
#Ir al directorio /scripts
bash db-docker-create-and-restore.sh dbname
```