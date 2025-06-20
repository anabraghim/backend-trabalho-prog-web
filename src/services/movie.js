import { prisma } from '../db.js'

export const getAllMovies = async () => prisma.movie.findMany();

export const searchMoviesByTitle = async (title) => {
    const movies = await prisma.movie.findMany({
    where: {
        title: {
        contains: title,     // busca por parte do título só
        mode: 'insensitive'  // não diferencia maiúsculas e minúsculas
        }
    }
    })
    return movies
}

export const createMovieService = async (data) => {
    const {
    title,
    release_year,
    image_url,
    tmdb_id,
    director,
    genres
  } = data

  // Verifica se já existe
  const exists = await prisma.movie.findUnique({
    where: { tmdb_id }
  })
  if (exists) {
    throw new Error('Filme já cadastrado')
  }

  // Verifica ou cria os gêneros
  const genreObjects = await Promise.all(
    genres.map(async (genreName) => {
      const existing = await prisma.genre.findUnique({
        where: { name: genreName }
      })

      if (existing) return existing
      return await prisma.genre.create({ data: { name: genreName } })
    })
  )

  // Cadastra o filme
  const movie = await prisma.movie.create({
    data: {
      title,
      release_year,
      image_url,
      tmdb_id,
      director,
      genres: {
        connect: genreObjects.map(g => ({ id: g.id }))
      }
    },
    include: {
      genres: true
    }
  })

  return movie
}
