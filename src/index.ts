import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { cors } from 'hono/cors'
import { auth } from './auth.js'
import { db } from './db/index.js'

const app = new Hono()

// Setup CORS agar frontend bisa akses backend
app.use('*', cors({
  origin: [
    'http://localhost:5173',
    'https://nama-project-kamu.pages.dev', // Ganti dengan URL Cloudflare Pages kalian
  ],
  credentials: true,
}))

// Mount BetterAuth ke endpoint /api/auth
app.on(['GET', 'POST'], '/api/auth/**', (c) => {
  return auth.handler(c.req.raw)
})

app.get('/', (c) => {
  return c.json({ message: 'Backend is running!' })
})

serve({
  fetch: app.fetch,
  port: 3000
})

console.log('Server running on http://localhost:3000')