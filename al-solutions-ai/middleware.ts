import type { NextRequest } from "next/server";
import { updateSupabaseSession } from "@/lib/supabase/middleware";

export function middleware(request: NextRequest) {
  const response = updateSupabaseSession(request);
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.includes(".")) {
    return response;
  }

  if (pathname.startsWith("/dashboard")) {
    // Sprint 1 keeps dashboard route protection plumbing minimal and defers
    // full auth checks to Sprint 4 when tenant auth is implemented.
    return response;
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
