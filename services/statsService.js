import prisma from '../lib/prisma.js';

export async function getDashboardStats() {
  const [
    totalMovies,
    totalReviews,
    avgRating,
    moviesByGenre,
    topRated,
    mostReviewed,
    recentReviews
  ] = await Promise.all([
    prisma.movie.count(),

    prisma.review.count(),

    prisma.movie.aggregate({
      _avg: { rating: true }
    }),

    prisma.movie.groupBy({
      by: ['genre'],
      _count: { id: true },
      _avg: { rating: true }
    }),

    prisma.movie.findMany({
      orderBy: { rating: 'desc' },
      take: 5,
      select: { id: true, title: true, rating: true, genre: true }
    }),

    prisma.movie.findMany({
      include: {
        _count: { select: { reviews: true } }
      },
      orderBy: {
        reviews: { _count: 'desc' }
      },
      take: 5
    }),

    prisma.review.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
      include: {
        movie: { select: { id: true, title: true } }
      }
    })
  ]);

  return {
    totalMovies,
    totalReviews,
    avgRating: Math.round((avgRating._avg.rating || 0) * 10) / 10,
    moviesByGenre: moviesByGenre.map(g => ({
      genre: g.genre,
      count: g._count.id,
      avgRating: Math.round((g._avg.rating || 0) * 10) / 10
    })),
    topRated,
    mostReviewed: mostReviewed.map(m => ({
      id: m.id,
      title: m.title,
      rating: m.rating,
      genre: m.genre,
      reviewCount: m._count.reviews
    })),
    recentReviews: recentReviews.map(r => ({
      id: r.id,
      author: r.author,
      rating: r.rating,
      comment: r.comment,
      movieTitle: r.movie.title,
      movieId: r.movie.id,
      createdAt: r.createdAt
    }))
  };
}
