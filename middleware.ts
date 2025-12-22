import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Protect /saas/launchroom/app routes
    if (pathname.startsWith("/saas/launchroom/app")) {
        const demoSession = request.cookies.get("lr_demo_session");

        if (!demoSession) {
            const signInUrl = new URL("/saas/launchroom/sign-in", request.url);
            return NextResponse.redirect(signInUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - images (public images)
         */
        "/((?!api|_next/static|_next/image|favicon.ico|images).*)",
    ],
};
