# Movie Match API

> API REST completa con PostgreSQL, Prisma ORM, relaciones 1:N, dashboard de estadísticas y UI React - Lab 16: Dashboard + Advanced Queries

Sistema completo de gestión de películas y reviews con estadísticas en tiempo real, búsqueda avanzada y transacciones atómicas.

## 🎬 Características

- ✅ Base de datos PostgreSQL con Prisma ORM
- ✅ Relaciones 1:N (Movie → Reviews) con Cascade
- ✅ Dashboard de estadísticas con agregaciones
- ✅ Búsqueda avanzada multi-filtro con paginación
- ✅ Transacciones atómicas para operaciones críticas
- ✅ UI React con dashboard de métricas
- ✅ Enums y constraints de base de datos
- ✅ Documentación interactiva Swagger
- ✅ Deploy en producción (Render + Vercel)

## 🚀 Demo en Vivo

- **API en producción:** https://movie-match-api-44vf.onrender.com
- **Documentación Swagger:** https://movie-match-api-44vf.onrender.com/docs
- **Repositorio GitHub:** https://github.com/JGIL1982/movie-match-api

## 🛠️ Tecnologías

### Backend
- **Node.js** - Entorno de ejecución
- **Express.js** - Framework web
- **Prisma ORM** - ORM para PostgreSQL
- **PostgreSQL** - Base de datos relacional
- **Swagger UI** - Documentación interactiva

### Frontend
- **React** - Framework UI
- **Vite** - Build tool
- **CSS3** - Estilos

## 📦 Instalación Local

### Prerrequisitos
- Node.js v18 o superior
- npm
- PostgreSQL (Neon, Supabase, Railway, o local)

### Pasos

**1. Clonar el repositorio:**
```bash
git clone https://github.com/JGIL1982/movie-match-api.git
cd movie-match-api
```

**2. Instalar dependencias:**
```bash
npm install
cd ui && npm install && cd ..
```

**3. Configurar variables de entorno:**
```bash
cp .env.example .env
```

Editar `.env` con tu configuración:
```env
PORT=3000
DATABASE_URL="postgresql://user:password@host:port/database?sslmode=require"
OPENROUTER_API_KEY=tu-api-key-opcional
```

**4. Configurar base de datos:**
```bash
npx prisma migrate dev
npx prisma db seed
```

**5. Iniciar servidor backend:**
```bash
npm start
```

**6. Iniciar UI frontend (en otra terminal):**
```bash
cd ui
npm run dev
```

**7. Acceder:**
- API: http://localhost:3000
- Docs: http://localhost:3000/docs
- UI: http://localhost:5173

## 🌐 Endpoints

### Películas

**GET `/movies`**
Obtiene todas las películas con filtros opcionales.
```bash
curl "http://localhost:3000/movies?genre=SCIFI&minRating=8"
```

**GET `/movies/search`**
Búsqueda avanzada con múltiples filtros y paginación.
```bash
curl "http://localhost:3000/movies/search?q=matrix&genre=SCIFI&yearMin=1990&yearMax=2005&ratingMin=8&page=1&limit=10"
```

**GET `/movies/:id`**
Obtiene una película con sus reviews.
```bash
curl http://localhost:3000/movies/1
```

**POST `/movies`**
Crea una nueva película.
```bash
curl -X POST http://localhost:3000/movies \
  -H "Content-Type: application/json" \
  -d '{"title":"Inception","year":2010,"rating":8.8,"genre":"SCIFI"}'
```

**PUT `/movies/:id`**
Actualiza una película.

**DELETE `/movies/:id`**
Elimina una película (y sus reviews por Cascade).

**DELETE `/movies/:id/transaction`**
Elimina película con transacción atómica explícita.

### Reviews

**POST `/movies/:id/reviews`**
Agrega una review a una película.
```bash
curl -X POST http://localhost:3000/movies/1/reviews \
  -H "Content-Type: application/json" \
  -d '{"author":"Juan","rating":5,"comment":"Excelente película"}'
```

**DELETE `/movies/:movieId/reviews/:reviewId`**
Elimina una review.

### Estadísticas

**GET `/stats`**
Dashboard completo de estadísticas.
```bash
curl http://localhost:3000/stats
```

Respuesta:
```json
{
  "success": true,
  "data": {
    "totalMovies": 10,
    "totalReviews": 5,
    "avgRating": 8.9,
    "moviesByGenre": [
      {"genre": "DRAMA", "count": 3, "avgRating": 9.1}
    ],
    "topRated": [...],
    "mostReviewed": [...],
    "recentReviews": [...]
  }
}
```

### Logros Adicionales

**GET `/movies/without-reviews`**
Películas sin reviews.

**GET `/movies/recent`**
Películas agregadas en los últimos 7 días.

**GET `/movies/export`**
Exporta datos en formato CSV-friendly.

**GET `/movies/discover`**
Películas aleatorias con enriquecimiento IA.

**GET `/movies/genres`**
Lista de géneros disponibles.

## 📁 Estructura del Proyecto

