import { loginUser } from "../services/auth.js"

export const login = async (req, res) => {
    try{
        const {user, token} = await loginUser(req.validatedData)
        res.status(200).json({message: 'Login realizado com sucesso', user, token})
    } catch(err){
        res.status(401).json({error: err.message})
    }
}