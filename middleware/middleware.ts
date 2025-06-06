import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // If user is not authenticated and trying to access protected routes
    if (!req.nextauth.token && req.nextUrl.pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    // If user is authenticated and trying to access auth pages
    if (req.nextauth.token && req.nextUrl.pathname === "/sign-in") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/sign-in"],
};
