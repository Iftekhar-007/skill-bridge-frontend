// import { Roles } from "@/constants/roles";
// import { userService } from "@/services/user.service";
// // import { userService } from "@/services/user.service";
// // import { NextRequest, NextResponse } from "next/server";

// // export async function proxy(request: NextRequest) {
// //   const pathName = request.nextUrl.pathname;

// //   let isAuthenticated = false;
// //   let role: string | null = null;

// //   // get session
// //   const { data: session } = await userService.getSession();

// //   if (session?.user) {
// //     isAuthenticated = true;
// //     role = session.user.role;
// //   }

// //   // if not logged in → login
// //   if (!isAuthenticated) {
// //     return NextResponse.redirect(new URL("/auth/login", request.url));
// //   }

// //   // ADMIN protection
// //   if (pathName.startsWith("/admin-dashboard") && role !== Roles.admin) {
// //     if (role === Roles.student) {
// //       return NextResponse.redirect(new URL("/dashboard", request.url));
// //     }
// //     if (role === Roles.tutor) {
// //       return NextResponse.redirect(new URL("/tutor-dashboard", request.url));
// //     }
// //   }

// //   // TUTOR protection
// //   if (pathName.startsWith("/tutor-dashboard") && role !== Roles.tutor) {
// //     if (role === Roles.admin) {
// //       return NextResponse.redirect(new URL("/admin-dashboard", request.url));
// //     }
// //     if (role === Roles.student) {
// //       return NextResponse.redirect(new URL("/dashboard", request.url));
// //     }
// //   }

// //   // STUDENT protection
// //   if (pathName.startsWith("/dashboard") && role !== Roles.student) {
// //     if (role === Roles.admin) {
// //       return NextResponse.redirect(new URL("/admin-dashboard", request.url));
// //     }
// //     if (role === Roles.tutor) {
// //       return NextResponse.redirect(new URL("/tutor-dashboard", request.url));
// //     }
// //   }

// //   return NextResponse.next();
// // }

// // export const config = {
// //   matcher: [
// //     "/dashboard/:path*",
// //     "/admin-dashboard/:path*",
// //     "/tutor-dashboard/:path*",
// //   ],
// // };

// import { NextRequest, NextResponse } from "next/server";

// export async function proxy(request: NextRequest) {
//   const pathName = request.nextUrl.pathname;

//   // // Skip middleware for verify-email route
//   // if (pathName.startsWith("/verify-email")) {
//   //   return NextResponse.next();
//   // }

//   // Check for session token in cookies
//   const sessionToken = request.cookies.get("better-auth.session_token");

//   const { data: session } = await userService.getSession();

//   let isAuthenticated = false;
//   let role: string | null = null;

//   if (sessionToken) {
//     isAuthenticated = true;
//   }

//   if (session?.user) {
//     role = session.user.role;
//   }

//   //* User is not authenticated at all
//   if (!sessionToken) {
//     return NextResponse.redirect(new URL("/auth/login", request.url));
//   }

//   if (pathName.startsWith("/admin-dashboard") && role !== Roles.admin) {
//     if (role === Roles.student) {
//       return NextResponse.redirect(new URL("/dashboard", request.url));
//     }
//     if (role === Roles.tutor) {
//       return NextResponse.redirect(new URL("/tutor-dashboard", request.url));
//     }
//   }

//   // TUTOR protection
//   if (pathName.startsWith("/tutor-dashboard") && role !== Roles.tutor) {
//     if (role === Roles.admin) {
//       return NextResponse.redirect(new URL("/admin-dashboard", request.url));
//     }
//     if (role === Roles.student) {
//       return NextResponse.redirect(new URL("/dashboard", request.url));
//     }
//   }

//   // STUDENT protection
//   if (pathName.startsWith("/dashboard") && role !== Roles.student) {
//     if (role === Roles.admin) {
//       return NextResponse.redirect(new URL("/admin-dashboard", request.url));
//     }
//     if (role === Roles.tutor) {
//       return NextResponse.redirect(new URL("/tutor-dashboard", request.url));
//     }
//   }

//   // Allow access if session exists
//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/dashboard/:path*",
//     "/admin-dashboard/:path*",
//     "/tutor-dashboard/:path*",
//   ],
// };

import { Roles } from "@/constants/roles";
import { userService } from "@/services/user.service";
import { NextRequest, NextResponse } from "next/server";

// Assuming these are imported from your constants/types
// const Roles = {
//   admin: "admin",
//   student: "student",
//   tutor: "tutor",
// } as const;

// Map roles to their specific base dashboards to avoid nested if-statements
const ROLE_DASHBOARDS: Record<string, string> = {
  [Roles.admin]: "/admin-dashboard",
  [Roles.student]: "/dashboard",
  [Roles.tutor]: "/tutor-dashboard",
};

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get("better-auth.session_token");

  // 1. Immediate Redirect if no token exists
  if (!sessionToken) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // 2. Fetch session data
  // Note: Ensure userService.getSession() works in Edge Runtime
  // or use the 'better-auth' client specifically for middleware.
  const { data: session } = await userService.getSession();
  const role = session?.user?.role;

  if (!role) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // 3. Role-Based Access Control (RBAC)
  const allowedPath = ROLE_DASHBOARDS[role];

  // If the user is trying to access a dashboard that doesn't belong to their role
  const isAccessingWrongDashboard =
    Object.values(ROLE_DASHBOARDS).some((path) => pathname.startsWith(path)) &&
    !pathname.startsWith(allowedPath);

  if (isAccessingWrongDashboard) {
    return NextResponse.redirect(new URL(allowedPath, request.url));
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
