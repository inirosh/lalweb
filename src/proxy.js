// Keeps the admin login session fresh on every request and protects
// the /admin area. If you are not logged in and try to open any /admin
// page, you get sent to the login screen.
import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export async function proxy(request) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response = NextResponse.next({ request });
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;
  const isAdmin = path.startsWith("/admin");
  const isLogin = path === "/admin/login";

  // Not logged in + trying to open a protected admin page -> go to login
  if (isAdmin && !isLogin && !user) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  // Already logged in + on the login page -> go to dashboard
  if (isLogin && user) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return response;
}

export const config = {
  // Only run on /admin routes
  matcher: ["/admin/:path*"],
};
