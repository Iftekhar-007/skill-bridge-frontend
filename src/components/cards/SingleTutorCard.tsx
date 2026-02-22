// "use client";

// import { TutorProfile } from "@/types/tutor.type";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import { Star, Clock, DollarSign } from "lucide-react";

// import { useTransition } from "react";
// import { toast } from "sonner";
// import { createBookingAction } from "@/actions/booking.action";
// // import { createBookingAction } from "@/app/actions/booking";

// // interface ExpertiseItem {
// //   id: string;
// //   category?: {
// //     title: string;
// //   };
// // }

// interface ExpertiseItem {
//   tutorProfileId?: string;
//   categoryId: string;
//   category?: {
//     id: string;
//     title: string;
//   };
// }

// interface Props {
//   tutor: TutorProfile;
// }

// export default function SingleTutorCard({ tutor }: Props) {
//   const {
//     user,
//     availability,
//     bio,
//     hourlyRate,
//     averageRating,
//     totalStudents,
//     startTime,
//     endTime,
//     expertise,
//   } = tutor;

//   const [isPending, startTransition] = useTransition();

//   const handleBooking = () => {
//     startTransition(async () => {
//       try {
//         await createBookingAction({
//           tutorId: tutor.id,
//           date: new Date(),
//           startTime: new Date(startTime),
//           endTime: new Date(endTime),
//           price: hourlyRate,
//         });

//         toast.success("Session booked successfully 🎉");
//       } catch (err) {
//         const errorMessage =
//           err instanceof Error ? err.message : "An error occurred";
//         toast.error(errorMessage);
//       }
//     });
//   };

//   return (
//     <Card className="max-w-4xl mx-auto rounded-3xl shadow-lg">
//       <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
//         {/* Left Section */}
//         <div className="flex items-center gap-5">
//           <Avatar className="h-24 w-24">
//             <AvatarImage src={user?.image || ""} />
//             <AvatarFallback className="text-2xl">
//               {user?.name?.charAt(0)}
//             </AvatarFallback>
//           </Avatar>

//           <div className="space-y-2">
//             <CardTitle className="text-2xl">{user?.name}</CardTitle>

//             <Badge
//               variant={availability === "AVAILABLE" ? "default" : "destructive"}
//               className="rounded-full px-4 py-1"
//             >
//               {availability}
//             </Badge>

//             <div className="flex items-center gap-2 text-sm text-muted-foreground">
//               <Star className="h-4 w-4 text-yellow-500" />
//               {averageRating.toFixed(1)} • {totalStudents} students
//             </div>
//           </div>
//         </div>

//         {/* Right Section */}
//         <div className="text-right space-y-2">
//           <div className="flex items-center justify-end gap-2 text-lg font-semibold">
//             <DollarSign className="h-5 w-5" />৳ {hourlyRate} / hour
//           </div>

//           <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground">
//             <Clock className="h-4 w-4" />
//             {new Date(startTime).toLocaleTimeString()} -{" "}
//             {new Date(endTime).toLocaleTimeString()}
//           </div>
//         </div>
//       </CardHeader>

//       <Separator />

//       <CardContent className="space-y-6 pt-6">
//         {/* Bio */}
//         <div>
//           <h3 className="font-semibold mb-2">About Tutor</h3>
//           <p className="text-muted-foreground leading-relaxed">
//             {bio || "No bio provided yet."}
//           </p>
//         </div>

//         {/* Expertise */}
//         {expertise && expertise.length > 0 && (
//           <div>
//             <h3 className="font-semibold mb-3">Expertise</h3>
//             <div className="flex flex-wrap gap-2">
//               {expertise?.map((item: ExpertiseItem) => (
//                 <Badge
//                   key={item.categoryId} // ✅ correct unique key
//                   variant="secondary"
//                   className="rounded-full px-4 py-1"
//                 >
//                   {item.category?.title}
//                 </Badge>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* CTA */}
//         <div className="pt-4">
//           {/* <Button className="w-full rounded-2xl text-base py-6">
//             Book Session
//           </Button> */}

//           <Button
//             onClick={handleBooking}
//             disabled={isPending || tutor.availability !== "AVAILABLE"}
//             className="w-full rounded-2xl text-base py-6"
//           >
//             {isPending ? "Booking..." : "Book Session"}
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

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
                    {new Date(startTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    –{" "}
                    {new Date(endTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
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
      </div>
    </div>
  );
}
