
# Indice

- [Dependencias](#dependencias)
- [Como correr la aplicacion](#como-correr-la-aplicacion-localmente)
    - [Pre-configuracion de la URL de la base de datos](#pre-configuracion-de-la-url-de-la-base-de-datos)
    - [Opcion 1 - IDE](#opcion-1---se-corre-desde-demometagilesapplicationjava)
    - [Opcion 2 - Terminal](#opcion-2---se-corre-desde-la-terminal)
    - [Opcion 3 - Docker](#opcion-3---docker)
- [Estructura base de la aplicacion](#estructura-base-de-la-aplicacion)
- [Docker](#docker)
    - [Nota para docker](#nota-para-docker)
- [Generacion de la carpeta y el entorno](#generacion-de-la-carpeta-y-el-entorno)

# Dependencias
- Java 17 (openjdk sirve)

```bash
# Sin tener java instalado:
sudo apt-get update
sudo apt-get install openjdk-17-jdk
java -version
```

Probablemente quieran actualizar JAVA_HOME y PATH

- Maven
```bash
sudo apt install maven
```
# Como correr la aplicacion

## Pre-configuracion de la URL de la base de datos
Para correrlo localmente, application.propierties dentro de src/main/resources debe ir con
```
spring.datasource.url=jdbc:postgresql://localhost:5432/db1?characterEncoding=UTF-8
```

Varias opciones
## Opcion 1 - Se corre desde [DemoMetagilesApplication.java](/src/main/java/com/metagiles/demometagiles/DemoMetagilesApplication.java)
```
Ir a la clase
Apretar el boton de Run (VSCode)
```
## Opcion 2 - Se corre desde la terminal

```bash
# Ciclo de maven: clean, compile, test-compile, test, package.
mvn clean compile test package
java -jar target/demo-metagiles-0.0.1-SNAPSHOT.jar
```

## Opcion 3 - Docker
Ir a [Docker](#docker)

# Estructura base de la aplicacion

En [/src/.../models](/src/main/java/com/metagiles/demometagiles/models) estan los distintos modelos con sus controladores.
Cada modelo (ficha medica, usuario, etc) tiene su respectivo archivo de definicion de Entidad, su Repositorio que extiende de JPARepository y su Controller, que define las rutas.

# Docker

```bash
# Ciclo de maven: clean, compile, test-compile, test, package.
mvn clean compile test package
docker-compose up
```

## Nota para docker
Correr localmente primero, y si todo anda bien, pasar al docker.

Para pasar al docker, application.propierties dentro de src/main/resources debe ir con
```
spring.datasource.url=jdbc:postgresql://postgres-16:5432/db1?characterEncoding=UTF-8
```
Esa linea le permite al container de spring conocer al container "postgres-16" mediante la docker network configurada. Utilizar 'localhost' no funciona dentro del container. Si el container llamado 'postgres-16' no existe, la aplicacion no podra conectarse a la base de datos.

# Generacion de la carpeta y el entorno
Se genero utilizando https://start.spring.io/ con las siguientes configuraciones
- Java
- Maven
- Spring Boot 3.1.4
- Project Metadata -> group: com.metagiles | artifact: demo-metagiles | name: demo-metagiles | description: ... | package name: com.metagiles.demo-metagiles | packaging: Jar | java: 17
- Dependencias -> Spring Boot DevTools, Lombok, Spring Web, Spring Data JPA, PostgreSQL Driver.
- JUnit (Jupiter) lo trae Spring Boot. Ver.

Y leyendo este tutorial: https://spring.io/guides/tutorials/rest/
