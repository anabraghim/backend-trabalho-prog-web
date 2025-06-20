import bcrypt from 'bcrypt'
import { prisma } from "../db.js"
import jwt from 'jsonwebtoken'

export const loginUser = async ({email, password}) => {
    const user = await prisma.user.findUnique({
        where: {email}
    }) //procurando usuário pelo email

    if(!user){
        throw new Error('Email não foi encontrado')
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if(!passwordMatch){
        throw new Error('Senha incorreta')
    }

    //rttorna tudo de user, menos a senha
    const { password: _, ...userWithoutPassword } = user

    const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, {expiresIn: '1h'})

    return {user: userWithoutPassword, token}
}