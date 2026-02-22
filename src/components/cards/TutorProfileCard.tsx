// // components/cards/TutorProfileCard.tsx
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardContent,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";

// interface TutorProfileCardProps {
//   name: string;
//   bio?: string;
//   hourlyRate: number;
//   availability: string;
//   totalStudents: number;
//   averageRating: number;
//   expertise: string[];
// }

// export default function TutorProfileCard({
//   name,
//   bio,
//   hourlyRate,
//   availability,
//   totalStudents,
//   averageRating,
//   expertise,
// }: TutorProfileCardProps) {
//   return (
//     <Card className="max-w-md mx-auto mt-10 shadow-lg hover:shadow-xl transition-shadow duration-300">
//       <CardHeader>
//         <CardTitle className="text-2xl font-semibold">{name}</CardTitle>
//         {bio && (
//           <CardDescription className="text-sm text-muted-foreground">
//             {bio}
//           </CardDescription>
//         )}
//       </CardHeader>
//       <CardContent className="space-y-2">
//         <p>
//           <span className="font-semibold">Hourly Rate:</span> ${hourlyRate}
//         </p>
//         <p>
//           <span className="font-semibold">Availability:</span> {availability}
//         </p>
//         <p>
//           <span className="font-semibold">Total Students:</span> {totalStudents}
//         </p>
//         <p>
//           <span className="font-semibold">Average Rating:</span>{" "}
//           {averageRating.toFixed(1)}
//         </p>
//         <div className="flex flex-wrap gap-2 mt-2">
//           {expertise.map((e) => (
//             <Badge key={e} variant="secondary">
//               {e}
//             </Badge>
//           ))}
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

// components/cards/TutorProfileCard.tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TutorProfileCardProps {
  name: string;
  bio?: string;
  hourlyRate: number;
  availability: string;
  totalStudents: number;
  averageRating: number;
  expertise: string[];
}

export default function TutorProfileCard({
  name,
  bio,
  hourlyRate,
  availability,
  totalStudents,
  averageRating,
  expertise,
}: TutorProfileCardProps) {
  return (
    <Card className="max-w-md mx-auto mt-10 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">{name}</CardTitle>
        {bio && (
          <CardDescription className="text-sm text-muted-foreground">
            {bio}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-2">
        <p>
          <span className="font-semibold">Hourly Rate:</span> ${hourlyRate}
        </p>
        <p>
          <span className="font-semibold">Availability:</span> {availability}
        </p>
        <p>
          <span className="font-semibold">Total Students:</span> {totalStudents}
        </p>
        <p>
          <span className="font-semibold">Average Rating:</span>{" "}
          {averageRating.toFixed(1)}
        </p>
        <div className="flex flex-wrap gap-2 mt-2">
          {expertise.map((e) => (
            <Badge key={e} variant="secondary">
              {e}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
