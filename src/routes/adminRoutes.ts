import { Route } from "@/types";

export const adminRoutes: Route[] = [
  {
    title: "Admin Dashboard",
    items: [
      {
        title: "All User",
        url: "/admin-dashboard/all-user",
      },
      {
        title: "Create Category",
        url: "/admin-dashboard/create-category",
      },
      {
        title: "All Bookings",
        url: "/admin-dashboard/all-bookings",
      },
    ],
  },
];
