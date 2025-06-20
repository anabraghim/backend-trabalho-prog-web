import { Router } from 'express'
import { createComment, getCommentsByReview } from '../controllers/comment.js'
import { authenticate } from '../middlewares/authenticate.js'
import { validate } from '../middlewares/validate.js'
import { commentSchema } from '../validations/commentValidation.js'

const commentRoutes = Router()

commentRoutes.post('/', authenticate, validate(commentSchema), createComment)

commentRoutes.get('/review/:id', getCommentsByReview)

export default commentRoutes