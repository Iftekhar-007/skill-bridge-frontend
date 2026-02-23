"use client";

import { TutorProfile } from "@/types/tutor.type";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { createBookingAction } from "@/actions/booking.action";
import { useTransition } from "react";
import { toast } from "sonner";
import {
  BookOpen,
  Clock,
  DollarSign,
  GraduationCap,
  Star,
  Users,
  CalendarCheck,
  CheckCircle2,
  XCircle,
} from "lucide-react";

interface ExpertiseItem {
  tutorProfileId?: string;
  categoryId: string;
  category?: {
    id: string;
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
    reviews,
  } = tutor;

  const [isPending, startTransition] = useTransition();
  const isAvailable = availability === "AVAILABLE";

  const initials = user?.name
    ?.split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleBooking = () => {
    startTransition(async () => {
      try {
        await createBookingAction({
          tutorId: tutor.id,
          date: new Date(),
          startTime: new Date(startTime),
          endTime: new Date(endTime),
          price: hourlyRate,
        });
        toast.success("Session booked successfully 🎉");
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An error occurred";
        toast.error(errorMessage);
      }
    });
  };

  return (
    <div className="min-h-screen bg-muted/30 py-10">
      <div className="container max-w-4xl mx-auto px-4 space-y-6">
        {/* ── Hero Card ── */}
        <Card className="overflow-hidden border-0 shadow-xl">
          {/* Gradient banner */}
          <div className="relative h-40 bg-gradient-to-br from-primary to-primary/70">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "radial-gradient(circle, white 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
            {/* Availability pill pinned top-right */}
            <div className="absolute top-4 right-4">
              <Badge
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border-0 ${
                  isAvailable
                    ? "bg-emerald-500/20 text-emerald-300 backdrop-blur-sm"
                    : "bg-red-500/20 text-red-300 backdrop-blur-sm"
                }`}
              >
                {isAvailable ? (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                ) : (
                  <XCircle className="w-3.5 h-3.5" />
                )}
                {isAvailable ? "Available" : "Unavailable"}
              </Badge>
            </div>
          </div>

          {/* Avatar overlapping banner */}
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-12">
              <Avatar className="h-24 w-24 border-4 border-background shadow-xl">
                <AvatarImage src={user?.image || ""} />
                <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
                  {initials || "T"}
                </AvatarFallback>
              </Avatar>

              {/* Rate + Book button */}
              <div className="flex items-center gap-3 sm:mb-1">
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Hourly Rate</p>
                  <p className="text-2xl font-bold text-foreground flex items-center gap-1">
                    <DollarSign className="w-5 h-5 text-emerald-500" />৳
                    {hourlyRate}
                    <span className="text-sm font-normal text-muted-foreground">
                      /hr
                    </span>
                  </p>
                </div>

                <Button
                  onClick={handleBooking}
                  disabled={isPending || !isAvailable}
                  size="lg"
                  className="rounded-xl gap-2 px-6"
                >
                  <CalendarCheck className="w-4 h-4" />
                  {isPending ? "Booking..." : "Book Session"}
                </Button>
              </div>
            </div>

            {/* Name + meta */}
            <div className="mt-3 space-y-2">
              <h1 className="text-2xl font-bold text-foreground">
                {user?.name}
              </h1>
              <p className="text-sm text-muted-foreground">{user?.email}</p>

              {/* Stats row */}
              <div className="flex flex-wrap gap-4 pt-1">
                <div className="flex items-center gap-1.5 text-sm">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-semibold">
                    {averageRating.toFixed(1)}
                  </span>
                  <span className="text-muted-foreground">Rating</span>
                </div>

                <div className="flex items-center gap-1.5 text-sm">
                  <Users className="w-4 h-4 text-blue-500" />
                  <span className="font-semibold">{totalStudents}</span>
                  <span className="text-muted-foreground">Students</span>
                </div>

                <div className="flex items-center gap-1.5 text-sm">
                  <Clock className="w-4 h-4 text-violet-500" />
                  <span className="font-semibold">
                    {/* {new Date(startTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "} */}
                    {startTime}–{" "}
                    {/* {new Date(endTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })} */}
                    {endTime}
                  </span>
                  <span className="text-muted-foreground">Session hours</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* ── About ── */}
        <Card className="border shadow-sm">
          <CardContent className="p-6 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-base">
              <BookOpen className="w-4 h-4 text-primary" />
              About
            </div>
            <Separator />
            <p className="text-muted-foreground leading-relaxed pt-1">
              {bio || "This tutor hasn't added a bio yet."}
            </p>
          </CardContent>
        </Card>

        {/* ── Expertise ── */}
        {expertise && expertise.length > 0 && (
          <Card className="border shadow-sm">
            <CardContent className="p-6 space-y-3">
              <div className="flex items-center gap-2 font-semibold text-base">
                <GraduationCap className="w-4 h-4 text-primary" />
                Areas of Expertise
              </div>
              <Separator />
              <div className="flex flex-wrap gap-2 pt-1">
                {expertise.map((item: ExpertiseItem) => (
                  <Badge
                    key={item.categoryId}
                    variant="secondary"
                    className="rounded-full px-4 py-1.5 text-sm"
                  >
                    {item.category?.title ?? "Subject"}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* ── Reviews ── */}
        {reviews && reviews.length > 0 && (
          <Card className="border shadow-sm">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-semibold text-base">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  Reviews
                  <span className="text-sm font-normal text-muted-foreground">
                    ({reviews.length})
                  </span>
                </div>
                <span className="text-sm font-semibold text-indigo-600">
                  {averageRating.toFixed(1)} avg
                </span>
              </div>
              <Separator />

              <div className="space-y-4 pt-1">
                {reviews.map((review) => (
                  <div key={review.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center shrink-0">
                          <span className="text-white text-xs font-bold">
                            {review.student?.user?.name?.charAt(0) ?? "S"}
                          </span>
                        </div>
                        <p className="text-sm font-semibold text-foreground">
                          {review.student?.user?.name ?? "Student"}
                        </p>
                      </div>

                      {/* Stars */}
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className="w-3.5 h-3.5"
                            fill={
                              i < Math.round(review.rating) ? "#f59e0b" : "none"
                            }
                            stroke={
                              i < Math.round(review.rating)
                                ? "#f59e0b"
                                : "#cbd5e1"
                            }
                          />
                        ))}
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed pl-10">
                      {review.comment}
                    </p>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground pl-10">
                      {new Date(review.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                    <Separator className="mt-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* No reviews fallback */}
        {(!reviews || reviews.length === 0) && (
          <Card className="border shadow-sm">
            <CardContent className="p-6 text-center text-muted-foreground text-sm">
              No reviews yet for this tutor.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
