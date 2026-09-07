import createMiddleware from "next-intl/middleware";
import { routing } from "@/lib/i18n";

export default createMiddleware(routing);

export const config = {
  // Everything except API routes, Next internals, Vercel internals and files with an extension.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
