// model TutorProfile {
//     id            String            @id @default(uuid())
//     userId        String            @unique
//     user --         User              @relation(fields: [userId], references: [id])
//     availability  Availability      @default(AVAILABLE)
//     startTime     DateTime
//     endTime       DateTime
//     bio           String?
//     hourlyRate    Int               @default(0)
//     averageRating Float             @default(0)
//     totalStudents Int               @default(0)
//     createdAt     DateTime          @default(now())
//     updatedAt     DateTime          @updatedAt
//     expertise     TutorCategories[]
//     bookings      Bookings[]
//     reviews       Reviews[]

import { Bookings } from "./booking.type";
import { Reviews } from "./reviews.type";

//     @@map("tutor")
// }

export interface TutorProfile {
  id: string;
  userId: string;
  availability: "AVAILABLE" | "UNAVAILABLE";
  startTime: string;
  endTime: string;
  bio?: string;
  hourlyRate: number;
  averageRating: number;
  totalStudents: number;
  createdAt: string;
  updatedAt: string;

  user?: {
    id: string;
    name: string;
    email: string;
    image?: string | null;
  };

  expertise?: {
    id: string;
    categoryId: string;
  }[];

  bookings?: Bookings[];
  reviews?: Reviews[];
}
