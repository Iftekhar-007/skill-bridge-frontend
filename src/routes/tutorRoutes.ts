import { Route } from "@/types";

export const tutorRoutes: Route[] = [
  {
    title: "Tutor",
    items: [
      {
        title: "Profile",
        url: "/tutor-dashboard/my-tutor-profile",
        // isActive: true,
      },
      {
        title: "Create Profile",
        url: "/tutor-dashboard/create-profile",
      },
      {
        title: "Bookings",
        url: "/tutor-dashboard/my-bookings",
      },
      {
        title: "Slots",
        url: "#",
      },
    ],
  },
];
