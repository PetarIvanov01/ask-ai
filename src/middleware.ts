import { type NextRequest } from "next/server";
import { updateSession } from "@/core/infrastructure/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  request.headers.set("x-current-path", request.nextUrl.pathname);
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
