import express from 'express'
import rootRouter from './src/routes/index.js';

const port = process.env.PORT ? Number(process.env.PORT) : 3333;
const app = express() // constante para chamar o express, tudo vai aqui agora
app.use(express.json())
app.use(rootRouter)

app.listen(port, () => {
    console.log(`Servidor rodando na em http://localhost:${port}`)
}) // é a porta onde a gente se comunica com o servidor, é lá que ele "escuta a gente"
