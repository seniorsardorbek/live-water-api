export function gRN (min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
export function getRandomNumber(min: number, max: number): number {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
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
// !
export function getCurrentDateTime (timestamp: number) {
  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const seconds = date.getSeconds().toString().padStart(2, '0')
  const separator = ' '
  return `${year}-${month}-${day}${separator}${hours}:${minutes}:${seconds}`
}

// ! Done

