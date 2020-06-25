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

#### Errores de petición
Cuando se genere un error en las peticiones de express, hay que manejar un numero de error específico para que el manejo en la app Vue sea más sencillo, por el momento se tienen los siguientes errores:

- **500**: Error interno del servidor.
- **400**: Petición errónea, es decir, parámetros o cualquier otra cosa no encontrada en mongo.
- **401**: JWT inválido, este tipo de error no se debe de utilizar.


## Replicat & Sharding

##### Replicat Set
Iniciar servidores para replicat set.
```console
docker-compse -f replicat/docker-compose.yml up -d
```
Ingresar a un servidor del replicat.
```console
mongo mongodb://localhost:40001
```

Crear la configuración del replicat set (poner la IP de su máquina).
```js
rs.initiate(
  {
    _id: "cfrepl",
    configsvr: true,
    members: [
      { _id : 0, host : "192.168.100.16:40001" },
      { _id : 1, host : "192.168.100.16:40002" },
      { _id : 2, host : "192.168.100.16:40003" }
    ]
  }
)
```

Comprobar estado.
```js
rs.status()
```

##### Sharding
Inciar servidores para un shard
```console
docker-compose -f shard1/docker-compose.yaml up -d
```

Ingresar a un servidor del shard.
```console
mongo mongodb://localhost:50001
```

Crear la configuración del shard (poner la IP de su máquina).
```js
rs.initiate(
  {
    _id: "shard1rs",
    members: [
      { _id : 0, host : "192.168.100.16:50001" },
      { _id : 1, host : "192.168.100.16:50002" },
      { _id : 2, host : "192.168.100.16:50003" }
    ]
  }
)
```

Comprobar estado.
```js
rs.status()
```

> Lo anterior hacerlo para los 2 restantes shards, respetando los puertos para cada host, empezando con el puerto :50004 hasta el :50009

##### Mongos Router
Inciar sevidor para backend.
```console
docker-compose up --build
```

Añadir los shards a mongos.
```console
mongos> sh.addShard("shard1rs/192.168.100.16:50001,192.168.100.16:50002,192.168.100.16:50003")
mongos> sh.addShard("shard2rs/192.168.100.16:50004,192.168.100.16:50005,192.168.100.16:50006")
mongos> sh.addShard("shard3rs/192.168.100.16:50007,192.168.100.16:50008,192.168.100.16:50009")
mongos> sh.status()
```