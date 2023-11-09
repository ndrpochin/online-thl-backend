import express from 'express'
import * as vehicleService from '../services/bays.service'

const router = express.Router()

router.get('/', (req, res) => {
  res.send(vehicleService.getAllBays())
})

router.get('/:id', (req, res) => {
  res.send(vehicleService.getById(+req.params.id))
})

router.post('/', (req, res) => {
  res.send('post for a new vehicle')
})

export default router
