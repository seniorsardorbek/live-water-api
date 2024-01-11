import { promises } from 'fs'
export function gRN (min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
export function formatTimestamp (timestamp: number): string {
  if (isNaN(timestamp) || timestamp < 0) {
    return 'Invalid timestamp'
  }
  const date = new Date(timestamp)
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
  }
  const formattedDate: string = date.toLocaleString('en-US', options)
  return formattedDate.replace(',', '')
}
const passport = []

export function getCurrentDateTime (timestamp: number) {
  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const seconds = date.getSeconds().toString().padStart(2, '0')

  // Add a separator between date and time, for example, a space
  const separator = ' '

  return `${year}-${month}-${day}${separator}${hours}:${minutes}:${seconds}`
}
export  async function getDataFromDevice (min: number, max: number) {
  const arr = await  read('./src/_shared/json/device.json')
  const random = Math.floor(Math.random() * (max - min + 1)) + min
  const { level, volume } = arr.find((el) => el.level === random)
  const salinity = gRN(1, 10)
  return { level, volume, salinity , pressure :961.8 }
}

export async function read (dir: string) {
  const data = await promises.readFile(dir, 'utf8')
  return data ? JSON.parse(data) : []
}
export async function write (dir: string , data :any[] ) {
  const strinfdata =  JSON.stringify(data)
  promises.writeFile(dir, strinfdata, { encoding: 'utf-8' });
}
