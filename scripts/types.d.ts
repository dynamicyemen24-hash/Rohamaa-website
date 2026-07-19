declare module 'pg' {
  export class Client {
    constructor(config: { connectionString: string; ssl?: { rejectUnauthorized: boolean } })
    connect(): Promise<void>
    query(text: string): Promise<{ rows: unknown[] }>
    end(): Promise<void>
  }
}