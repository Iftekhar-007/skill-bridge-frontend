// import { Categories } from "@/types";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// import Image from "next/image";
// import Link from "next/link";

// interface Props {
//   category: Categories;
// }

// export default function CategoryCard({ category }: Props) {
//   return (
//     <Link href={`/categories/${category.id}`}>
//       <Card className="group overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border">
//         {/* Image */}
//         <div className="relative w-full h-40 overflow-hidden">
//           <Image
//             src={category.image || "/placeholder.png"}
//             alt={category.title}
//             fill
//             className="object-cover group-hover:scale-110 transition-transform duration-500"
//           />
//         </div>

//         {/* Content */}
//         <CardHeader>
//           <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
//             {category.title}
//           </CardTitle>
//         </CardHeader>

//         <CardContent>
//           <p className="text-sm text-muted-foreground">
//             View tutors in this category
//           </p>

//           {/* optional tutor count */}
//           {category.tutors && (
//             <p className="text-xs text-muted-foreground mt-2">
//               {category.tutors.length} Tutors available
//             </p>
//           )}
//         </CardContent>
//       </Card>
//     </Link>
//   );
// }

import { Categories } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Image from "next/image";
import Link from "next/link";

interface Props {
  category: Categories;
}

export default function CategoryCard({ category }: Props) {
  // get first two letters
  const initials = category.title
    ?.split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Link href={`/categories/${category.id}`}>
      <Card className="group overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        {/* Image OR Avatar */}
        <div className="relative w-full h-40 flex items-center justify-center bg-muted overflow-hidden">
          {category.image ? (
            <Image
              src={category.image}
              alt={category.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <Avatar className="h-16 w-16 text-lg font-semibold">
              <AvatarImage src="" />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          )}
        </div>

        {/* Content */}
        <CardHeader>
          <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
            {category.title}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground">
            Browse tutors in this category
          </p>

          {category.tutors && (
            <p className="text-xs text-muted-foreground mt-1">
              {category.tutors.length} tutors available
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
