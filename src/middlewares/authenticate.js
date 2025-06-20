import jwt from 'jsonwebtoken'

export const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido' })
    }

    const token = authHeader.split(' ')[1] // Bearer TOKEN

    try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = decoded.sub // adiciona o ID do usuário na requisição
    next() // deixa a requisição seguir para o controller
    } catch (err) {
    return res.status(401).json({ error: 'Token inválido' })
    }
}
