# gestionBDrecorridos

Solución profesional de gestión de recorridos, desarrollada con **Angular 20 + Angular Material (frontend)** y **Express.js + PostgreSQL/PostGIS (backend)**.  
Incluye autenticación segura por roles, estructura modular y buenas prácticas listas para producción.

---

## 🏗️ Estructura de carpetas


---

## 🚀 Puesta en marcha rápida

### **Backend**

```bash
cd backend
npm install
npm run dev


🔒 Autenticación y roles
Registro/Login profesional, con contraseñas hasheadas (bcrypt).

Al iniciar sesión, el backend devuelve un JWT y el usuario (incluyendo su rol).

El frontend guarda el token y el usuario en localStorage.

Acceso a rutas protegido por AuthGuard (solo login) y por rol (admin, gestor, usuario...).

El middleware y los guards permiten ampliar y restringir accesos fácilmente.

🗂️ Funcionalidades principales
CRUD completo de Recorridos

Listados dinámicos con filtros, edición y borrado seguro

Control de botones y menús según el rol del usuario

Gestión de usuarios y autenticación JWT

Backend seguro y modular, preparado para escalar

📚 Principales rutas de API (backend)
Método	Endpoint	Descripción	Protegido por
POST	/api/auth/login	Login usuario	Público
GET	/api/recorridos	Listado recorridos	Token
GET	/api/recorridos/:id	Obtener detalle	Token
POST	/api/recorridos	Crear recorrido	Token + Rol
PUT	/api/recorridos/:id	Editar recorrido	Token + Rol
DELETE	/api/recorridos/:id	Borrar recorrido	Token + Rol

👤 Gestión de usuarios y roles
Tabla USUARIO en la BBDD, con campos:
ID, USERNAME, PASSWORD_HASH, ROL

Roles habituales: admin, gestor, usuario

Los roles se pueden adaptar según nuevas necesidades

🛡️ Seguridad
Contraseñas NUNCA en texto plano (bcrypt)

JWT firmado y con rol en el payload

Middleware de verificación y control de roles en backend

Guardas (guards) en frontend para controlar acceso y visibilidad

Logout elimina token y usuario localmente

💡 Extensión y personalización
Fácil de ampliar a otros módulos (CRUDs, mapas, gestión avanzada)

Preparado para integración con MapLibre, uploads, etc.

Configuración y roles personalizables en backend y frontend


👥 Onboarding rápido para desarrolladores
Clona el repo y entra en /backend y /frontend

Ejecuta npm install en ambos

Prepara tu .env en backend (ejemplo en .env.example)

Lanza backend y frontend (npm run dev, npm start)

Crea usuarios desde SQL o API para probar login y roles

Consulta esta documentación para nuevas rutas, estructuras y prácticas

✨ Buenas prácticas
Código modular y reutilizable

Separación estricta de responsabilidades (frontend/backend)

Control y gestión de errores profesional

Preparado para tests y despliegue seguro

Documentación y comentarios claros en el código

📞 Soporte
Cualquier duda, sugerencia o mejora, ponte en contacto con el equipo de desarrollo
o revisa los issues y pull requests del repo.


---

**Plantilla para onboarding rápido de nuevos devs**  
Puedes crear un `ONBOARDING.md` o dejarlo al inicio del README.  
¿Quieres que te pase un ejemplo de onboarding paso a paso?  
¿O seguimos con el siguiente reto?
