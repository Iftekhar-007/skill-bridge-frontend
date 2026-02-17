// import React from "react";

// export default function AdminDashboard() {
//   return <div>AdminDashboard</div>;
// }

"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AdminDashboard() {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, Admin. Here’s what’s happening today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardDescription>Total Users</CardDescription>
            <CardTitle className="text-3xl">1,245</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>Total Tutors</CardDescription>
            <CardTitle className="text-3xl">320</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">+5 new tutors today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>Total Sessions</CardDescription>
            <CardTitle className="text-3xl">2,845</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              +18% engagement increase
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>Total Revenue</CardDescription>
            <CardTitle className="text-3xl">$12,430</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">+9% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-7">
        {/* Users Table */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
            <CardDescription>Recently registered users</CardDescription>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                <TableRow>
                  <TableCell className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    John Doe
                  </TableCell>

                  <TableCell>john@example.com</TableCell>

                  <TableCell>
                    <Badge>Tutor</Badge>
                  </TableCell>

                  <TableCell>
                    <Badge variant="secondary">Active</Badge>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>SA</AvatarFallback>
                    </Avatar>
                    Sarah Ahmed
                  </TableCell>

                  <TableCell>sarah@example.com</TableCell>

                  <TableCell>
                    <Badge variant="outline">Student</Badge>
                  </TableCell>

                  <TableCell>
                    <Badge variant="secondary">Active</Badge>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>MK</AvatarFallback>
                    </Avatar>
                    Michael Khan
                  </TableCell>

                  <TableCell>michael@example.com</TableCell>

                  <TableCell>
                    <Badge>Admin</Badge>
                  </TableCell>

                  <TableCell>
                    <Badge variant="destructive">Suspended</Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Activity */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest platform activities</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>

              <div>
                <p className="text-sm font-medium">
                  John Doe created a tutor profile
                </p>
                <p className="text-xs text-muted-foreground">2 minutes ago</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarFallback>SA</AvatarFallback>
              </Avatar>

              <div>
                <p className="text-sm font-medium">Sarah booked a session</p>
                <p className="text-xs text-muted-foreground">10 minutes ago</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarFallback>MK</AvatarFallback>
              </Avatar>

              <div>
                <p className="text-sm font-medium">Admin approved a tutor</p>
                <p className="text-xs text-muted-foreground">30 minutes ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