```
movie-match-api/
├── prisma/
│   ├── schema.prisma          # Schema de base de datos
│   └── seed.js                # Datos iniciales
├── controllers/
│   ├── movieController.js     # Controladores de películas
│   ├── reviewController.js    # Controladores de reviews
│   └── statsController.js     # Controladores de estadísticas
├── services/
│   ├── movieService.js        # Lógica de negocio
│   ├── reviewService.js       # Lógica de reviews
│   ├── statsService.js        # Agregaciones y estadísticas
│   └── aiService.js           # Integración OpenRouter
├── routes/
│   ├── movies.js              # Rutas de películas
│   ├── reviews.js             # Rutas de reviews
│   └── stats.js               # Rutas de estadísticas
├── middlewares/
│   ├── logger.js              # Logging
│   ├── responseTime.js        # Medición de tiempos
│   ├── errorHandler.js        # Manejo de errores
│   └── notFound.js            # Rutas 404
├── lib/
│   └── prisma.js              # Cliente Prisma
├── docs/
│   └── swagger.yaml           # Documentación OpenAPI
├── ui/
│   ├── src/
│   │   ├── App.jsx            # Componente principal
│   │   ├── components/
│   │   │   └── Dashboard.jsx  # Dashboard de estadísticas
│   │   └── main.jsx           # Entry point
│   ├── package.json
│   └── vite.config.js
├── index.js                   # Servidor Express
├── .env.example               # Ejemplo de variables
├── package.json
└── README.md
```

## 🗄️ Schema de Base de Datos

```prisma
enum Genre {
  ACTION
  COMEDY
  DRAMA
  HORROR
  SCIFI
  THRILLER
}

model Movie {
  id        Int      @id @default(autoincrement())
  title     String
  year      Int
  rating    Float
  genre     Genre
  poster    String?
  reviews   Review[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Review {
  id        Int      @id @default(autoincrement())
  movie     Movie    @relation(fields: [movieId], references: [id], onDelete: Cascade)
  movieId   Int
  author    String
  rating    Int
  comment   String
  createdAt DateTime @default(now())
}
```

## 🔑 Variables de Entorno

```env
PORT=3000
DATABASE_URL="postgresql://user:password@host:port/database?sslmode=require"
OPENROUTER_API_KEY=tu-api-key-opcional
```

## 🧪 Pruebas

### Estadísticas
```bash
curl http://localhost:3000/stats
```

### Búsqueda avanzada
```bash
# Por título
curl "http://localhost:3000/movies/search?q=matrix"

# Por género y rating
curl "http://localhost:3000/movies/search?genre=SCIFI&ratingMin=8"

# Rango de años con paginación
curl "http://localhost:3000/movies/search?yearMin=1990&yearMax=2000&page=1&limit=5"

# Todos los filtros combinados
curl "http://localhost:3000/movies/search?q=the&genre=ACTION&yearMin=2000&ratingMin=8"
```

### Reviews
```bash
# Agregar review
curl -X POST http://localhost:3000/movies/1/reviews \
  -H "Content-Type: application/json" \
  -d '{"author":"María","rating":5,"comment":"Obra maestra"}'

# Ver película con reviews
curl http://localhost:3000/movies/1
```

### Logros adicionales
```bash
# Películas sin reviews
curl http://localhost:3000/movies/without-reviews

# Películas recientes (últimos 7 días)
curl http://localhost:3000/movies/recent

# Exportar datos
curl http://localhost:3000/movies/export
```

## 🎨 UI React

El dashboard incluye:
- **Métricas principales:** Total de películas, reviews, rating promedio
- **Top películas:** Mejor calificadas y más comentadas
- **Distribución por género:** Gráficos de barras
- **Actividad reciente:** Últimas 10 reviews

### Capturas

Dashboard muestra en tiempo real:
- Cards con métricas clave
- Rankings de películas
- Gráficos por género
- Feed de actividad

## 🚢 Deploy

### Backend en Render

**Build Command:** `npm install && npx prisma generate`
**Start Command:** `npm start`

**Variables de entorno:**
- `DATABASE_URL`: URL de PostgreSQL
- `OPENROUTER_API_KEY`: API key opcional

### Frontend en Vercel

**Build Command:** `cd ui && npm install && npm run build`
**Output Directory:** `ui/dist`

## 🎯 Características Técnicas

### Agregaciones Prisma
```javascript
// Ejecutadas en paralelo
const [totalMovies, totalReviews, avgRating] = await Promise.all([
  prisma.movie.count(),
  prisma.review.count(),
  prisma.movie.aggregate({ _avg: { rating: true } })
]);
```

### Búsqueda Multi-Filtro
```javascript
const where = { AND: [] };
if (q) where.AND.push({ title: { contains: q, mode: 'insensitive' } });
if (genre) where.AND.push({ genre });
if (yearMin || yearMax) where.AND.push({ year: { gte: yearMin, lte: yearMax } });
```

### Transacciones Atómicas
```javascript
await prisma.$transaction(async (tx) => {
  await tx.review.deleteMany({ where: { movieId: id } });
  await tx.movie.delete({ where: { id } });
});
```

### Paginación
```javascript
{
  data: [...],
  pagination: {
    page: 1,
    limit: 10,
    total: 45,
    pages: 5
  }
}
```

## 👨‍💻 Autor

**Jorge Gil**
- GitHub: [@JGIL1982](https://github.com/JGIL1982)
- Lab 16: Dashboard + Advanced Queries
- Enter Tech Code - Módulo 4: Backend + Database

## 📝 Licencia

ISC

---

**Desarrollado como parte del Módulo 4: Backend Development con PostgreSQL y Prisma ORM**
