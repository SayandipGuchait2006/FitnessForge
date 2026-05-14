import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { timingSafeEqual } from 'node:crypto'

/** Dotenv / editors sometimes wrap bcrypt in quotes; `$` can break expansion without quotes. */
function normalizeBcryptHash(raw: string | undefined): string | undefined {
  if (!raw) return undefined
  let h = raw.trim()
  if (
    (h.startsWith("'") && h.endsWith("'")) ||
    (h.startsWith('"') && h.endsWith('"'))
  ) {
    h = h.slice(1, -1).trim()
  }
  return h.length > 0 ? h : undefined
}

function timingSafeStringEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a, 'utf8')
  const bb = Buffer.from(b, 'utf8')
  if (ab.length !== bb.length) return false
  return timingSafeEqual(ab, bb)
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Admin',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const email = credentials?.email?.trim().toLowerCase()
        const password = credentials?.password ?? ''
        const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase()
        const hash = normalizeBcryptHash(process.env.ADMIN_PASSWORD_HASH)
        const devPlain = process.env.ADMIN_PASSWORD?.trim()

        if (!email || !password || !adminEmail) return null
        if (email !== adminEmail) return null

        let ok = false
        if (hash?.startsWith('$2')) {
          try {
            ok = await bcrypt.compare(password, hash)
          } catch {
            ok = false
          }
        }

        if (
          !ok &&
          devPlain &&
          process.env.NODE_ENV === 'development' &&
          timingSafeStringEqual(password, devPlain)
        ) {
          ok = true
        }

        if (!ok) return null

        return {
          id: 'admin',
          email: adminEmail,
          name: 'Administrator',
          role: 'admin',
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 8,
  },
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user && 'role' in user && typeof user.role === 'string') {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = typeof token.role === 'string' ? token.role : undefined
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}
