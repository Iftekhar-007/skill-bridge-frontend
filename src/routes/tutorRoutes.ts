import { Route } from "@/types";

export const tutorRoutes: Route[] = [
  {
    title: "Tutor",
    items: [
      {
        title: "Profile",
        url: "#",
        // isActive: true,
      },
      {
        title: "Create Profile",
        url: "/tutor-dashboard/create-profile",
      },
      {
        title: "Bookings",
        url: "#",
      },
      {
        title: "Slots",
        url: "#",
      },
    ],
  },
];
