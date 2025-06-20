import { Router } from 'express'
import { createReview, deleteReview, getAllReviews, getReviewById, searchReviews, updateReview, getReviewsByUser } from '../controllers/review.js'
import { authenticate } from '../middlewares/authenticate.js'
import { validate } from '../middlewares/validate.js'
import { reviewSchema } from '../validations/reviewValidation.js'
import { getCommentsByReview } from '../controllers/comment.js'

const reviewRoutes = Router()
reviewRoutes.get('/:id/comments', getCommentsByReview)
reviewRoutes.get('/search', searchReviews)
reviewRoutes.get('/user/:userId', getReviewsByUser)
reviewRoutes.get('/', getAllReviews) // ver todas as criticas, são publicas
reviewRoutes.get('/:id', getReviewById) // ver critica x
reviewRoutes.post('/', authenticate, validate(reviewSchema), createReview ) // criar critica
reviewRoutes.put('/:id', authenticate, validate(reviewSchema), updateReview) // editar critica
reviewRoutes.delete('/:id', authenticate, deleteReview) //deletar critica

export default reviewRoutes