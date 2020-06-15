# Servidor Mongo - Express para App Educativa

## Requisitos
Se requiere instalar **docker** y **docker-compose**:
> **Docker-compose** viene instalado con **_Docker Desktop_** para Windows/Mac. Para Linux se requiere instalar ambos por separado.
- [Docker](https://docs.docker.com/engine/install/debian/#installation-methods)
- [Docker-compose](https://docs.docker.com/compose/install/)

## Instalación
Clonar repositorio.
```console
    git clone git@github.com:Victor-Vallin-Medel/prueba-bdd-educativa.git
```
Instalar dependencias.
```console
    npm install
```
Construir el contenedor, esto solo se realiza una vez.
```console
    docker-compose build
```
Levantar el contenedor.
```console
    docker-compose up
```
Se pueden hacer los dos pasos anteriores con un solo comando (la primera vez) con:
```console
    docker-compose up --build
```

## Entorno
Existen tres servicios en el contenedor, un servicio es el servidor epress, otro servicio es mongo ejecutándose y el último una interfáz gráfica para utilizar mongo si no se tiene instalado Compass:

- **Express**: [localhost:3000](http://localhost:3000).
- **MongoUI**: [localhost:1234](http://localhost:1234).
- **Mongo**: localhost:27017 por default.

##### Express
Cualquier cambio realizado en los archivos de express no se ocupa detener el contenedor, nodemon se encarga de recargar los archivos en el servidor para que los cambios se reflejen inmediatamente.
##### MongoDB
La BD se llama educativa **educativaExpress**. Se puede acceder desde consola como se ha trabajado en clases, por el momento no hay un usuario con privilegios.
```console
    mongo
```
Para utilizar el servicio con la aplicación MongoDB Compass, se requiere realizar una nueva conexión con el valor **mongodb://localhost:27017**.

Si se quiere utilizar [MongoUI](http://localhost:1234), en **_Conecction string_** uitilice **mongodb://mongo/educativaExpress**.

## Programar/cambiar rutas en express
Las rutas se dividieron por cada tipo de Schema definido en el servidor, cada grupo de rutas están protegidas sobre un JWT que se realiza al querer iniciar sesión desde la app de Vue, esto está totalmente funcional y solo se deben preocupar por programar las rutas, manejar y devolver lo solicitado.