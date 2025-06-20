import * as commentServices from '../services/comment.js'
import * as reviewServices from '../services/review.js'

export const createComment = async (req, res) => {
    try {
    const { text, reviewId } = req.validatedData
    const userId = req.userId // vem do middleware de autenticação

    const comment = await commentServices.createComment({ text, reviewId, userId })
    res.status(201).json({ message: 'Comentário criado com sucesso', comment })
    } catch (err) {
    res.status(400).json({ error: err.message })
    }
}

export const getCommentsByReview = async (req, res) => {
    try {
    const reviewId = parseInt(req.params.id)

    const review = await reviewServices.getReviewById(reviewId)

    if (!review) {
        return res.status(404).json({ error: 'Crítica não encontrada' })
    }

    const comments = await commentServices.getCommentsByReviewId(reviewId)

    res.json({
        review,
        comments
    })
    } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar comentários e crítica' })
    }
}
