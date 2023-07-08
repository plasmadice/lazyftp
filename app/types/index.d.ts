export type Payload = {
  ftpHost: string
  ftpUser: string
  ftpPassword: string
  ftpSecure: boolean
  path: string
}

export type Server = {
  host: string | undefined
  port?: number | undefined
  secure?: boolean | undefined
  user?: string
  password?: string
  passkey?: string
}