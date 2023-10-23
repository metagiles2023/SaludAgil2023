# Indice

# Dependencias
- Node.js version 16 o superior

- Instalar next
```
npm install next
```

- usa Tailwind, ESLint

# Como ejecutar la aplicacion

## Localmente
```bash
npm run dev
```

## En el docker container
```bash
docker build -t salud-next-app .
docker-compose up
```

## Estructura de la aplicacion

- en /componentes van los elementos reutilizables que despues importamos (como el NavBar)

- en /src/app/carpeta van las rutas

> la carpeta /src/app/blog tiene un archivo page.js que responde cuando se accede a localhost:3000/blog

> lo mismo con /src/app/ficha-medica/ver/page.js y localhost:3000/ficha-medica/ver