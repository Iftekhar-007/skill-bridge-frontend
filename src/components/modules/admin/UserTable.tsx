"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Users, Mail, ShieldCheck, CalendarDays } from "lucide-react";
import { UserStatus } from "@/constants/userStatus";
import { useRouter } from "next/navigation";

type UserType = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: UserStatus;
  createdAt: string;
};

type UserTableProps = {
  users: UserType[];
  total?: number;
};

export const UserTable = ({ users, total }: UserTableProps) => {
  const router = useRouter();

  const getStatusVariant = (status: UserStatus) => {
    if (status === UserStatus.ACTIVE) return "default";
    if (status === UserStatus.BLOCKED) return "destructive";
    return "secondary";
  };

  return (
    <div className="overflow-x-auto rounded-2xl border bg-background shadow-sm">
      {/* header */}
      <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/40">
        <div className="flex items-center gap-2 font-semibold text-lg">
          <Users className="h-5 w-5 text-primary" />
          All Users
        </div>

        {total !== undefined && (
          <Badge variant="secondary" className="text-sm">
            Total: {total}
          </Badge>
        )}
      </div>

      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead>ID</TableHead>
            <TableHead>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                Name
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                Email
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-1">
                <ShieldCheck className="h-4 w-4" />
                Role
              </div>
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead>
              <div className="flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                Created
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-10">
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <Users className="h-8 w-8 opacity-50" />
                  <p>No users found</p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow
                key={user.id}
                className="hover:bg-muted/40 transition-colors cursor-pointer"
                onClick={() =>
                  router.push(`/admin-dashboard/all-user/${user.id}`)
                }
              >
                <TableCell className="font-mono text-xs">{user.id}</TableCell>

                <TableCell className="font-medium">{user.name}</TableCell>

                <TableCell className="text-muted-foreground">
                  {user.email}
                </TableCell>

                <TableCell>
                  <Badge variant="outline">{user.role}</Badge>
                </TableCell>

                <TableCell>
                  <Badge variant={getStatusVariant(user.status)}>
                    {user.status}
                  </Badge>
                </TableCell>

                <TableCell className="text-muted-foreground">
                  {new Date(user.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
