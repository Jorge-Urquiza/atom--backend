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

## Run unit test
```bash
npm test
```

## Endpoints
- POST /auth/login – Login de usuario (devuelve token firmado con JWT)
- POST /users/create – Registro de nuevo usuario
- GET /tasks – Listar tareas del usuario (protegido con JWT)
- POST /tasks – Crear nueva tarea (protegido)
- PUT /tasks/:id – Actualizar tarea (protegido)
- DELETE /tasks/:id – Eliminar tarea (protegido)