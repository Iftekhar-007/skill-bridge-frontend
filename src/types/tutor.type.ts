import { Bookings } from "./booking.type";
import { Reviews } from "./reviews.type";

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
