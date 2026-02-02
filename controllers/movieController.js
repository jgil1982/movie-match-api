import * as movieService from '../services/movieService.js';
import * as aiService from '../services/aiService.js';

const sendSuccess = (res, data) => {
  const dataArray = Array.isArray(data) ? data : [data];
  res.json({ success: true, data: dataArray, count: dataArray.length });
};

const sendError = (res, status, message) => {
  res.status(status).json({ success: false, error: message });
};

export async function getMovies(req, res) {
  try {
    const movies = await movieService.getAllMovies(req.query);
    sendSuccess(res, movies);
  } catch (error) {
    sendError(res, 500, error.message);
  }
}

export async function getMovieById(req, res) {
  try {
    const movie = await movieService.getMovieById(req.params.id);
    if (!movie) return sendError(res, 404, `Película ID ${req.params.id} no encontrada`);
    sendSuccess(res, movie);
  } catch (error) {
    sendError(res, 500, error.message);
  }
}

export async function createMovie(req, res) {
  try {
    const movie = await movieService.createMovie(req.body);
    res.status(201).json({ success: true, data: [movie], count: 1 });
  } catch (error) {
    sendError(res, 500, error.message);
  }
}

export async function updateMovie(req, res) {
  try {
    const movie = await movieService.updateMovie(req.params.id, req.body);
    sendSuccess(res, movie);
  } catch (error) {
    if (error.code === 'P2025') {
      return sendError(res, 404, `Película ID ${req.params.id} no encontrada`);
    }
    sendError(res, 500, error.message);
  }
}

export async function deleteMovie(req, res) {
  try {
    await movieService.deleteMovie(req.params.id);
    res.status(204).send();
  } catch (error) {
    if (error.code === 'P2025') {
      return sendError(res, 404, `Película ID ${req.params.id} no encontrada`);
    }
    sendError(res, 500, error.message);
  }
}

export async function discoverMovies(req, res) {
  try {
    const randomMovies = await movieService.getRandomMovies(10);
    const enrichedMovies = await aiService.enrichMoviesWithAI(randomMovies);
    sendSuccess(res, enrichedMovies);
  } catch (error) {
    sendError(res, 500, error.message);
  }
}
