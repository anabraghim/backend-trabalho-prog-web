import bcrypt from 'bcrypt'
import { prisma } from "../db.js"

export const getAllUsers = () => prisma.user.findMany()
// busca todos os usuarios do BD

export const getUserById = (id) => prisma.user.findUnique({where: {id}})
// busca por um usuário pelo id dele

//criar um usuário
export const createUser = async(data) => {
    const {name, username, email, password} = data
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await prisma.user.create({
        data: {
            name,
            username,
            email,
            password: hashedPassword
        }
    })
    return newUser;
    
}

export const updateUser = (id, data) => prisma.user.update({where: {id}, data})
// atualizar usuário com um determinado id

export const deleteUser = (id) => prisma.user.delete({where: {id}})
// deletar usuário com id x