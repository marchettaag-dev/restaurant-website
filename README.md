# 🍽️ Restaurant Website - Menu Management System

> **Proyecto académico de Programación 3**: Sistema web completo para gestionar el menú de un restaurante con autenticación, CRUD de platos y sistema de reservas.

## 📋 Tabla de Contenidos

- [Descripción General](#descripción-general)
- [Características](#características)
- [Stack Tecnológico](#stack-tecnológico)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [API Endpoints](#api-endpoints)
- [Funcionalidades](#funcionalidades)
- [Contribuir](#contribuir)

---

## 📖 Descripción General

**Restaurant Website** es una aplicación web fullstack que permite:

- **👥 Usuarios Clientes**: Ver la carta del día y carta completa, hacer reservas con chat integrado
- **👨‍💼 Administrador**: Gestionar platos (crear, leer, actualizar, eliminar) con login seguro
- **💾 Base de Datos**: Persistencia con MongoDB Atlas (NoSQL)
- **🔐 Autenticación**: Sistema JWT para proteger rutas de administrador

Desarrollado como proyecto de aprendizaje en la materia **Programación 3** de la facultad.

---

## ✨ Características

### Para Clientes
- ✅ Ver menú del día (platos destacados)
- ✅ Ver carta completa con detalles de platos
- ✅ Sistema de reservas con formulario
- ✅ Chat directo con el restaurante para reservas
- ✅ Mensaje pre-construido en WhatsApp/Email

### Para Administrador
- ✅ **Login seguro** con autenticación JWT
- ✅ **CRUD de Platos**:
  - Crear nuevos platos
  - Leer/visualizar platos
  - Actualizar información de platos
  - Eliminar platos del menú
- ✅ Panel de administración dedicado
- ✅ Gestión de disponibilidad de platos

---

## 🛠️ Stack Tecnológico

### Frontend
- **HTML5**: Estructura semántica
- **CSS3**: Estilos responsivos
- **JavaScript (Vanilla)**: Lógica del cliente

### Backend
- **Node.js**: Runtime JavaScript
- **Express.js**: Framework web minimalista
- **Mongoose**: ODM para MongoDB
- **JWT**: Autenticación segura
- **Dotenv**: Gestión de variables de entorno

### Base de Datos
- **MongoDB Atlas**: Base de datos NoSQL en la nube

---

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (v14 o superior): [Descargar](https://nodejs.org/)
- **npm** (viene con Node.js)
- **Cuenta en MongoDB Atlas**: [Crear cuenta](https://www.mongodb.com/cloud/atlas)
- **Git**: Para clonar el repositorio

Verifica tu instalación:
```bash
node --version    # v14.0.0 o superior
npm --version     # 6.0.0 o superior
git --version     # 2.0.0 o superior
```

---

## 🚀 Instalación

### 1. Clonar el repositorio
```bash
git clone https://github.com/marchettaag-dev/restaurant-website.git
cd restaurant-website
```

### 2. Instalar dependencias
```bash
npm install
```

Este comando instala todos los paquetes necesarios listados en `package.json`:
- `express` - Framework web
- `mongoose` - Conexión a MongoDB
- `jsonwebtoken` - Autenticación
- `dotenv` - Variables de entorno
- `nodemon` (dev) - Recarga automática en desarrollo

### 3. Crear archivo `.env`
En la raíz del proyecto, crea un archivo llamado `.env`:

```env
# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/restaurant

# Puerto del servidor
PORT=3000

# JWT Secret (clave para firmar tokens)
JWT_SECRET=tu_clave_secreta_muy_larga_aqui

# JWT Expiration (tiempo de expiración del token)
JWT_EXPIRATION=7d
```

**⚠️ IMPORTANTE**: Nunca commits el archivo `.env` a Git (está en `.gitignore`)

---

## ⚙️ Configuración

### Configurar MongoDB Atlas

1. **Crear una cuenta en MongoDB Atlas**
2. **Crear un cluster** (free tier está bien para desarrollo)
3. **Obtener la connection string**:
   - Ve a "Connect" → "Drivers" → "Node.js"
   - Copia la URL de conexión
   - Reemplaza `<password>` y `<database>`

### Configurar JWT Secret

La `JWT_SECRET` es una clave privada para firmar tokens de autenticación:

```javascript
// ❌ NO HAGAS ESTO (inseguro):
JWT_SECRET=123456

// ✅ HAZ ESTO (seguro):
JWT_SECRET=aB#9@mK2$xP!qL7vN&uY5zC3dF4gH6j8
```

---

## 💻 Uso

### Iniciar en desarrollo
```bash
npm run dev
```
- Usa **nodemon** para recarga automática
- El servidor escucha en `http://localhost:3000`

### Iniciar en producción
```bash
npm start
```
- Inicia el servidor normalmente sin recarga automática

### Acceder a la aplicación
- **Cliente**: [http://localhost:3000](http://localhost:3000)
- **Admin Login**: [http://localhost:3000/admin](http://localhost:3000/admin) (crear ruta si no existe)
- **API Base**: `http://localhost:3000/api`

---

## 📁 Estructura del Proyecto

```
restaurant-website/
│
├── src/                          # Código fuente del backend
│   ├── index.js                  # Punto de entrada, configuración de Express
│   ├── db.js                     # Conexión a MongoDB
│   │
│   ├── models/                   # Modelos de Mongoose (esquemas de BD)
│   │   ├── Plato.js             # Modelo de platos del menú
│   │   └── Usuario.js           # Modelo de usuarios (admin)
│   │
│   ├── routes/                   # Rutas API
│   │   ├── platos.js            # CRUD de platos
│   │   └── auth.js              # Autenticación (login/registro)
│   │
│   ├── middleware/               # Funciones middleware
│   │   └── autenticacion.js      # Verificación de JWT
│   │
│   └── controllers/              # Lógica de negocio (opcional, mejora práctica)
│       ├── platosController.js
│       └── authController.js
│
├── public/                        # Archivos estáticos (Frontend)
│   ├── index.html                # Página principal
│   ├── admin.html                # Panel de administrador
│   ├── css/
│   │   ├── styles.css            # Estilos principales
│   │   └── admin-styles.css      # Estilos del admin
│   └── js/
│       ├── app.js                # Lógica del cliente
│       ├── admin.js              # Lógica del panel admin
│       └── api-client.js         # Funciones para consumir API
│
├── .env                          # Variables de entorno (NO COMMITEAR)
├── .gitignore                    # Archivos a ignorar en Git
├── package.json                  # Dependencias y scripts
├── package-lock.json             # Lock file de npm
└── README.md                     # Este archivo
```

### Explicación de carpetas clave:

| Carpeta | Propósito | Ejemplo |
|---------|-----------|---------|
| `src/` | Backend Node.js | Conexión DB, rutas API, modelos |
| `public/` | Frontend (HTML/CSS/JS) | Interfaz usuario, estilos |
| `src/models/` | Esquemas de datos | Definir estructura de platos |
| `src/routes/` | Endpoints API | GET/POST/PUT/DELETE |
| `src/middleware/` | Funciones intermedias | Verificar autenticación |

---

## 🔌 API Endpoints

### Autenticación

#### Registrar admin
```http
POST /api/auth/registro
Content-Type: application/json

{
  "email": "admin@restaurante.com",
  "password": "contraseña_segura"
}
```

**Respuesta (201)**:
```json
{
  "mensaje": "Usuario registrado exitosamente",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Login admin
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@restaurante.com",
  "password": "contraseña_segura"
}
```

**Respuesta (200)**:
```json
{
  "mensaje": "Login exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### Platos (CRUD)

#### Obtener todos los platos
```http
GET /api/platos
```

**Respuesta (200)**:
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "nombre": "Milanesa a la napolitana",
    "descripcion": "Milanesa de ternera crujiente",
    "precio": 450,
    "categoria": "Platos principales",
    "disponible": true,
    "delDia": true,
    "createdAt": "2024-01-15T10:30:00Z"
  },
  {
    "_id": "507f1f77bcf86cd799439012",
    "nombre": "Ensalada César",
    "descripcion": "Lechuga fresca con aderezo César",
    "precio": 280,
    "categoria": "Ensaladas",
    "disponible": true,
    "delDia": false,
    "createdAt": "2024-01-14T09:15:00Z"
  }
]
```

#### Crear nuevo plato (requiere autenticación)
```http
POST /api/platos
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "nombre": "Bife de chorizo",
  "descripcion": "Jugoso bife de chorizo a la parrilla",
  "precio": 650,
  "categoria": "Platos principales",
  "delDia": true
}
```

**Respuesta (201)**:
```json
{
  "mensaje": "Plato creado exitosamente",
  "plato": {
    "_id": "507f1f77bcf86cd799439013",
    "nombre": "Bife de chorizo",
    "descripcion": "Jugoso bife de chorizo a la parrilla",
    "precio": 650,
    "categoria": "Platos principales",
    "disponible": true,
    "delDia": true,
    "createdAt": "2024-01-15T11:45:00Z"
  }
}
```

#### Obtener plato por ID
```http
GET /api/platos/:id
```

**Respuesta (200)**:
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "nombre": "Milanesa a la napolitana",
  "descripcion": "Milanesa de ternera crujiente",
  "precio": 450,
  "categoria": "Platos principales",
  "disponible": true,
  "delDia": true,
  "createdAt": "2024-01-15T10:30:00Z"
}
```

#### Actualizar plato (requiere autenticación)
```http
PUT /api/platos/:id
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "precio": 480,
  "disponible": false
}
```

**Respuesta (200)**:
```json
{
  "mensaje": "Plato actualizado exitosamente",
  "plato": {
    "_id": "507f1f77bcf86cd799439011",
    "nombre": "Milanesa a la napolitana",
    "precio": 480,
    "disponible": false,
    "delDia": true
  }
}
```

#### Eliminar plato (requiere autenticación)
```http
DELETE /api/platos/:id
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Respuesta (200)**:
```json
{
  "mensaje": "Plato eliminado exitosamente"
}
```

---

## 🎯 Funcionalidades Detalladas

### 1. Sistema de Autenticación (JWT)

**¿Cómo funciona?**

```javascript
// 1. Admin se registra
POST /api/auth/registro
  → Se crea usuario en MongoDB
  → Se genera TOKEN JWT
  → Se envía TOKEN al cliente

// 2. Admin hace login
POST /api/auth/login
  → Se verifica email/password
  → Se genera nuevo TOKEN JWT
  → Se envía TOKEN al cliente

// 3. Admin usa el token para operaciones protegidas
POST /api/platos (con header Authorization: Bearer TOKEN)
  → Middleware verifica TOKEN
  → Si es válido → Se ejecuta la acción
  → Si es inválido → Error 401 Unauthorized
```

### 2. CRUD de Platos

**Create (Crear)**
- Endpoint: `POST /api/platos`
- Requiere: Token JWT
- Crea un nuevo plato en MongoDB

**Read (Leer)**
- Endpoint: `GET /api/platos` (todos)
- Endpoint: `GET /api/platos/:id` (uno específico)
- No requiere autenticación (públicos)

**Update (Actualizar)**
- Endpoint: `PUT /api/platos/:id`
- Requiere: Token JWT
- Actualiza campos del plato

**Delete (Eliminar)**
- Endpoint: `DELETE /api/platos/:id`
- Requiere: Token JWT
- Elimina plato de la base de datos

### 3. Sistema de Reservas

Los usuarios pueden:
1. Llenar formulario de reserva
2. Generar mensaje pre-construido
3. Enviar al chat/WhatsApp del restaurante

---

## 🧑‍💻 Contribuir

Si quieres mejorar este proyecto educativo:

1. **Fork** el repositorio
2. **Crea una rama** para tu feature (`git checkout -b feature/mejora`)
3. **Commit** tus cambios (`git commit -m 'Agrega nueva mejora'`)
4. **Push** a la rama (`git push origin feature/mejora`)
5. **Abre un Pull Request**

### Ideas para mejorar
- [ ] Agregar tests unitarios e integración
- [ ] Implementar filtros en el menú (por categoría, precio)
- [ ] Sistema de valoraciones de platos
- [ ] Historial de reservas del cliente
- [ ] Notificaciones por email
- [ ] Dashboard con estadísticas para admin
- [ ] Soporte para múltiples idiomas
- [ ] Integración con sistemas de pago

---

## 📚 Recursos de Aprendizaje

### Conceptos clave usado en el proyecto

- **[Express.js Docs](https://expressjs.com/)** - Framework web
- **[Mongoose Docs](https://mongoosejs.com/)** - ODM MongoDB
- **[JWT.io](https://jwt.io/)** - Autenticación con tokens
- **[MongoDB Atlas](https://www.mongodb.com/cloud/atlas)** - Base de datos
- **[RESTful API Best Practices](https://restfulapi.net/)** - Diseño de APIs

### Tutoriales recomendados
1. REST APIs con Node.js y Express
2. Mongoose para modelado de datos
3. Autenticación JWT en aplicaciones web
4. Desarrollo fullstack con MongoDB

---

## ⚠️ Notas de Seguridad

- **Nunca** hagas commit del archivo `.env`
- **Nunca** uses `JWT_SECRET` débil o predecible
- **Valida siempre** los datos de entrada
- **Usa HTTPS** en producción (no HTTP)
- **Encripta** las contraseñas en la base de datos

---

## 📞 Soporte y Contacto

- **Autor**: marchettaag-dev
- **Repositorio**: [GitHub](https://github.com/marchettaag-dev/restaurant-website)
- **Issues**: [Reportar problema](https://github.com/marchettaag-dev/restaurant-website/issues)

---

## 📄 Licencia

Este proyecto está bajo la licencia **ISC**. Consulta `LICENSE` para más detalles.

---

**Hecho con ❤️ como proyecto de aprendizaje en Programación 3**

*Última actualización: Junio 2026*
