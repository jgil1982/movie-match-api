import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const movies = [
  {
    title: "The Shawshank Redemption",
    year: 1994,
    rating: 9.3,
    genre: "DRAMA",
    poster: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg"
  },
  {
    title: "The Godfather",
    year: 1972,
    rating: 9.2,
    genre: "DRAMA",
    poster: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg"
  },
  {
    title: "The Dark Knight",
    year: 2008,
    rating: 9.0,
    genre: "ACTION",
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg"
  },
  {
    title: "Pulp Fiction",
    year: 1994,
    rating: 8.9,
    genre: "THRILLER",
    poster: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg"
  },
  {
    title: "Forrest Gump",
    year: 1994,
    rating: 8.8,
    genre: "DRAMA",
    poster: "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg"
  },
  {
    title: "Inception",
    year: 2010,
    rating: 8.8,
    genre: "SCIFI",
    poster: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Ber.jpg"
  },
  {
    title: "The Matrix",
    year: 1999,
    rating: 8.7,
    genre: "SCIFI",
    poster: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg"
  },
  {
    title: "Goodfellas",
    year: 1990,
    rating: 8.7,
    genre: "THRILLER",
    poster: "https://image.tmdb.org/t/p/w500/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg"
  },
  {
    title: "Interstellar",
    year: 2014,
    rating: 8.6,
    genre: "SCIFI",
    poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"
  },
  {
    title: "The Lord of the Rings: The Return of the King",
    year: 2003,
    rating: 8.9,
    genre: "ACTION",
    poster: "https://image.tmdb.org/t/p/w500/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg"
  }
];

async function main() {
  console.log('Seeding database...');

  for (const movie of movies) {
    await prisma.movie.create({ data: movie });
  }

  console.log(`Seeded ${movies.length} movies`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

