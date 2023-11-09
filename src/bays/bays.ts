import express from 'express'
import * as vehicleService from '../services/bays.service'

const router = express.Router()

router.get('/', (req, res) => {
  res.send(vehicleService.getAllBays())
})

router.get('/:id', (req, res) => {
  const vehicle = vehicleService.getById(+req.params.id)

  return vehicle !== null
    ? res.send(vehicle)
    : res.sendStatus(404)
})

router.post('/', (req, res) => {
  const { id, plate, date, rego, ruc } = req.body

  const newVehicle = vehicleService.saveData({ id, plate, date, rego, ruc })
  res.send(newVehicle)
})

export default router
