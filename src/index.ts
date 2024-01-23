import express from 'express'
import { setSocketIO, router as bayRoutes } from './bays/bays';
import cors from 'cors'
import http from 'http'
import { Server } from 'socket.io'

const app = express()
const server = http.createServer(app)

app.use(express.json())

app.use(cors({
  origin: ['http://localhost:3000', 'https://online-thl.vercel.app']
}));
const io = new Server(server, {
  cors: { origin: "http://localhost:3000" },
})

const PORT = 4000

app.get('/ping', (_req, res) => {
  console.log('someone ping here!')
  res.send('pong')
})

setSocketIO(io)
app.use('/api/bays', bayRoutes)

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

io.on("connection", (socket) => {
  console.log(`a user connected ${socket.id}`);
  socket.on('put-event', (data) => {
    socket.broadcast.emit('put-broadcast', data)
  })
});
export default app
