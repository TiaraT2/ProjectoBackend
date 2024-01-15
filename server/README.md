# Sistema de Gestión de Órdenes y Productos

Haciendo uso de fs se implementa un sistema de gestión de órdenes y productos. Incluye gestores para productos, usuarios y órdenes.

# Endpoints API

## Productos:

POST /api/products: Agregar un nuevo producto.
GET /api/products: Obtener todos los productos.
GET /api/products/:pid: Obtener un producto por ID.
PUT /api/products/sell/:pid: Vender una cantidad específica de un producto.
DELETE /api/products/:pid: Eliminar un producto por ID.

## Usuarios:

POST /api/users: Agregar un nuevo usuario.
GET /api/users: Obtener todos los usuarios.
GET /api/users/:uid: Obtener un usuario por ID.
PUT /api/users/:uid: Actualizar el nombre de un usuario.
DELETE /api/users/:uid: Eliminar un usuario por ID.

## Órdenes:

POST /api/orders: Crear una nueva orden.
GET /api/orders: Obtener todas las órdenes.
GET /api/orders/:uid: Obtener todas las órdenes de un usuario.
PUT /api/orders/:oid: Actualizar una orden por ID.
DELETE /api/orders/:oid: Eliminar una orden por ID.
