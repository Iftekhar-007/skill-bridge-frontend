import { Route } from "@/types";

export const tutorRoutes: Route[] = [
  {
    title: "Tutor Dashboard",
    items: [
      {
        title: "Create Profile",
        url: "/tutor-dashboard/create-profile",
      },
      {
        title: "Bookings",
        url: "/tutor-dashboard/my-bookings",
      },
    ],
  },
];
