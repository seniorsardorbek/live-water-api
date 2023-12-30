export function gRN(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
export function formatTimestamp(timestamp: number): string {
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
const passport = [
  { level: 5, volume: 0.02 },
  { level: 6, volume: 0.03 },
  { level: 7, volume: 0.04 },
  { level: 8, volume: 0.05 },
  { level: 9, volume: 0.07 },
  { level: 10, volume: 0.08 },
  { level: 11, volume: 0.09 },
  { level: 12, volume: 0.1 },
  { level: 13, volume: 0.11 },
  { level: 14, volume: 0.13 },
  { level: 15, volume: 0.14 },
  { level: 16, volume: 0.16 },
  { level: 17, volume: 0.18 },
  { level: 18, volume: 0.19 },
  { level: 19, volume: 0.21 },
  { level: 20, volume: 0.22 },
  { level: 21, volume: 0.25 },
  { level: 22, volume: 0.27 },
  { level: 23, volume: 0.28 },
  { level: 24, volume: 0.3 },
  { level: 25, volume: 0.33 },
  { level: 26, volume: 0.35 },
  { level: 27, volume: 0.37 },
  { level: 28, volume: 0.39 },
  { level: 29, volume: 0.41 },
  { level: 30, volume: 0.44 },
  { level: 31, volume: 0.46 },
  { level: 32, volume: 0.48 },
  { level: 33, volume: 0.51 },
  { level: 34, volume: 0.53 },
  { level: 35, volume: 0.56 },
  { level: 36, volume: 0.58 },
  { level: 37, volume: 0.61 },
  { level: 38, volume: 0.63 },
  { level: 39, volume: 0.66 },
  { level: 40, volume: 0.69 },
  { level: 41, volume: 0.72 },
  { level: 42, volume: 0.74 },
  { level: 43, volume: 0.77 },
  { level: 44, volume: 0.8 },
  { level: 45, volume: 0.83 },
  { level: 46, volume: 0.86 },
  { level: 47, volume: 0.89 },
  { level: 48, volume: 0.92 },
  { level: 49, volume: 0.95 },
  { level: 50, volume: 0.98 },
  { level: 51, volume: 1.01 },
  { level: 52, volume: 1.04 },
  { level: 53, volume: 1.07 },
  { level: 54, volume: 1.1 },
  { level: 55, volume: 1.13 },
  { level: 56, volume: 1.16 },
  { level: 57, volume: 1.2 },
  { level: 58, volume: 1.23 },
  { level: 59, volume: 1.25 },
]
export function getCurrentDateTime(timestamp: number) {
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
export function generateRandomNumber(min: number, max: number) {
  const random = Math.floor(Math.random() * (max - min + 1)) + min
  const { level, volume } = passport.find((el) => el.level === random)
  const salinity = gRN(1, 10)
  return { level, volume, salinity }
}
