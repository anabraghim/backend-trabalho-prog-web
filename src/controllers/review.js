import * as reviewServices from '../services/review.js'
import { prisma } from '../db.js'

export const getAllReviews = async (req, res) => {
    try{
        const reviews = await reviewServices.getAllReviews()
        res.json(reviews)
    } catch(err){
        res.status(500).json({message: "Erro ao buscar críticas"})
    }
}

export const getReviewById = async (req, res) => {
    try{
        const id = parseInt(req.params.id)
        const review = await reviewServices.getReviewById(id)
        if(!review){
            return res.status(404).json({message: 'Crítica não encontrada'})
        }
        res.send(review)
    } catch(err){
        res.status(500).json({message: 'Erro ao buscar crítica'})
    }
}

export const createReview = async (req, res) => {
    try {
    const { title, text, rating, movie_id } = req.validatedData
    const user_id = req.userId // vem do middleware de autenticação
    console.log({title, text, rating, movie_id, user_id})
    const review = await reviewServices.createReview({ title, text, rating, movie_id, user_id })
    res.status(201).json({ message: 'Crítica criada com sucesso', review })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

export const updateReview = async (req, res) => {
    try {
    const id = parseInt(req.params.id)
    const data = req.body
    const userId = req.userId

    const review = await prisma.review.findUnique({ where: { id } })
    if (!review) {
        return res.status(404).json({ message: 'Crítica não encontrada' })
    }

    if (review.user_id !== userId) {
        return res.status(403).json({ message: 'Você não tem permissão para editar essa crítica' })
    }

    const updatedReview = await reviewServices.updateReview(id, data)
    res.json(updatedReview)
    } catch (err) {
    console.error('Erro ao atualizar crítica:', err)
    res.status(400).json({ message: 'Erro ao atualizar crítica' })
    }
}

export const deleteReview = async (req, res) => {
    try {
    const id = parseInt(req.params.id)
    const userId = req.userId

    const review = await prisma.review.findUnique({ where: { id } })
    if (!review) {
        return res.status(404).json({ message: 'Crítica não encontrada' })
    }

    if (review.user_id !== userId) {
        return res.status(403).json({ message: 'Você não tem permissão para deletar essa crítica' })
    }

    const deletedReview = await reviewServices.deleteReview(id)
    res.json({ message: 'Crítica removida com sucesso' })
    } catch (err) {
    console.error('Erro ao deletar crítica:', err)
    res.status(500).json({ message: 'Erro ao deletar crítica' })
    }
}

export const searchReviews = async (req, res) => {
    try {
    const { query } = req.query

    if (!query) {
        return res.status(400).json({ message: 'Parâmetro "query" é obrigatório' })
    }

    const reviews = await reviewServices.searchReviews(query)
    res.json(reviews)
    } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar críticas' })
    }
}

export const getReviewsByUser = async (req, res) => {
    try {
    const { userId } = req.params
    const reviews = await reviewServices.getReviewsByUserId(parseInt(userId))
    res.json(reviews)
    } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar críticas do usuário' })
    }
}