import { Vehicle } from '../types'
import data from './bays.json'

const vehicles: Array<Vehicle> = data as Array<Vehicle>

export const getAllBays = () => vehicles

export const saveData = () => null