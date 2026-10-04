# ISWZ2202 — Catálogo de Productos

Aplicación web desarrollada con Spring Boot para gestionar y consultar un catálogo de productos. El proyecto implementa caché, el patrón Proxy, configuración CORS y un frontend independiente que consume la API REST.

## Tecnologías

* Java 17+
* Spring Boot
* Spring Cache
* Maven Wrapper
* HTML
* CSS
* JavaScript

## Arquitectura

La aplicación utiliza una separación por capas y abstracciones para reducir el acoplamiento entre los componentes.

```text
Frontend
   ↓
ProductoController
   ↓
ProductoService
   ↓
ProxyProductoRepository
   ↓
RepositorioProductoEnMemoria
```

El `ProductoService` utiliza caché para evitar repetir llamadas innecesarias al repositorio. El `ProxyProductoRepository` implementa la misma abstracción que el repositorio real y delega las operaciones hacia él.

## Caché

Se utiliza Spring Cache para almacenar temporalmente los resultados de las consultas:

* `listarTodos()` utiliza la caché `productos`.
* `buscarPorId()` utiliza la caché `productoPorId`.

El repositorio incluye una latencia simulada de 1500 ms para evidenciar la diferencia entre una consulta que accede al repositorio y una consulta atendida desde la caché.

## Patrón Proxy

`ProxyProductoRepository` implementa la interfaz `ProductoRepository` y actúa como intermediario entre el servicio y el repositorio real.

```text
ProductoService
      ↓
ProxyProductoRepository
      ↓
RepositorioProductoEnMemoria
```

Esto permite que el servicio dependa de la abstracción `ProductoRepository` y no directamente de la implementación concreta.

## CORS

Se agregó una configuración global de CORS para permitir que el frontend pueda realizar peticiones `GET` hacia la API durante el desarrollo.

Las rutas de la API utilizan el prefijo:

```text
/api/**
```

## API REST

La aplicación se ejecuta en:

```text
http://localhost:8080
```

### Obtener todos los productos

```text
GET /api/productos
```

### Obtener un producto por ID

```text
GET /api/productos/{id}
```

Ejemplo:

```text
GET /api/productos/1
```

## Frontend

El frontend se encuentra en la carpeta:

```text
frontend/
```

Está compuesto por:

```text
frontend/
├── index.html
├── style.css
└── script.js
```

Permite:

* Visualizar todos los productos.
* Buscar un producto por ID.
* Mostrar información como nombre, categoría y precio.
* Consumir la API REST mediante `fetch()`.

Para utilizar el frontend, primero se debe ejecutar el backend y posteriormente abrir `frontend/index.html` en el navegador.

## Ejecución

No es necesario instalar Maven, ya que el proyecto incluye Maven Wrapper.

### Windows

```bash
mvnw.cmd spring-boot:run
```

### macOS / Linux

```bash
./mvnw spring-boot:run
```

La API estará disponible en:

```text
http://localhost:8080
```

## Objetivo de la práctica

La práctica busca aplicar conceptos de diseño de software mediante:

* Implementación de caché.
* Uso del patrón Proxy.
* Separación de responsabilidades.
* Uso de abstracciones para reducir el acoplamiento.
* Configuración de CORS.
* Integración de un frontend con una API REST.
