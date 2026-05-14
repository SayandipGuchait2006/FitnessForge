import { withAuth } from 'next-auth/middleware'

export default withAuth({
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    authorized: ({ token, req }) => {
      const path = req.nextUrl.pathname
      if (path === '/admin/login') return true
      return !!token
    },
  },
  pages: {
    signIn: '/admin/login',
  },
})

export const config = {
  matcher: ['/admin/:path*'],
}
