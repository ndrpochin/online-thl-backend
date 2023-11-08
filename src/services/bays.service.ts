import { Vehicle } from '../types'
import data from './bays.json'

const vehicles: Vehicle[] = data as Vehicle[]

export const getAllBays = () => vehicles

export const saveData = () => null
