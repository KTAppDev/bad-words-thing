import {
  authMiddleware,
  useAuth,
  currentUser,
  redirectToSignIn,
} from "@clerk/nextjs";
import { NextResponse } from "next/server";

const whiteList = [
  "ktad592@gmail.com",
  "clint4life@gmail.com",
  "kentaylorappdev@gmail.com",
];
export default authMiddleware({
  publicRoutes: [
    "/",
    "/results",
    "/api",
    "/sign-in",
    "/sign-up",
    "/not-authorized",
  ],
  afterAuth(auth, req) {
    if (
      auth.sessionClaims?.email &&
      req.nextUrl.pathname === "/not-authorized" &&
      whiteList.includes(auth.sessionClaims.email.toString())
    ) {
      const dashboard = new URL("/dashboard", req.url);
      return NextResponse.redirect(dashboard);
    }

    // if (!auth.userId && !auth.isPublicRoute) {
    //   return redirectToSignIn({ returnBackUrl: req.url });
    // }
    // console.log(auth);
    if (
      auth.sessionClaims?.email &&
      !whiteList.includes(auth.sessionClaims.email.toString()) &&
      !auth.isPublicRoute
    ) {
      // console.log("I can implement my own whitelist here using clerk");
      // if you are signed in but not on the list
      const notAuthorized = new URL("/not-authorized", req.url);
      return NextResponse.redirect(notAuthorized);
    }
  },
});

// export default authMiddleware();

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
