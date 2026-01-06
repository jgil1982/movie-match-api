
import express from 'express';
import { movies } from './data/movies.js';


const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.json({
    message: 'Bienvenido a Movie Match API - Jorge Gil 🎬',
    endpoints: {
      allMovies: 'GET /movies',
      movieById: 'GET /movies/:id',
      randomMovie: 'GET /movies/random'
    }
  });
});

app.get('/movies', (req, res) => {
  res.json(movies);
});

// Película aleatoria (DEBE ir antes de :id)
app.get('/movies/random', (req, res) => {
  const randomIndex = Math.floor(Math.random() * movies.length);
  res.json(movies[randomIndex]);
});

// Película por ID
app.get('/movies/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const movie = movies.find(m => m.id === id);

  if (!movie) {
    return res.status(404).json({
      error: 'Película no encontrada',
      id: id
    });
  }

  res.json(movie);
});

app.listen(PORT, () => {
  console.log(`🎬 Movie Match API corriendo en http://localhost:${PORT}`);
});
