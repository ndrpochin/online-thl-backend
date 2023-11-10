import express from 'express'
import * as vehicleService from '../services/bays.service'
import { Pool } from 'pg'
import dotenv from "dotenv"

dotenv.config()
const router = express.Router()

const pool = new Pool({
  database: process.env.PG_DATABASE,
  host: process.env.PG_HOST,
  password: process.env.PG_PASSWORD,
  user: process.env.PG_USERNAME,
  ssl: true,
  max: 20,
  idleTimeoutMillis: 0,
  connectionTimeoutMillis: 0
})

router.get('/', async (req, res) => {
  try {
    console.log('database', process.env.DB_DATABASE)
    const response = await pool.query('SELECT * FROM bays ORDER BY idbay')
    console.log(response.rows)
    res.status(200).json(response.rows)
  } catch (e) {
    console.error(e)
  }
})

router.get('/v1/:id', (req, res) => {
  const vehicle = vehicleService.getById(+req.params.id)

  return vehicle !== null
    ? res.send(vehicle)
    : res.sendStatus(404)
})

router.post('/', async (req, res) => {
  const { plate, date, rego, ruc } = req.body
  // TODO: validar el formato de los datos antes de guardar
  // Validar que la patente no exista en la BBDD
  // IDEA: si la patente está vacia, poner en gris en el Front los labels de REGO/RUC
  await pool.query('INSERT INTO bays (plate, date, rego, ruc) VALUES ($1, $2, $3, $4)',
    [plate, date, rego, ruc])
  res.json('inserted!')
})

router.put('/:id', async (req, res) => {
  const idbay = req.params.id
  const response = await pool.query('SELECT * FROM bays where idbay = $1', [idbay])
  const vehicle = response.rows[0]
  const { plate, date, rego, ruc } = req.body

  if (vehicle === undefined) {
    res.status(400).json('update failed!')
  }

  const update = await pool.query('UPDATE bays SET plate = $1, date = $2, rego = $3, ruc = $4 WHERE idbay = $5', [plate, date, rego, ruc, idbay])
  if (update.rowCount === 0) {
    res.status(400).json('failed!')
  }
  res.json(vehicle)
})

export default router
