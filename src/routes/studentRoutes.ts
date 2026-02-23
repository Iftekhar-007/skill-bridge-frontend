import { Route } from "@/types";

export const studentRoutes: Route[] = [
  {
    title: "Student Dashboard",
    items: [
      {
        title: "Create Profile",
        url: "/dashboard/create-student",
      },
      {
        title: "My Bookings",
        url: "/dashboard/my-bookings",
      },
    ],
  },
];
