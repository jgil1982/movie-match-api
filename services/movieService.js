import prisma from '../lib/prisma.js';

export async function getAllMovies(filters = {}) {
  const where = {};

  if (filters.year) {
    where.year = parseInt(filters.year);
  }

  if (filters.minRating) {
    where.rating = { gte: parseFloat(filters.minRating) };
  }

  return prisma.movie.findMany({ where });
}

export async function getMovieById(id) {
  return prisma.movie.findUnique({
    where: { id: parseInt(id) }
  });
}

export async function createMovie(data) {
  return prisma.movie.create({
    data: {
      title: data.title,
      year: data.year,
      rating: data.rating,
      poster: data.poster || null
    }
  });
}

export async function updateMovie(id, data) {
  return prisma.movie.update({
    where: { id: parseInt(id) },
    data: {
      title: data.title,
      year: data.year,
      rating: data.rating,
      poster: data.poster
    }
  });
}

export async function deleteMovie(id) {
  return prisma.movie.delete({
    where: { id: parseInt(id) }
  });
}

export async function getRandomMovies(count = 10) {
  const movies = await prisma.movie.findMany();
  const shuffled = movies.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, movies.length));
}
