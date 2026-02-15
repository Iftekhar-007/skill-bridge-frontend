"use client";

import { TutorProfile } from "@/types/tutor.type";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Star, Clock, DollarSign } from "lucide-react";

interface ExpertiseItem {
  id: string;
  category?: {
    title: string;
  };
}

interface Props {
  tutor: TutorProfile;
}

export default function SingleTutorCard({ tutor }: Props) {
  const {
    user,
    availability,
    bio,
    hourlyRate,
    averageRating,
    totalStudents,
    startTime,
    endTime,
    expertise,
  } = tutor;

  return (
    <Card className="max-w-4xl mx-auto rounded-3xl shadow-lg">
      <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        {/* Left Section */}
        <div className="flex items-center gap-5">
          <Avatar className="h-24 w-24">
            <AvatarImage src={user?.image || ""} />
            <AvatarFallback className="text-2xl">
              {user?.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div className="space-y-2">
            <CardTitle className="text-2xl">{user?.name}</CardTitle>

            <Badge
              variant={availability === "AVAILABLE" ? "default" : "destructive"}
              className="rounded-full px-4 py-1"
            >
              {availability}
            </Badge>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Star className="h-4 w-4 text-yellow-500" />
              {averageRating.toFixed(1)} • {totalStudents} students
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="text-right space-y-2">
          <div className="flex items-center justify-end gap-2 text-lg font-semibold">
            <DollarSign className="h-5 w-5" />৳ {hourlyRate} / hour
          </div>

          <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            {new Date(startTime).toLocaleTimeString()} -{" "}
            {new Date(endTime).toLocaleTimeString()}
          </div>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="space-y-6 pt-6">
        {/* Bio */}
        <div>
          <h3 className="font-semibold mb-2">About Tutor</h3>
          <p className="text-muted-foreground leading-relaxed">
            {bio || "No bio provided yet."}
          </p>
        </div>

        {/* Expertise */}
        {expertise && expertise.length > 0 && (
          <div>
            <h3 className="font-semibold mb-3">Expertise</h3>
            <div className="flex flex-wrap gap-2">
              {expertise?.map((item: ExpertiseItem) => (
                <Badge
                  key={item.id}
                  variant="secondary"
                  className="rounded-full px-4 py-1"
                >
                  {item.category?.title}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="pt-4">
          <Button className="w-full rounded-2xl text-base py-6">
            Book Session
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
