import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { db } from './db/index.js'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: [
    'http://localhost:5173',     // Frontend lokal
    'https://nama-project-kamu.pages.dev', // Ganti dengan URL Cloudflare Pages kalian
  ],
})