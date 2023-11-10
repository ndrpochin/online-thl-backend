import express from 'express'
import bayRoutes from './bays/bays'
import cors from 'cors'

const app = express()

app.use(express.json())

app.use(cors({
  origin: ['http://localhost:3000', 'https://online-thl.vercel.app/']
}));

const PORT = 3000

app.get('/ping', (_req, res) => {
  console.log('someone ping here!')
  res.send('pong')
})

app.use('/api/bays', bayRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

export default app
