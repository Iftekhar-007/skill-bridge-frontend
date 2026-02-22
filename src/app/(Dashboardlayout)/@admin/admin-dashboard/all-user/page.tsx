// import React from "react";

import { UserTable } from "@/components/modules/admin/UserTable";
import { UserStatus } from "@/constants/userStatus";
import { adminService } from "@/services/admin.service";

// export default function AllUserPage() {
//   return <div>AllUserPage</div>;
// }

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: UserStatus;
  createdAt: string;
}

export const generateStaticParams = async () => {
  const users = await adminService.getAllUsers();
  return users.data.map((u: User) => ({ id: u.id }));
};

export default async function UsersPage() {
  const users: User[] = await adminService.getAllUsers();
  const total = users.length;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      <UserTable users={users} total={total} />
    </div>
  );
}
