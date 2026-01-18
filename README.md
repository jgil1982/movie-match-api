# Movie Match API

> API REST de películas con arquitectura MVC, middlewares profesionales y documentación Swagger - Lab 12: Middleware, Documentación y Deploy

Una API completa para explorar películas clásicas del cine con enriquecimiento de contenido mediante IA.

## 🎬 Características

- ✅ Arquitectura MVC (Model-View-Controller)
- ✅ Middlewares personalizados (logging, manejo de errores, CORS)
- ✅ Documentación interactiva con Swagger UI
- ✅ Integración con OpenRouter para contenido enriquecido
- ✅ Filtrado avanzado por género y rating
- ✅ Manejo de errores centralizado
- ✅ Deploy en producción (Render)

## 🚀 Demo en Vivo

- **API en producción:** https://movie-match-api.onrender.com
- **Documentación Swagger:** https://movie-match-api.onrender.com/docs
- **Repositorio GitHub:** https://github.com/JGIL1982/movie-match-api

## 🛠️ Tecnologías

- **Node.js** - Entorno de ejecución
- **Express.js** - Framework web
- **Swagger UI** - Documentación interactiva
- **OpenRouter** - Enriquecimiento con IA
- **CORS** - Cross-Origin Resource Sharing
- **dotenv** - Gestión de variables de entorno

## 📦 Instalación Local

### Prerrequisitos
- Node.js v18 o superior
- npm
- Cuenta en OpenRouter (opcional, para enriquecimiento con IA)

### Pasos

1. **Clonar el repositorio:**
```bash
git clone https://github.com/JGIL1982/movie-match-api.git
cd movie-match-api
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Configurar variables de entorno:**
```bash
# Copiar el archivo de ejemplo
cp .env.example .env

# Editar .env y agregar tu API key de OpenRouter
# PORT=3000
# OPENROUTER_API_KEY=tu-api-key-real-aqui
```

4. **Iniciar el servidor:**
```bash
# Modo producción
npm start

# Modo desarrollo (auto-reload)
npm run dev
```

5. **Acceder a la API:**
- API: http://localhost:3000
- Documentación: http://localhost:3000/docs

## 🌐 Endpoints

### GET `/movies`
Obtiene todas las películas con filtros opcionales.

**Query params:**
- `genre` (string): Filtrar por género (ej: "Sci-Fi", "Drama")
- `minRating` (number): Rating mínimo (ej: 8.5)

**Ejemplo:**
```bash
curl http://localhost:3000/movies?genre=Sci-Fi&minRating=8.5
```

### GET `/movies/:id`
Obtiene una película específica por ID.

**Ejemplo:**
```bash
curl http://localhost:3000/movies/1
```

### GET `/movies/discover`
Obtiene películas aleatorias enriquecidas con anécdotas generadas por IA.

**Ejemplo:**
```bash
curl http://localhost:3000/movies/discover
```

**Respuesta:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "The Shawshank Redemption",
      "year": 1994,
      "genre": "Drama",
      "director": "Frank Darabont",
      "rating": 9.3,
      "description": "Two imprisoned men bond over a number of years...",
      "ai_enriched": "La película fue un fracaso en taquilla pero se convirtió en un éxito masivo en VHS y streaming."
    }
  ],
  "count": 10
}
```

### GET `/docs`
Accede a la documentación interactiva de Swagger UI.

## 📁 Estructura del Proyecto

```
movie-match-api/
├── controllers/
│   └── movieController.js       # Controladores de rutas
├── services/
│   ├── movieService.js          # Lógica de negocio
│   └── aiService.js             # Integración OpenRouter
├── routes/
│   └── movies.js                # Definición de rutas
├── middlewares/
│   ├── logger.js                # Logging con timestamp
│   ├── errorHandler.js          # Manejo de errores
│   └── notFound.js              # Rutas 404
├── docs/
│   └── swagger.yaml             # Documentación OpenAPI
├── data/
│   └── movies.js                # Base de datos (15 películas)
├── index.js                     # Punto de entrada
├── .env.example                 # Ejemplo de variables
├── .gitignore                   # Archivos ignorados
├── package.json                 # Configuración del proyecto
└── README.md                    # Este archivo
```

## 🔑 Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con:

```env
PORT=3000
OPENROUTER_API_KEY=tu-api-key-de-openrouter
```

**Nota:** Si no configuras `OPENROUTER_API_KEY`, el endpoint `/movies/discover` retornará películas sin enriquecimiento (`ai_enriched: null`).

## 🧪 Pruebas

### Con curl:
```bash
# Listar todas las películas
curl http://localhost:3000/movies

# Filtrar por género
curl http://localhost:3000/movies?genre=Crime

# Obtener película por ID
curl http://localhost:3000/movies/5

# Descubrir con IA
curl http://localhost:3000/movies/discover
```

### Con Swagger UI:
1. Abre http://localhost:3000/docs
2. Selecciona un endpoint
3. Click en "Try it out"
4. Click en "Execute"

## 🚢 Deploy en Render

### Configuración en Render:

1. **Build Command:** `npm install`
2. **Start Command:** `npm start`
3. **Variables de entorno:**
   - `OPENROUTER_API_KEY`: Tu API key de OpenRouter

### Actualizar URL en Swagger:

Después del deploy, actualiza `docs/swagger.yaml`:

```yaml
servers:
  - url: http://localhost:3000
    description: Desarrollo local
  - url: https://TU-APP.onrender.com
    description: Producción
```

## 🎯 Middlewares Implementados

### Logger
Registra todas las peticiones con timestamp ISO:
```
[2026-01-15T19:30:40.045Z] GET /movies/1
```

### Error Handler
Captura y formatea todos los errores:
```json
{
  "success": false,
  "error": "Mensaje del error"
}
```

### Not Found
Maneja rutas inexistentes con 404:
```json
{
  "success": false,
  "error": "Ruta GET /ruta-inexistente no encontrada"
}
```

## 📊 Base de Datos

El proyecto incluye 15 películas clásicas:
- The Shawshank Redemption (9.3)
- The Godfather (9.2)
- The Dark Knight (9.0)
- Pulp Fiction (8.9)
- Y más...

Cada película contiene:
- `id`: Identificador único
- `title`: Título
- `year`: Año de estreno
- `genre`: Género
- `director`: Director(es)
- `rating`: Calificación (0-10)
- `description`: Sinopsis
- `ai_enriched`: Anécdota generada por IA (opcional)

## 👨‍💻 Autor

**Jorge Gil**
- GitHub: [@JGIL1982](https://github.com/JGIL1982)
- Lab 12: Middleware, Documentación y Deploy
- Enter Tech Code - Módulo 3: Backend Development

## 📝 Licencia

ISC

---

**Desarrollado como parte del Módulo 3: Backend Development**
