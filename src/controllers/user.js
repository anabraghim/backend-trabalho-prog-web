import * as userService from '../services/user.js'

export const getAllUsers = async (req, res) => {
    try{
        const users = await userService.getAllUsers();
        res.json(users)
    } catch(err){
        console.error('Erro ao buscar usuários:', err)
        res.status(500).json({message: 'Erro ao buscar usuários'})
    }
}

export const getUserById = async (req, res) => {
    try{
        const id = parseInt(req.params.id)
        const user = await userService.getUserById(id)
        if(!user){
            return res.status(404).json({message: 'Usuário não encontrado'})
        }
        res.send(user)
    } catch(err){
        console.error('Erro ao buscar usuário por id: ', err)
        res.status(500).json({message: 'Erro ao buscar usuário'})
    }
}

export const createUser = async (req, res) => {
    try{

        const data = req.body
        const newUser = await userService.createUser(data)
        res.status(201).json(newUser)
    } catch(err){
        console.error('Erro ao criar usuário: ', err)

        if (err.code === 'P2002') {
            const target = err.meta?.target?.join(', ')

            return res.status(409).json({
            message: `Campo(s) duplicado(s): ${target}`
        })
        }
        res.status(400).json({message: 'Erro ao criar usuário'})
    }
}

export const updateUser = async (req, res) => {
    try{
        const id = parseInt(req.params.id)
        const data = req.body
        const updateUser = await userService.updateUser(id, data)
        if(!updateUser){
            return res.status(404).json({message: 'Usuário não encontrado'})
        }
        res.json(updateUser)
    } catch(err){
        console.error('Erro ao atualizar usuário:'. err)
        res.status(400).json({message: 'Erro ao atualizar usuário'})
    }
}

export const deleteUser = async (req, res) => {
    try{
        const id = parseInt(req.params.id)
        const deletedUser = await userService.deleteUser(id)
        if(!deletedUser){
            return res.status(404).json({message: 'Usuário não encontrado'})
        }
        res.json({message: 'Usuário removido'})
    } catch(err){
        console.error('Erro ao deletar usuário:', err)
        res.status(500).json({message: 'Erro ao deletar usuário'})
    }
}