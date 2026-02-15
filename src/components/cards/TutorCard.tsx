"use client";

import { TutorProfile } from "@/types/tutor.type";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Link from "next/link";

interface Props {
  tutor: TutorProfile;
}

export default function TutorCard({ tutor }: Props) {
  const {
    id,
    user,
    availability,
    bio,
    hourlyRate,
    averageRating,
    totalStudents,
    startTime,
    endTime,
  } = tutor;

  return (
    <Card className="hover:shadow-xl transition-all duration-300 rounded-2xl">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="space-y-1">
          <h2 className="text-lg font-semibold">{user?.name}</h2>
          <Badge
            variant={availability === "AVAILABLE" ? "default" : "destructive"}
          >
            {availability}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {bio || "No bio provided."}
        </p>

        <div className="flex justify-between text-sm">
          <span className="font-medium">Hourly Rate</span>
          <span>৳ {hourlyRate}</span>
        </div>

        <div className="flex justify-between text-sm items-center">
          <span className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-500" />
            {averageRating.toFixed(1)}
          </span>
          <span>{totalStudents} students</span>
        </div>

        <div className="text-sm text-muted-foreground">
          <span className="font-medium">Available:</span>{" "}
          {new Date(startTime).toLocaleTimeString()} -{" "}
          {new Date(endTime).toLocaleTimeString()}
        </div>
      </CardContent>

      <CardFooter>
        <Link href={`/tutors/${id}`} className="w-full">
          <Button className="w-full rounded-xl">View Profile</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
