import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { categoryService } from "@/services/category.service";
import {
  BookOpen,
  Clock,
  DollarSign,
  GraduationCap,
  Star,
  Users,
} from "lucide-react";
import Image from "next/image";

interface TutorItem {
  tutorProfileId: string;
  tutor: {
    id: string;
    availability: string;
    hourlyRate: number;
    averageRating: number;
    totalStudents: number;
    bio?: string;
    user: {
      name: string;
      image?: string;
    };
  };
}

export async function generateStaticParams() {
  const res = await categoryService.getCategories();
  return res.data.data;
}

export default async function SingleCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data } = await categoryService.getCategoryById(id);
  const category = data?.data;
  const tutorCount = category?.tutors?.length ?? 0;

  return (
    <div className="min-h-screen bg-muted/30">
      {/* ── Hero Banner ── */}
      <div className="relative bg-gradient-to-br from-primary/90 to-primary overflow-hidden">
        {/* subtle grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative container mx-auto px-4 py-16 flex flex-col md:flex-row items-center gap-8">
          {/* Category image or icon placeholder */}
          <div className="shrink-0">
            {category?.image ? (
              <Image
                src={category.image}
                alt={category.title}
                width={120}
                height={120}
                className="rounded-2xl border-4 border-white/30 shadow-2xl object-cover w-28 h-28"
              />
            ) : (
              <div className="w-28 h-28 rounded-2xl bg-white/20 border-4 border-white/30 shadow-2xl flex items-center justify-center backdrop-blur-sm">
                <BookOpen className="w-12 h-12 text-white" />
              </div>
            )}
          </div>

          {/* Title + stats */}
          <div className="flex-1 text-white text-center md:text-left">
            <p className="text-white/70 text-sm font-medium uppercase tracking-widest mb-1">
              Category
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {category?.title}
            </h1>

            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium">
                <Users className="w-4 h-4" />
                {tutorCount} {tutorCount === 1 ? "Tutor" : "Tutors"}
              </div>
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium">
                <GraduationCap className="w-4 h-4" />
                Expert Instructors
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Tutors Grid ── */}
      <div className="container mx-auto px-4 py-12 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">
            Available Tutors
          </h2>
          <Badge variant="secondary" className="text-sm px-3 py-1">
            {tutorCount} found
          </Badge>
        </div>

        <Separator />

        {tutorCount === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground gap-3">
            <GraduationCap className="w-12 h-12 opacity-30" />
            <p className="text-lg font-medium">No tutors available yet.</p>
            <p className="text-sm">Check back soon!</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {category?.tutors?.map((tutorItem: TutorItem) => {
            const tutor = tutorItem?.tutor;
            const initials = tutor?.user?.name
              ?.split(" ")
              .map((w) => w[0])
              .join("")
              .slice(0, 2)
              .toUpperCase();

            return (
              <Card
                key={tutorItem.tutorProfileId}
                className="group overflow-hidden border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card"
              >
                {/* Colored top accent bar */}
                <div className="h-1.5 w-full bg-gradient-to-r from-primary to-primary/50" />

                <CardContent className="p-5 space-y-4">
                  {/* Header row */}
                  <div className="flex items-center gap-4">
                    <Avatar className="h-14 w-14 border-2 border-primary/20 shadow-sm">
                      <AvatarImage src={tutor?.user?.image || ""} />
                      <AvatarFallback className="bg-primary/10 text-primary font-bold text-lg">
                        {initials || "T"}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-base truncate text-foreground group-hover:text-primary transition-colors">
                        {tutor?.user?.name}
                      </p>
                      <Badge
                        variant={
                          tutor?.availability === "available"
                            ? "default"
                            : "secondary"
                        }
                        className="mt-1 text-xs capitalize"
                      >
                        <Clock className="w-3 h-3 mr-1" />
                        {tutor?.availability}
                      </Badge>
                    </div>
                  </div>

                  <Separator />

                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="space-y-0.5">
                      <div className="flex items-center justify-center gap-1 text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span className="text-sm font-bold text-foreground">
                          {tutor?.averageRating ?? "—"}
                        </span>
                      </div>
                      <p className="text-[11px] text-muted-foreground">
                        Rating
                      </p>
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex items-center justify-center gap-1">
                        <Users className="w-3.5 h-3.5 text-blue-500" />
                        <span className="text-sm font-bold text-foreground">
                          {tutor?.totalStudents ?? 0}
                        </span>
                      </div>
                      <p className="text-[11px] text-muted-foreground">
                        Students
                      </p>
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex items-center justify-center gap-1">
                        <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-sm font-bold text-foreground">
                          {tutor?.hourlyRate}/hr
                        </span>
                      </div>
                      <p className="text-[11px] text-muted-foreground">Rate</p>
                    </div>
                  </div>

                  {/* Bio */}
                  {tutor?.bio && (
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed border-t pt-3">
                      {tutor.bio}
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
