import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import moviesRouter from './routes/movies.js';
import reviewsRouter from './routes/reviews.js';
import statsRouter from './routes/stats.js';
import { logger } from './middlewares/logger.js';
import { responseTime } from './middlewares/responseTime.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFound } from './middlewares/notFound.js';

const swaggerDoc = YAML.load('./docs/swagger.yaml');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(logger);
app.use(responseTime);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.use(statsRouter);
app.use('/movies', moviesRouter);
app.use(reviewsRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`🎬 API en http://localhost:${PORT}`));
