import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { userService } from "@/services/user.service";
import { Roles } from "@/constants/roles";

const DashBoardLayout = async ({
  admin,
  student,
  tutor,
}: {
  admin: React.ReactNode;
  student: React.ReactNode;
  tutor: React.ReactNode;
}) => {
  const { data: session } = await userService.getSession();
  const userInfo = session.user;
  let content;

  if (userInfo.role === Roles.admin) {
    content = admin;
  } else if (userInfo.role === Roles.tutor) {
    content = tutor;
  } else {
    content = student;
  }
  return (
    <div>
      <SidebarProvider>
        <AppSidebar user={userInfo} />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4">{content}</div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default DashBoardLayout;
