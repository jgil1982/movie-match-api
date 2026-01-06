# Movie Match API

> API REST de películas construida con Express.js como parte del Lab 09: Express Fundamentals

Una API simple y eficiente para explorar películas clásicas del cine. Permite listar todas las películas, buscar por ID, y obtener recomendaciones aleatorias.

## 🎬 Características

- ✅ Listar todas las películas disponibles
- ✅ Buscar película específica por ID
- ✅ Obtener película aleatoria para recomendaciones
- ✅ Manejo de errores con códigos HTTP apropiados
- ✅ Respuestas en formato JSON

## 🚀 Endpoints

### GET `/`
Información de bienvenida y documentación de endpoints disponibles.

**Respuesta:**
```json
{
  "message": "Bienvenido a Movie Match API - Jorge Gil 🎬",
  "endpoints": {
    "allMovies": "GET /movies",
    "movieById": "GET /movies/:id",
    "randomMovie": "GET /movies/random"
  }
}
```

### GET `/movies`
Devuelve todas las películas disponibles.

**Respuesta:** Array de 15 películas con información completa.

### GET `/movies/:id`
Busca una película específica por su ID.

**Parámetros:**
- `id` (number): ID de la película (1-15)

**Ejemplo:**
```
GET /movies/1
```

**Respuesta exitosa (200):**
```json
{
  "id": 1,
  "title": "The Shawshank Redemption",
  "year": 1994,
  "genre": "Drama",
  "director": "Frank Darabont",
  "rating": 9.3,
  "description": "Two imprisoned men bond over a number of years..."
}
```

**Respuesta error (404):**
```json
{
  "error": "Película no encontrada",
  "id": 999
}
```

### GET `/movies/random`
Devuelve una película aleatoria del catálogo.

**Respuesta:** Objeto con información completa de una película al azar.

## 📦 Instalación

### Prerrequisitos
- Node.js (v18 o superior)
- npm

### Pasos

1. Clona el repositorio:
```bash
git clone <tu-repo-url>
cd movie-match-api
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor:
```bash
# Modo producción
npm start

# Modo desarrollo (con auto-reload)
npm run dev
```

4. La API estará disponible en: `http://localhost:3000`

## 🛠️ Tecnologías

- **Node.js** - Entorno de ejecución
- **Express.js** - Framework web minimalista
- **ESM** - Módulos JavaScript modernos

## 📁 Estructura del Proyecto

```
movie-match-api/
├── data/
│   └── movies.js          # Base de datos de películas (15 películas)
├── node_modules/          # Dependencias (git-ignored)
├── .gitignore            # Archivos ignorados por Git
├── index.js              # Servidor Express y rutas
├── package.json          # Configuración del proyecto
├── package-lock.json     # Versiones exactas de dependencias
└── README.md             # Este archivo
```

## 🎯 Scripts Disponibles

```bash
# Iniciar servidor (producción)
npm start

# Iniciar en modo desarrollo con nodemon
npm run dev
```

## 📊 Base de Datos

El proyecto utiliza un array en memoria con 15 películas clásicas que incluyen:
- The Shawshank Redemption
- The Godfather
- The Dark Knight
- Pulp Fiction
- Y más...

Cada película contiene:
- `id`: Identificador único
- `title`: Título de la película
- `year`: Año de estreno
- `genre`: Género
- `director`: Director(es)
- `rating`: Calificación (0-10)
- `description`: Sinopsis

## 🧪 Pruebas

Puedes probar la API usando:

**Navegador:**
```
http://localhost:3000/
http://localhost:3000/movies
http://localhost:3000/movies/1
http://localhost:3000/movies/random
```

**Thunder Client / Postman / curl:**
```bash
curl http://localhost:3000/movies
curl http://localhost:3000/movies/5
curl http://localhost:3000/movies/random
```

## 👨‍💻 Autor

**Jorge Gil**
- Lab 09: Express Fundamentals
- Enter Tech Code

## 📝 Licencia

ISC

---

**Desarrollado como parte del Módulo 3: Backend Development**
