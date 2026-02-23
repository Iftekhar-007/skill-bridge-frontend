import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import TutorCard from "@/components/cards/TutorCard";
import { CategoryCard } from "@/components/cards/CategoryCard";
import { tutorServices } from "@/services/tutor.service";
import { categoryService } from "@/services/category.service";
import { TutorProfile } from "@/types/tutor.type";
import { Categories } from "@/types";

export default async function FeaturedSection() {
  const [{ data: tutorData }, { data: categoryData }] = await Promise.all([
    tutorServices.getTutors({ limitNumber: 4 }, { revalidate: 60 }),
    categoryService.getCategories(),
  ]);

  const tutors: TutorProfile[] = tutorData?.data?.slice(0, 4) ?? [];
  const categories: Categories[] = categoryData?.data?.slice(0, 4) ?? [];

  return (
    <section className="max-w-full mx-auto py-20 space-y-20">
      {/* Featured Tutors */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Learn from the best
            </p>
            <h2 className="text-2xl font-bold text-foreground">
              Featured Tutors
            </h2>
          </div>
          <Button variant="outline" asChild>
            <Link href="/tutors">View All</Link>
          </Button>
        </div>

        <Separator />

        {tutors.length === 0 ? (
          <p className="text-muted-foreground text-sm">No tutors found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {tutors.map((tutor) => (
              <TutorCard key={tutor.id} tutor={tutor} />
            ))}
          </div>
        )}
      </div>

      {/* Featured Categories */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Find your subject
            </p>
            <h2 className="text-2xl font-bold text-foreground">
              Browse Categories
            </h2>
          </div>
          <Button variant="outline" asChild>
            <Link href="/tutors">View All</Link>
          </Button>
        </div>

        <Separator />

        {categories.length === 0 ? (
          <p className="text-muted-foreground text-sm">No categories found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
