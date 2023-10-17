17 octubre: La idea es que esto esta super mal hecho a proposito, los archivos estan todos sueltos, pero compila y anda.

# Como correr la aplicacion
Se corre desde [DemoMetagilesApplication.java](/src/main/java/com/metagiles/demometagiles/DemoMetagilesApplication.java)
```
Ir a la clase
Apretar el boton de Run (VSCode)
```

# Dependencias
Java 17 (openjdk sirve)
- Probablemente quieran actualizar JAVA_HOME y PATH
Maven

# Estructura de la aplicacion
En [Clase1.java](/src/main/java/com/metagiles/demometagiles/Clase1.java) se define una entidad (una clase serializable para guardar y tomar de la base de datos).
- El constructor default vacio es necesario

En [Clase1Controller.java](/src/main/java/com/metagiles/demometagiles/Clase1Controller.java) se definen los metodos (via REST) que van a recibir los endpoints (como "/getAll").
- El repository lo recibe por dependency injection, no se lo tenemos que dar nosotros.

En [Clase1Repository.java](/src/main/java/com/metagiles/demometagiles/Clase1Repository.java) se crea una interfaz que extiende de la de Jakarta (ver JPA) llamada JpaRepository, que provee metodos via Hibernate para hacer pedidos a la base de datos (ver findAll() utilizado en Clase1Controller).

# Docker
Falta

# Generacion de la carpeta
Se genero utilizando https://start.spring.io/ con las siguientes configuraciones
- Java
- Maven
- Spring Boot 3.1.4
- Project Metadata -> group: com.metagiles | artifact: demo-metagiles | name: demo-metagiles | description: ... | package name: com.metagiles.demo-metagiles | packaging: Jar | java: 17
- Dependencias -> Spring Web, Spring Data JPA, PostgreSQL Driver
- JUnit (Jupiter) lo trae Spring Boot. Ver.

Y leyendo este tutorial: https://spring.io/guides/tutorials/rest/
