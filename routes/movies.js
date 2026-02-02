import { Router } from 'express';
import * as movieController from '../controllers/movieController.js';

const router = Router();

router.get('/', movieController.getMovies);
router.get('/discover', movieController.discoverMovies);
router.get('/:id', movieController.getMovieById);
router.post('/', movieController.createMovie);
router.put('/:id', movieController.updateMovie);
router.delete('/:id', movieController.deleteMovie);

export default router;
