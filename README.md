# Task API

Una API REST construida con **Node.js**, **Express**, **TypeScript**, y **Firebase Firestore**, que permite gestionar tareas por usuario, con autenticación por token JWT.

---

## Características

- Autenticación mediante JWT
- Gestión de usuarios (registro y login)
- CRUD de tareas (crear, obtener, actualizar, eliminar)
- Arquitectura limpia basada en casos de uso, repositorios.
- Middleware de autenticación para proteger rutas
- Validaciones y manejo global de errores
- Persistencia de datos con Firebase Firestore

## Requisitos

- Node.js 18+
- Cuenta y proyecto en Firebase (usar plan blaze para el deploy)

## Instalación
```bash
git https://github.com/Jorge-Urquiza/atom--backend/
cd atom--backend
npm install
npm run build
firebase emulators:start

```
# Set Environment Variables in Production (Firebase) .
```bash
firebase functions:secrets:set JWT_SECRET 
```
and write your secret

## Run unit test
```bash
npm test
```

## Endpoints

### POST /auth/login
Login de usuario y generación de token JWT.
**Request Body:**
```json
{
  "email": "juan.perez@example.com"
}
```

### POST /users/create
Crea un nuevo usuario.
**Request Body:**
```json
{
  "email": "juan.cardenas@example.com"
}
```
### GET /tasks
Lista las tareas del usuario autenticado.
**Headers:**
```json
    Authorization: Bearer <JWT_TOKEN>
```

### POST /tasks
Crea una nueva tarea.

**Headers:**
```json
    Authorization: Bearer <JWT_TOKEN>
```
**Request Body:**
```json
{
  "title": "Title task",
  "description": "Description for ATOM"
}
```


### PUT /tasks/:id
Crea una nueva tarea.

**Headers:**
```json
    Authorization: Bearer <JWT_TOKEN>
```
**Request Body:**
```json
{
  "title": "Title task update",
  "description": "Description update for ATOM"
}
```

### DELETE /tasks/:id
Elimina una tarea (soft delete).

**Headers:**
```json
    Authorization: Bearer <JWT_TOKEN>
```


## Consideraciones Técnicas y Mejoras Pendientes

- **Documentación con Swagger (OpenAPI):** Se puede integrar `swagger-jsdoc` y `swagger-ui-express` para exponer y probar los endpoints de forma visual.
- **Uso de Mappers (DTO => Entidades):** Actualmente los objetos se transfieren directamente. Sería recomendable implementar mapeadores explícitos para convertir entre DTOs y entidades de dominio.
- **Autenticación más robusta:** Agregar validaciones adicionales, como firma segura del token, uso de refresh tokens ectc...
---

## Contacto
Si tenés dudas, sugerencias o querés colaborar, no dudes en abrir un issue o enviar un pull request. 

---