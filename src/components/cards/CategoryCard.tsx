import { Categories } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users } from "lucide-react";

interface Props {
  category: Categories;
}

// Cycle through gradients so each card feels distinct
const gradients = [
  "from-violet-500 to-purple-600",
  "from-blue-500 to-cyan-600",
  "from-emerald-500 to-teal-600",
  "from-orange-500 to-rose-500",
  "from-pink-500 to-fuchsia-600",
  "from-amber-500 to-yellow-600",
];

function getGradient(title: string) {
  const index = title.charCodeAt(0) % gradients.length;
  return gradients[index];
}

function getInitials(title: string) {
  return title
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export const CategoryCard = ({ category }: Props) => {
  const tutorCount = category.tutors?.length ?? 0;
  const gradient = getGradient(category.title);
  const initials = getInitials(category.title);

  return (
    <Link href={`/categories/${category.id}`} className="block group">
      <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        {/* Top gradient banner with image or avatar */}
        <div
          className={`relative bg-gradient-to-br ${gradient} h-32 flex items-center justify-center`}
        >
          {category.image ? (
            <Image
              src={category.image}
              alt={category.title}
              fill
              className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <Avatar className="h-16 w-16 border-4 border-white/30 shadow-lg">
              <AvatarFallback className="bg-white/20 text-white text-xl font-bold backdrop-blur-sm">
                {initials}
              </AvatarFallback>
            </Avatar>
          )}

          {/* Tutor count badge pinned to top-right */}
          <Badge
            className="absolute top-3 right-3 bg-white/20 text-white backdrop-blur-sm border-white/30 hover:bg-white/30"
            variant="outline"
          >
            <Users className="h-3 w-3 mr-1" />
            {tutorCount} {tutorCount === 1 ? "Tutor" : "Tutors"}
          </Badge>
        </div>

        {/* Card body */}
        <CardContent className="p-4 space-y-1">
          <h3 className="font-semibold text-base text-foreground group-hover:text-primary transition-colors leading-tight">
            {category.title}
          </h3>
          <p className="text-xs text-muted-foreground">
            Browse tutors in this category →
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};
