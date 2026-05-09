# API REST de Productos

API REST sencilla para productos con `Node.js`, `TypeScript`, `Express 5`, `MySQL` y validacion con `Zod`.

## Requisitos

- Node.js 22 o superior
- MySQL 8 o superior

## Tecnologias usadas

- `express@5`
- `mysql2/promise`
- `zod`
- `tsx`
- `typescript`

## Estructura

```text
src/
  app.ts
  server.ts
  config/
  db/
  middleware/
  modules/products/
database.sql
postman/productos-api.postman_collection.json
```

## Variables de entorno

1. Crea un archivo `.env` tomando como base `.env.example`.
2. Ajusta tus datos de MySQL.

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_clave
DB_NAME=productos_db
```

## Script de base de datos

Ejecuta el archivo [database.sql](./database.sql) en MySQL. Ese script:

- crea la base de datos `productos_db`
- crea la tabla `productos`
- inserta 2 registros de ejemplo

Ejemplo:

```bash
mysql -u root -p < database.sql
```

## Instalacion

```bash
npm install
```

## Ejecucion

Modo desarrollo:

```bash
npm run dev
```

Modo normal:

```bash
npm start
```

Compilar TypeScript:

```bash
npm run build
```

Validar tipos:

```bash
npm run typecheck
```

Pruebas:

```bash
npm test
```

## Endpoints

Base URL:

```text
http://localhost:3000
```

### 1. Health check

`GET /health`

Respuesta:

```json
{
  "status": "ok"
}
```

### 2. Obtener todos los productos

`GET /api/productos`

Codigo esperado: `200 OK`

### 3. Obtener producto por id

`GET /api/productos/:id`

Codigo esperado:

- `200 OK`
- `400 Bad Request` si el id no es valido
- `404 Not Found` si no existe

### 4. Obtener productos por nombre

`GET /api/productos/buscar?nombre=Mouse`

Codigo esperado:

- `200 OK`
- `400 Bad Request` si falta `nombre`

### 5. Crear producto

`POST /api/productos`

Body:

```json
{
  "nombre": "Monitor LG 24MP400",
  "descripcion": "Monitor Full HD de 24 pulgadas.",
  "cantidad": 6,
  "estado": "activo",
  "fotoUrl": "https://example.com/images/monitor-lg-24mp400.jpg"
}
```

Codigo esperado:

- `201 Created`
- `400 Bad Request` si el body no es valido
- `409 Conflict` si el nombre ya existe

### 6. Actualizar producto

`PUT /api/productos/:id`

Body parcial:

```json
{
  "cantidad": 10,
  "estado": "inactivo"
}
```

Codigo esperado:

- `200 OK`
- `400 Bad Request`
- `404 Not Found`
- `409 Conflict`

### 7. Eliminar producto

`DELETE /api/productos/:id`

Codigo esperado:

- `204 No Content`
- `400 Bad Request`
- `404 Not Found`

## Respuesta de producto

```json
{
  "id": 1,
  "nombre": "Mouse Logitech G203",
  "descripcion": "Mouse gamer con iluminacion RGB.",
  "cantidad": 15,
  "estado": "activo",
  "fotoUrl": "https://example.com/images/mouse-logitech-g203.jpg",
  "createdAt": "2026-05-09T14:00:00.000Z",
  "updatedAt": "2026-05-09T14:00:00.000Z"
}
```

## Coleccion de Postman

Importa el archivo [postman/productos-api.postman_collection.json](./postman/productos-api.postman_collection.json) en Postman.

La variable `baseUrl` ya viene configurada en:

```text
http://localhost:3000
```
