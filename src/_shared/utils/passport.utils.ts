import { promises, unlink } from 'fs'
import { passport } from '..'
import { join } from 'path'
import * as XLSX from 'xlsx'
import { gRN, getRandomNumber } from './utils'
import { menerals, series, levels } from './constants'

export function convertArrayToJSON (inputArray) {
  inputArray.shift()
  const result: passport[] = inputArray.map(([level, volume]) => ({
    level: parseInt(level),
    volume: parseFloat(volume),
  }))
  return result
}
export async function getDataFromDevice (serie: string) {
  try {
    const ind = series.findIndex(ser => ser === serie)
    if (ind < 0) return { level: 0, salinity: 0, temperature: 0 }
    const random = gRN(1, 10)
    const level = levels[ind] - 5 + random
    const salinity = parseFloat(
      (
        menerals[ind] -
        menerals[ind] * 0.1 +
        menerals[ind] * getRandomNumber(0.01, 0.2)
      ).toFixed(2)
    )
    return { level, salinity, temperature: 0 }
  } catch (error) {
    console.log(error)
  }
}

export async function read (dir: string) {
  const data = await promises.readFile(dir, 'utf8')
  return data ? JSON.parse(data) : []
}
export async function write (dir: string, data: any[]) {
  const stringData = JSON.stringify(data)
  promises.writeFile(dir, stringData, { encoding: 'utf-8' })
}

export function deleteFile (folder: string, name: string): void {
  unlink(join(__dirname, '../../../', folder, name), err => {
    if (err) {
      return
    }
  })
}

export function xlsxToArray (filePath: string) {
  if (!filePath) return []
  const workbook = XLSX.readFile(filePath)
  const sheetName = workbook.SheetNames[0]
  const sheet = workbook.Sheets[sheetName]
  return XLSX.utils.sheet_to_json(sheet, { header: 1 })
}
