# 🎓 Guía de Documentación - Aprende a Documentar tu Proyecto

Este documento te enseña **cómo documentar correctamente** proyectos de software. Usaremos tu proyecto como ejemplo.

---

## 📚 Índice

1. [Qué es Documentación](#qué-es-documentación)
2. [Tipos de Documentación](#tipos-de-documentación)
3. [README.md - La Guía Principal](#readmemd---la-guía-principal)
4. [API Documentation](#api-documentation)
5. [Documentación de Código](#documentación-de-código)
6. [Archivos Complementarios](#archivos-complementarios)
7. [Checklist de Documentación](#checklist-de-documentación)

---

## 🤔 ¿Qué es Documentación?

La documentación es toda la **información escrita que ayuda a otros (y a ti en el futuro) a entender y usar tu código**.

### ¿Por qué es importante?

| Razón | Ejemplo |
|-------|---------|
| **Reduce confusión** | Alguien (o tú en 6 meses) necesita entender cómo funciona |
| **Acelera desarrollo** | Nuevos desarrolladores se incorporan más rápido |
| **Previene errores** | Documentar requiere pensar bien el diseño |
| **Facilita mantenimiento** | Es más fácil corregir código documentado |
| **Atrae colaboradores** | Proyectos bien documentados son más atractivos |

---

## 📖 Tipos de Documentación

### 1️⃣ **README.md** (Presentación General)
Archivo más importante. Ve en la raíz del proyecto.

**Qué incluir:**
- Título y descripción
- Características principales
- Stack tecnológico
- Instalación paso a paso
- Uso básico
- Estructura de carpetas
- Links útiles

**📍 Ubicación**: `/README.md`

**👁️ Ejemplo en tu proyecto**: Ya lo creé 👆

---

### 2️⃣ **Comentarios de Código** (Explicaciones Inline)
Notas dentro del código para explicar lógica compleja.

**Qué documentar:**
- ❌ Código obvio: `const x = 1; // asigna 1 a x`
- ✅ Lógica compleja: `// Validamos que el token no haya expirado`

**Ejemplo en tu código:**

```javascript
// ❌ MALO - Obvio
const resultado = platosArray.filter(p => p.disponible === true);
// Filtra los platos disponibles

// ✅ BUENO - Explica el por qué
const platosDisponibles = platosArray.filter(p => p.disponible === true);
// Los platos deshabilitados no deben mostrarse en la carta
// para no confundir a los clientes
```

**Regla de oro**: Comenta el **POR QUÉ**, no el **QUÉ**

---

### 3️⃣ **JSDoc** (Documentación de Funciones)
Formato estándar para documentar funciones en JavaScript.

**Estructura:**
```javascript
/**
 * Breve descripción de qué hace la función
 * 
 * @param {tipo} nombreParam - Descripción del parámetro
 * @returns {tipo} Descripción de lo que retorna
 * @throws {Error} Descripción de errores posibles
 */
function nombreFuncion(param1, param2) {
  // código
}
```

**Ejemplo en tu proyecto:**

```javascript
/**
 * Obtiene todos los platos disponibles para ese día
 * 
 * @param {Array} platos - Array de objetos plato de la BD
 * @param {Boolean} delDia - Si es true, filtra solo platos del día
 * @returns {Array} Array de platos filtrados
 * @throws {Error} Si el parámetro platos no es un array
 */
function filtrarPlatos(platos, delDia = false) {
  if (!Array.isArray(platos)) {
    throw new Error("El parámetro platos debe ser un array");
  }
  
  return platos.filter(plato => {
    if (delDia) return plato.delDia === true;
    return plato.disponible === true;
  });
}
```

**Ventajas:**
- IDE (VS Code) auto-completa basado en JSDoc
- Puedes generar documentación automática
- Otros desarrolladores entienden rápido qué hacer

---

### 4️⃣ **CONTRIBUTING.md** (Guía para Colaboradores)
Explica cómo otros pueden ayudar en tu proyecto.

**Qué incluir:**
- Cómo reportar bugs
- Cómo sugerir mejoras
- Proceso de pull requests
- Estándares de código
- Ambiente de desarrollo

---

### 5️⃣ **API.md** (Documentación de Endpoints)
Detalla todos los endpoints de tu API REST.

**Qué incluir:**
- Descripción del endpoint
- Método HTTP
- URL
- Headers requeridos
- Body de request
- Ejemplos de response
- Códigos de error

**Ejemplo:**
```markdown
## Crear Plato

**Descripción**: Crea un nuevo plato en el menú

**Endpoint**: `POST /api/platos`

**Autenticación**: Sí (requiere JWT)

**Headers**:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

**Body**:
```json
{
  "nombre": "Bife de chorizo",
  "descripcion": "Jugoso bife",
  "precio": 650,
  "categoria": "Platos principales",
  "delDia": true
}
```

**Response** (201 Created):
```json
{
  "mensaje": "Plato creado exitosamente",
  "plato": {
    "_id": "123abc",
    "nombre": "Bife de chorizo",
    ...
  }
}
```

**Errores posibles**:
- `400` - Datos incompletos o inválidos
- `401` - No autenticado
- `409` - Plato ya existe
```

---

## 📝 README.md - La Guía Principal

Es el **corazón** de la documentación. Esto es lo que ven primero en GitHub.

### Estructura recomendada

```markdown
# 🏠 Nombre del Proyecto

> Breve descripción de qué es el proyecto

## 📋 Tabla de Contenidos
- [Descripción](#descripción)
- [Características](#características)
...

## 📖 Descripción
- Qué es
- Para qué sirve
- Caso de uso

## ✨ Características
- Feature 1
- Feature 2
- Feature 3

## 🛠️ Stack Tecnológico
- Lenguajes
- Frameworks
- BD
- Tools

## 📦 Requisitos Previos
- Node.js v14+
- npm v6+
- MongoDB

## 🚀 Instalación
Paso a paso claro

## 💻 Uso
Cómo ejecutar y usar

## 📁 Estructura del Proyecto
```
proyecto/
├── src/
│   ├── routes/
│   └── models/
└── public/
```

## 🔌 API Endpoints
- GET /api/...
- POST /api/...
- etc

## 🧪 Testing
Cómo ejecutar tests

## 🐛 Problemas Comunes
Soluciones a errores frecuentes

## 📚 Recursos
Links a documentación

## 📄 Licencia
ISC, MIT, etc

## ✍️ Autor
Tu nombre
```

---

## 🔌 API Documentation

### Estructura de documentación de API

Para cada endpoint debes documentar:

#### 1. **Información General**
```
- Nombre descriptivo
- Qué hace (breve)
- Permisos requeridos
```

#### 2. **Detalles Técnicos**
```
- Método HTTP (GET, POST, PUT, DELETE)
- URL completa
- Path parameters
- Query parameters
```

#### 3. **Autenticación**
```
- ¿Requiere login?
- ¿Qué rol/permisos?
- Cómo enviar el token
```

#### 4. **Requestbody**
```json
{
  "campo": "tipo - descripción"
}
```

#### 5. **Response (Éxito)**
```
- Status code
- Body de ejemplo
- Explicación de campos
```

#### 6. **Response (Errores)**
```
- Posibles errores
- Status codes
- Mensajes de error
```

#### 7. **Ejemplos Prácticos**
```bash
curl -X POST http://localhost:3000/api/platos \
  -H "Authorization: Bearer token" \
  -d '{"nombre":"Milanesa","precio":450}'
```

---

## 💬 Documentación de Código

### Comentarios Efectivos

#### ✅ BUENOS comentarios explican el POR QUÉ

```javascript
// Convertimos el precio a número porque MongoDB a veces lo guarda como string
const precioNumero = parseFloat(plato.precio);

// Usamos deleteSoft (marcar como deleted) en lugar de delete físico
// para mantener referencia histórica de platos anteriores
plato.eliminado = true;
await plato.save();
```

#### ❌ MALOS comentarios explican el QUÉ

```javascript
// Incrementamos contador
contador++;

// Verificamos si existe
if (usuario) {
  // Retornamos usuario
  return usuario;
}
```

### Bloques de Comentarios (JSDoc)

**Función simple:**
```javascript
/**
 * Calcula el total de una orden
 * @param {Array} items - Items de la orden
 * @returns {Number} Total en pesos
 */
function calcularTotal(items) {
  return items.reduce((sum, item) => sum + item.precio, 0);
}
```

**Función con errores:**
```javascript
/**
 * Autentica un usuario
 * @param {String} email - Email del usuario
 * @param {String} password - Contraseña sin encriptar
 * @returns {Object} {success: boolean, token: string}
 * @throws {Error} Si email no existe
 * @throws {Error} Si password es incorrecto
 */
async function login(email, password) {
  const usuario = await Usuario.findOne({ email });
  if (!usuario) throw new Error("Usuario no encontrado");
  
  const valido = await bcrypt.compare(password, usuario.passwordHash);
  if (!valido) throw new Error("Contraseña incorrecta");
  
  const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET);
  return { success: true, token };
}
```

**Clase/Constructor:**
```javascript
/**
 * Clase para gestionar platos del menú
 * @class Plato
 */
class Plato {
  /**
   * Crea un nuevo plato
   * @param {String} nombre - Nombre del plato
   * @param {Number} precio - Precio en pesos
   * @param {Boolean} disponible - Si está disponible
   */
  constructor(nombre, precio, disponible = true) {
    this.nombre = nombre;
    this.precio = precio;
    this.disponible = disponible;
  }
  
  /**
   * Marca el plato como no disponible
   */
  desactivar() {
    this.disponible = false;
  }
}
```

---

## 📂 Archivos Complementarios

### Archivos clave a documentar:

#### 1. **SETUP.md** - Configuración inicial
```markdown
# 🔧 Guía de Setup

## Paso 1: Clonar
## Paso 2: Instalar dependencias
## Paso 3: Variables de entorno
## Paso 4: Conectar a MongoDB
## Paso 5: Verificar que funciona
```

#### 2. **DEPLOYMENT.md** - Desplegar a producción
```markdown
# 🚀 Desplegar a Producción

## Opción 1: Heroku
## Opción 2: Railway
## Opción 3: Servidor propio
```

#### 3. **TROUBLESHOOTING.md** - Solución de problemas
```markdown
# 🐛 Problemas Comunes

## Error: "Cannot find module"
Solución: npm install

## Error: "Connection refused"
Solución: Verifica que MongoDB esté corriendo
```

#### 4. **ARCHITECTURE.md** - Arquitectura del proyecto
```markdown
# 🏗️ Arquitectura

## Flujo de autenticación
## Flujo de petición a BD
## Diagrama de componentes
```

---

## ✅ Checklist de Documentación

Antes de publicar tu proyecto, verifica:

### README
- ✅ Título claro y descriptivo
- ✅ Descripción breve (qué es, para qué)
- ✅ Características principales listadas
- ✅ Stack tecnológico documentado
- ✅ Requisitos previos (Node, npm, etc)
- ✅ Pasos de instalación claros
- ✅ Cómo ejecutar en local
- ✅ Estructura de carpetas explicada
- ✅ Links a documentación externa
- ✅ Información de contacto/autor

### Código
- ✅ Funciones críticas tienen JSDoc
- ✅ Comentarios explican el POR QUÉ, no el QUÉ
- ✅ Variables tienen nombres descriptivos
- ✅ No hay "código mágico" sin explicar
- ✅ Errores están manejados
- ✅ Edge cases están documentados

### API
- ✅ Todos los endpoints documentados
- ✅ Ejemplos de request/response
- ✅ Códigos de error explicados
- ✅ Autenticación clara
- ✅ Formatos de datos especificados

### Proyecto
- ✅ .env.example existe
- ✅ .gitignore está configurado
- ✅ package.json tiene descripción
- ✅ Scripts están nombrados claramente
- ✅ CONTRIBUTING.md existe
- ✅ LICENSE está presente

---

## 🎯 Próximos Pasos para tu Proyecto

Para completar la documentación de **restaurant-website**, deberías crear:

1. **`API.md`** - Documentar todos los endpoints
2. **`CONTRIBUTING.md`** - Cómo contribuir
3. **`ARCHITECTURE.md`** - Explicar la arquitectura
4. **`.env.example`** - Mostrar qué variables se necesitan
5. **`TROUBLESHOOTING.md`** - Problemas comunes
6. **JSDoc en archivos clave** - Documentar funciones importantes

---

## 🏆 Buenas Prácticas

### 1. **Sé Específico**
```
❌ MALO: "Instala las cosas"
✅ BUENO: "npm install" - esto instala las dependencias de package.json
```

### 2. **Incluye Ejemplos**
```
❌ MALO: "Envía un JSON"
✅ BUENO: 
{
  "nombre": "Milanesa",
  "precio": 450
}
```

### 3. **Actualiza Constantemente**
Si cambias código, actualiza documentación. Documentación desactualizada es peor que no tener.

### 4. **Usa Formato Consistente**
- Emojis consistentes 🎯
- Estructuras iguales en todos los archivos
- Indentación uniforme

### 5. **Links Funcionales**
Todos los links deben existir. Links rotos frustran a lectores.

---

## 📚 Recursos Externos

- **[GitHub - Writing Documentation](https://guides.github.com/features/wikis/)**
- **[CommonMark Markdown Spec](https://spec.commonmark.org/)**
- **[JSDoc Official](https://jsdoc.app/)**
- **[Google Developer Style Guide](https://developers.google.com/style)**

---

**¡Recuerda**: Buena documentación = código que otros (y tú) pueden entender fácilmente 🚀

