import { Vehicle } from '../types'
import data from './bays.json'

const vehicles: Vehicle[] = data as Vehicle[]

export const getAllBays = (): Vehicle[] => vehicles

export const getById = (id: Number): Vehicle | undefined => {
  const vehicle = vehicles.find(item => item.id === id)
  return vehicle
}

export const saveData = (): undefined => undefined
