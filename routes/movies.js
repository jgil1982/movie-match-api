import { Router } from 'express';
import * as movieController from '../controllers/movieController.js';

const router = Router();

router.get('/', movieController.getMovies);
router.get('/genres', movieController.getGenres);
router.get('/discover', movieController.discoverMovies);
router.get('/search', movieController.search);
router.get('/without-reviews', movieController.getMoviesWithoutReviews);
router.get('/recent', movieController.getRecentMovies);
router.get('/export', movieController.exportData);
router.get('/:id', movieController.getMovieById);
router.post('/', movieController.createMovie);
router.put('/:id', movieController.updateMovie);
router.delete('/:id', movieController.deleteMovie);
router.delete('/:id/transaction', movieController.deleteMovieWithTransaction);

export default router;
