import express from 'express'
import { router as bayRoutes } from './bays/bays';
import cors from 'cors'
import http from 'http'

const app = express()
const server = http.createServer(app)

app.use(express.json())

app.use(cors({
  origin: ['http://localhost:3000', 'https://online-thl.vercel.app']
}));

const PORT = 4000

app.get('/ping', (_req, res) => {
  console.log('someone ping here!')
  res.send('pong')
})

app.use('/api/bays', bayRoutes)

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

export default app
