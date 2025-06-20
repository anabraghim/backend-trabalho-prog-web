import { Router } from "express"
import { login } from "../controllers/auth.js"
import { validate } from "../middlewares/validate.js"
import { loginSchema } from "../validations/authValidation.js"

const authRoutes = Router() 
authRoutes.post('/login', validate(loginSchema), login)

export default authRoutes