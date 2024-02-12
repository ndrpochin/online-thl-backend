import express from 'express'
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
    const response = await pool.query('SELECT * FROM bays ORDER BY idbay')
    res.status(200).json(response.rows)
  } catch (e) {
    console.error(e)
  }
})

router.get('/:id', async (req, res) => {
  const idbay = req.params.id
  const response = await pool.query('SELECT * FROM bays where idbay = $1 ORDER BY idbay', [idbay])
  const vehicle = response.rows[0]

  return vehicle !== undefined
    ? res.send(vehicle)
    : res.status(404).json({ 'message': 'not found' })
})

router.post('/', async (req, res) => {
  const { plate, date, rego, ruc, cof } = req.body
  // TODO: validar el formato de los datos antes de guardar
  // Validar que la patente no exista en la BBDD
  // IDEA: si la patente está vacia, poner en gris en el Front los labels de REGO/RUC
  await pool.query('INSERT INTO bays (plate, date, rego, ruc, cof) VALUES ($1, $2, $3, $4, $5)',
    [plate, date, rego, ruc, cof])
  res.json('inserted!')
})

router.delete('/reset', async(req, res) => {
  const resetParam = req.query.reset;

  if (resetParam === 'clean') {
    const response = await pool.query("UPDATE bays SET plate='', date='', rego=false, ruc=false WHERE true")
    res.json(`Se eliminó el recurso, ${response}`);
  } else {
    res.json(`No se eliminó el recurso`);
  }
});

const setSocketIO = (io: any) => {
  router.put('/:id', async (req, res) => {
    const idbay = +req.params.id
    const response = await pool.query('SELECT * FROM bays where idbay = $1', [idbay])
    const vehicle = response.rows[0]
    const { plate, date, rego, ruc, cof } = req.body

    if (vehicle === undefined) {
      res.status(400).json('update failed!')
    }

    const update = await pool.query('UPDATE bays SET plate = $1, date = $2, rego = $3, ruc = $4, cof = $5 WHERE idbay = $6', [plate.toUpperCase(), date, rego, ruc, cof, idbay]) 
    
    if (update.rowCount === 0) {
      res.status(400).json('failed!')
    }
    res.json(vehicle)
  })
}

export { router, setSocketIO } 
