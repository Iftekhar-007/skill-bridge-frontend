import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { categoryService } from "@/services/category.service";
import Image from "next/image";

interface TutorItem {
  tutorProfile: {
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
  //   console.log(res);

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

  console.log(data);
  return (
    <div className="container mx-auto py-10 space-y-8">
      {/* 🔥 Category Header */}
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            {category?.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col md:flex-row gap-6">
          {/* Category Image */}
          {category?.image && (
            <Image
              src={category.image}
              alt={category.title}
              width={320}
              height={208}
              className="w-full md:w-80 h-52 object-cover rounded-xl"
            />
          )}

          <div className="space-y-2">
            <p className="text-muted-foreground">
              Total Tutors:{" "}
              <span className="font-semibold">
                {category?.tutors?.length || 0}
              </span>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 🧑‍🏫 Tutors Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Available Tutors</h2>

        {category?.tutors?.length === 0 && (
          <p className="text-muted-foreground">No tutors found.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {category?.tutors?.map((tutorItem: TutorItem) => {
            const tutor = tutorItem?.tutorProfile;

            return (
              <Card key="index" className="hover:shadow-lg transition">
                <CardHeader className="flex flex-row items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={tutor?.user?.image || ""} />
                    <AvatarFallback>
                      {tutor?.user?.name?.charAt(0) || "T"}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <CardTitle className="text-lg">
                      {tutor?.user?.name}
                    </CardTitle>

                    <Badge variant="secondary">{tutor?.availability}</Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-2 text-sm">
                  <p>
                    <span className="font-medium">Rate:</span> $
                    {tutor?.hourlyRate}/hr
                  </p>

                  <p>
                    <span className="font-medium">Rating:</span>{" "}
                    {tutor?.averageRating}
                  </p>

                  <p>
                    <span className="font-medium">Students:</span>{" "}
                    {tutor?.totalStudents}
                  </p>

                  {tutor?.bio && (
                    <p className="text-muted-foreground line-clamp-3">
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
