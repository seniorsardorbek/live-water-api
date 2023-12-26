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
