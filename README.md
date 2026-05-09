# API REST de Productos con NestJS y Prisma

API REST sencilla para productos usando `NestJS`, `Prisma ORM` y `MySQL`.

## Tecnologias

- Node.js 22+
- NestJS
- Prisma ORM
- MySQL 8+
- Jest
- Postman

## Datos del producto

Cada producto tiene estos campos:

- `id`
- `nombre`
- `descripcion`
- `cantidad`
- `estado`
- `fotoUrl`

## Estructura del proyecto

```text
src/
  app.controller.ts
  app.module.ts
  main.ts
  prisma/
  products/
prisma/
  schema.prisma
  seed.ts
database.sql
postman/productos-api.postman_collection.json
```

## 1. Clonar el proyecto desde GitHub

Clona el repositorio:

```bash
git clone https://github.com/repoProgramacion/apirestProductoORM.git
```

Entra a la carpeta del proyecto:

```bash
cd apirestProductoORM
```

## 2. Instalar dependencias

```bash
npm install
```

## 3. Configurar variables de entorno

Crea el archivo `.env` usando `.env.example`:

```env
PORT=3000
DATABASE_URL="mysql://root:@localhost:3306/productos_db"
```

Si quieres hacerlo rapido desde terminal:

```bash
cp .env.example .env
```

Luego edita `.env` con tu usuario, clave y base de datos de MySQL.

Si tu usuario `root` no tiene contrasena, puedes dejarlo asi:

```env
DATABASE_URL="mysql://root:@localhost:3306/productos_db"
```

## 4. Crear la base de datos

Tienes dos opciones.

### Opcion A: con el script SQL

Ejecuta [database.sql](./database.sql):

```bash
mysql -u root -p < database.sql
```

### Opcion B: con Prisma

Primero crea la base vacia en MySQL:

```sql
CREATE DATABASE productos_db;
```

Luego ejecuta:

```bash
npm run prisma:generate
npm run prisma:push
npm run prisma:seed
```

## 5. Ejecutar la aplicacion

Modo desarrollo:

```bash
npm run dev
```

Compilar:

```bash
npm run build
```

Ejecutar compilado:

```bash
npm start
```

La API queda en:

```text
http://localhost:3000
```

## 6. Probar la aplicacion

Pruebas automatizadas:

```bash
npm test
```

Prueba manual rapida:

```bash
curl http://localhost:3000/health
```

Tambien funciona:

```bash
curl http://localhost:3000/api/health
```

## Resumen rapido para montarlo desde cero

```bash
git clone https://github.com/repoProgramacion/apirestProductoORM.git
cd apirestProductoORM
npm install
cp .env.example .env
```

Despues:

1. Configura tu `DATABASE_URL` en `.env`
2. Crea la base de datos en MySQL
3. Ejecuta uno de estos flujos:

Con Prisma:

```bash
npm run prisma:generate
npm run prisma:push
npm run prisma:seed
npm run dev
```

Con SQL:

```bash
mysql -u root -p < database.sql
npm run prisma:generate
npm run dev
```

## Endpoints

Base URL:

```text
http://localhost:3000/api
```

### Health check

Endpoints disponibles:

- `GET /health`
- `GET /api/health`

Respuesta:

```json
{
  "status": "ok"
}
```

### Obtener todos los productos

`GET /productos`

Respuesta:

- `200 OK`

### Obtener producto por id

`GET /productos/:id`

Respuesta:

- `200 OK`
- `400 Bad Request`
- `404 Not Found`

### Buscar productos por nombre

`GET /productos/buscar?nombre=Mouse`

Respuesta:

- `200 OK`
- `400 Bad Request`

### Crear producto

`POST /productos`

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

Respuesta:

- `201 Created`
- `400 Bad Request`
- `409 Conflict`

### Actualizar producto

`PUT /productos/:id`

Body parcial:

```json
{
  "cantidad": 12,
  "estado": "inactivo"
}
```

Respuesta:

- `200 OK`
- `400 Bad Request`
- `404 Not Found`
- `409 Conflict`

### Eliminar producto

`DELETE /productos/:id`

Respuesta:

- `204 No Content`
- `400 Bad Request`
- `404 Not Found`

## Coleccion de Postman

Importa este archivo:

[postman/productos-api.postman_collection.json](./postman/productos-api.postman_collection.json)

La variable `baseUrl` ya viene configurada como:

```text
http://localhost:3000
```

## Comandos utiles

```bash
npm run prisma:generate
npm run prisma:push
npm run prisma:seed
npm run build
npm test
```
