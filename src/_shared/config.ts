import 'dotenv/config'

interface Config {
  port: number
  db: {
    host: string
    port: number
    username: string
    password: string
    name: string
  }
  jwt: {
    secret: string
  }
}

const config: Config = {
  port: parseInt(process.env.PORT!),
  db: {
    host: process.env.DB_HOST!,
    port: parseInt(process.env.DB_PORT!),
    username: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    name: process.env.DB_NAME!,
  },
  jwt: {
    secret: process.env.JWT_SECRET!,
  },
}

export default config
