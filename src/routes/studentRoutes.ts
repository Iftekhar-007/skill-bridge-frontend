import { Route } from "@/types";

export const studentRoutes: Route[] = [
  {
    title: "Student Dashboard",
    items: [
      {
        title: "Profile",
        url: "#",
      },
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
