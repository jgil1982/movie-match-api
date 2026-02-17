import prisma from '../lib/prisma.js';

export async function getAllMovies(filters = {}) {
  const where = {};

  if (filters.genre) {
    where.genre = filters.genre;
  }

  if (filters.year) {
    where.year = parseInt(filters.year);
  }

  if (filters.minRating) {
    where.rating = { gte: parseFloat(filters.minRating) };
  }

  return prisma.movie.findMany({
    where,
    orderBy: { createdAt: 'desc' }
  });
}

export async function getMovieById(id) {
  return prisma.movie.findUnique({
    where: { id: parseInt(id) },
    include: {
      reviews: {
        orderBy: { createdAt: 'desc' }
      }
    }
  });
}

export async function createMovie(data) {
  return prisma.movie.create({
    data: {
      title: data.title,
      year: parseInt(data.year),
      rating: parseFloat(data.rating),
      genre: data.genre,
      poster: data.poster || null
    }
  });
}

export async function updateMovie(id, data) {
  return prisma.movie.update({
    where: { id: parseInt(id) },
    data: {
      title: data.title,
      year: parseInt(data.year),
      rating: parseFloat(data.rating),
      genre: data.genre,
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

export function getGenres() {
  return ['ACTION', 'COMEDY', 'DRAMA', 'HORROR', 'SCIFI', 'THRILLER'];
}

export async function searchMovies(params) {
  const { q, genre, yearMin, yearMax, ratingMin, page = 1, limit = 10 } = params;

  const where = {
    AND: []
  };

  if (q) {
    where.AND.push({
      title: { contains: q, mode: 'insensitive' }
    });
  }

  if (genre) {
    where.AND.push({ genre });
  }

  if (yearMin || yearMax) {
    const yearFilter = {};
    if (yearMin) yearFilter.gte = parseInt(yearMin);
    if (yearMax) yearFilter.lte = parseInt(yearMax);
    where.AND.push({ year: yearFilter });
  }

  if (ratingMin) {
    where.AND.push({
      rating: { gte: parseFloat(ratingMin) }
    });
  }

  if (where.AND.length === 0) {
    delete where.AND;
  }

  const [movies, total] = await Promise.all([
    prisma.movie.findMany({
      where,
      include: {
        _count: { select: { reviews: true } }
      },
      orderBy: { rating: 'desc' },
      skip: (parseInt(page) - 1) * parseInt(limit),
      take: parseInt(limit)
    }),
    prisma.movie.count({ where })
  ]);

  return {
    data: movies,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / parseInt(limit))
    }
  };
}

export async function deleteMovieWithReviews(id) {
  return await prisma.$transaction(async (tx) => {
    const movie = await tx.movie.findUnique({
      where: { id: parseInt(id) },
      include: { _count: { select: { reviews: true } } }
    });

    if (!movie) {
      throw new Error('Película no encontrada');
    }

    const reviewCount = movie._count.reviews;

    await tx.review.deleteMany({
      where: { movieId: parseInt(id) }
    });

    await tx.movie.delete({
      where: { id: parseInt(id) }
    });

    return {
      deletedMovie: movie.title,
      deletedReviews: reviewCount
    };
  });
}

export async function getMoviesWithoutReviews() {
  return await prisma.movie.findMany({
    where: {
      reviews: { none: {} }
    },
    select: { id: true, title: true, year: true, genre: true, rating: true }
  });
}

export async function getRecentMovies() {
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  return await prisma.movie.findMany({
    where: {
      createdAt: { gte: weekAgo }
    },
    orderBy: { createdAt: 'desc' }
  });
}

export async function exportData() {
  const movies = await prisma.movie.findMany({
    include: {
      _count: { select: { reviews: true } },
      reviews: {
        select: { rating: true }
      }
    }
  });

  return movies.map(m => ({
    id: m.id,
    title: m.title,
    year: m.year,
    rating: m.rating,
    genre: m.genre,
    reviewCount: m._count.reviews,
    avgReviewRating: m.reviews.length
      ? (m.reviews.reduce((sum, r) => sum + r.rating, 0) / m.reviews.length).toFixed(1)
      : null
  }));
}
