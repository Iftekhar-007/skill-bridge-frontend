import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Route } from "@/types";
import { Roles } from "@/constants/roles";
import { adminRoutes } from "@/routes/adminRoutes";
import { tutorRoutes } from "@/routes/tutorRoutes";
import { studentRoutes } from "@/routes/studentRoutes";

// This is sample data.
const data = {
  logo: {
    url: "/",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg",
    alt: "logo",
    title: "Skill Bridge",
  },
  navMain: [
    {
      title: "Getting Started",
      url: "#",
      items: [
        {
          title: "Installation",
          url: "#",
          isActive: false,
        },
        {
          title: "Project Structure",
          url: "#",
          isActive: false,
        },
      ],
    },
  ],
};

export function AppSidebar({
  user,
  ...props
}: {
  user: { role: string } & React.ComponentProps<typeof Sidebar>;
}) {
  let routes: Route[] = [];

  switch (user.role) {
    case Roles.admin:
      routes = adminRoutes;
      break;

    case Roles.tutor:
      routes = tutorRoutes;
      break;

    case Roles.student:
      routes = studentRoutes;
      break;

    default:
      routes = [];
      break;
  }
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <a href={data.logo.url} className="flex items-center gap-2">
          <img
            src={data.logo.src}
            className="max-h-8 dark:invert"
            alt={data.logo.alt}
          />
          <span className="text-lg font-semibold tracking-tighter">
            {data.logo.title}
          </span>
        </a>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {routes.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
