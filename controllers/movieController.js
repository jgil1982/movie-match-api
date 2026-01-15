import * as movieService from '../services/movieService.js';
import * as aiService from '../services/aiService.js';

const sendSuccess = (res, data) => {
  const dataArray = Array.isArray(data) ? data : [data];
  res.json({ success: true, data: dataArray, count: dataArray.length });
};

const sendError = (res, status, message) => {
  res.status(status).json({ success: false, error: message });
};

export function getMovies(req, res) {
  const movies = movieService.getAllMovies(req.query);
  sendSuccess(res, movies);
}

export function getMovieById(req, res) {
  const movie = movieService.getMovieById(req.params.id);
  if (!movie) return sendError(res, 404, `Película ID ${req.params.id} no encontrada`);
  sendSuccess(res, movie);
}

export async function discoverMovies(req, res) {
  try {
    const randomMovies = movieService.getRandomMovies(10);
    const enrichedMovies = await aiService.enrichMoviesWithAI(randomMovies);
    sendSuccess(res, enrichedMovies);
  } catch (error) {
    sendError(res, 500, error.message);
  }
}
