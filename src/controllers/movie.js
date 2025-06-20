import * as movieServices from '../services/movie.js'

export const searchMovie = async (req, res) => {
    try {
    const { title } = req.query

    if (!title) {
        return res.status(400).json({ error: 'Parâmetro "title" é obrigatório' })
    }

    const movies = await movieServices.searchMoviesByTitle(title)
    res.json(movies)
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar filmes' })
    }
}

export const getAllMovies = async (req, res) =>{
    try{
        const movies = await movieServices.getAllMovies();
        res.json(movies)
    } catch(err){
        console.error("Erro ao buscar filmes")
        res.status(500).json({message: "Erro ao buscar filmes"})
    }
}

export const createMovie = async (req, res) => {
    try {
        const movie = await movieServices.createMovieService(req.body)
        res.status(201).json({ message: 'Filme cadastrado com sucesso', movie })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}