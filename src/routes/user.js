import { Router } from "express";
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "../controllers/user.js";
import { authenticate } from "../middlewares/authenticate.js";

const userRoutes = Router()

userRoutes.get('/:id', authenticate, getUserById)
userRoutes.post('/', createUser)
userRoutes.put('/:id', authenticate, updateUser)
userRoutes.delete('/:id', authenticate, deleteUser)

export default userRoutes
