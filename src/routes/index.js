import {Router} from "express"
import authRoutes from "./auth.js"
import userRoutes from "./user.js"
import movieRoutes from "./movie.js"
import reviewRoutes from "./review.js"
import commentRoutes from "./comment.js"

const rootRouter = Router()

rootRouter.use('/auth', authRoutes)
rootRouter.use('/users', userRoutes)
rootRouter.use('/movies', movieRoutes)
rootRouter.use('/reviews', reviewRoutes )
rootRouter.use('/comments', commentRoutes)

export default rootRouter