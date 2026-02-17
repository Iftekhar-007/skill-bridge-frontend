// import { NextRequest, NextResponse } from "next/server";
// import { userService } from "./services/user.service";
// import { Roles } from "./constants/roles";

// export async function proxy(request: NextRequest) {
//   // get pathname
//   const pathName = request.nextUrl.pathname;

//   let isAuthenticated = false;
//   let isAdmin = false;

//   // ! get user data

//   const { data: session } = await userService.getSession();

//   // ! set user data

//   if (session) {
//     isAuthenticated = true;
//     isAdmin = session.user.role === Roles.admin;
//   }

//   // valiadte user role with admin role
//   //  if not logged in then redirected to login page first

//   if (!isAuthenticated) {
//     return NextResponse.redirect(new URL("/auth/login", request.url));
//   }

//   // ! redirect users to their role based page based on users role

//   if (isAdmin && pathName.startsWith("/dashboard")) {
//     return NextResponse.redirect(new URL("/admin-dashboard", request.url));
//   }

//   if (!isAdmin && pathName.startsWith("/tutor-dashboard")) {
//     return NextResponse.redirect(new URL("/tutor-dashboard", request.url));
//   }

//   if (!isAdmin && pathName.startsWith("/admin-dashboard")) {
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }
//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/dashboard",
//     "/admin-dashboard",
//     "/admin-dashboard/:path*",
//     "/dashboard/:path*",
//   ],
// };

import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.service";
import { Roles } from "./constants/roles";

export async function proxy(request: NextRequest) {
  const pathName = request.nextUrl.pathname;

  let isAuthenticated = false;
  let role: string | null = null;

  // get session
  const { data: session } = await userService.getSession();

  if (session?.user) {
    isAuthenticated = true;
    role = session.user.role;
  }

  // if not logged in → login
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // ADMIN protection
  if (pathName.startsWith("/admin-dashboard") && role !== Roles.admin) {
    if (role === Roles.student) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    if (role === Roles.tutor) {
      return NextResponse.redirect(new URL("/tutor-dashboard", request.url));
    }
  }

  // TUTOR protection
  if (pathName.startsWith("/tutor-dashboard") && role !== Roles.tutor) {
    if (role === Roles.admin) {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    }
    if (role === Roles.student) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // STUDENT protection
  if (pathName.startsWith("/dashboard") && role !== Roles.student) {
    if (role === Roles.admin) {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    }
    if (role === Roles.tutor) {
      return NextResponse.redirect(new URL("/tutor-dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin-dashboard/:path*",
    "/tutor-dashboard/:path*",
  ],
};
