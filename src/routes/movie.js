import { Router } from 'express'
import { createMovie, getAllMovies } from '../controllers/movie.js'
import { authenticate } from '../middlewares/authenticate.js'
import { searchMovie } from '../controllers/movie.js'

const movieRoutes = Router()

movieRoutes.get('/', getAllMovies)
movieRoutes.post('/', authenticate, createMovie) 
movieRoutes.get('/search', searchMovie)

export default movieRoutes