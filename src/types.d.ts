type Day = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31
type Month = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
type DateType = `${Day}/${Month}`

const NO_VALID_DATES = ['30/2', '31/2', '31/4', '31/6', '31/9', '31/11']

type LicenseType = RegExp
const myRegex: LicenseType = /^[A-Za-z]{3}[1-9]\d{0,2}$/

export interface Vehicle {
  id: number
  plate: string
  date: DateType
  rego: boolean
  ruc: boolean
}
