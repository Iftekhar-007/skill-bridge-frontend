// export default function DashboardPage() {
//   return <div>hello</div>;
// }

"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";

import { Separator } from "@/components/ui/separator";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { userAction } from "@/actions/user.action";

export default function DashboardPage() {
  // const data = userAction();
  // console.log(data);
  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}

      <Card>
        <CardContent className="flex items-center gap-4 pt-6">
          <Avatar className="h-16 w-16">
            <AvatarImage src="https://github.com/shadcn.png" />

            <AvatarFallback>ST</AvatarFallback>
          </Avatar>

          <div>
            <h2 className="text-2xl font-bold">Welcome back</h2>

            <p className="text-muted-foreground">
              Continue your learning journey today
            </p>

            <Badge className="mt-2">Level 3 Student</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardDescription>Total Bookings</CardDescription>

            <CardTitle className="text-3xl">14</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-sm text-muted-foreground">
              Sessions you&apos;ve booked
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>Reviews Given</CardDescription>

            <CardTitle className="text-3xl">6</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-sm text-muted-foreground">
              Tutor reviews submitted
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>Member Since</CardDescription>

            <CardTitle>Jan 15, 2025</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-sm text-muted-foreground">Your join date</p>
          </CardContent>
        </Card>
      </div>

      {/* Profile Info */}

      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>

          <CardDescription>Your personal details</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Full Name</p>

            <p className="font-medium">Iftekhar Rahman</p>
          </div>

          <Separator />

          <div>
            <p className="text-sm text-muted-foreground">Email</p>

            <p className="font-medium">iftekhar@gmail.com</p>
          </div>

          <Separator />

          <div>
            <p className="text-sm text-muted-foreground">Phone</p>

            <p className="font-medium">01700000000</p>
          </div>

          <Separator />

          <div>
            <p className="text-sm text-muted-foreground">Student Level</p>

            <p className="font-medium">Level 3</p>
          </div>
        </CardContent>
      </Card>

      {/* Recent Bookings */}

      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>

          <CardDescription>Your latest tutoring sessions</CardDescription>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tutor</TableHead>

                <TableHead>Subject</TableHead>

                <TableHead>Date</TableHead>

                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow>
                <TableCell>John Smith</TableCell>

                <TableCell>Mathematics</TableCell>

                <TableCell>Feb 15, 2026</TableCell>

                <TableCell>
                  <Badge>Completed</Badge>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Sarah Khan</TableCell>

                <TableCell>Physics</TableCell>

                <TableCell>Feb 18, 2026</TableCell>

                <TableCell>
                  <Badge variant="secondary">Upcoming</Badge>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Michael Lee</TableCell>

                <TableCell>Chemistry</TableCell>

                <TableCell>Feb 20, 2026</TableCell>

                <TableCell>
                  <Badge variant="outline">Pending</Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
