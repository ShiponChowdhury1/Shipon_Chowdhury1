import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware() {
    // Add any additional middleware logic here if needed
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to login page
        if (req.nextUrl.pathname === '/admin/login') {
          return true;
        }

        // Check if user is authenticated for admin routes
        if (req.nextUrl.pathname.startsWith('/admin')) {
          return !!token;
        }
        return true;
      },
    },
  }
);

export const config = {
  matcher: ['/admin/:path*'],
};