import { Bookings } from "./booking.type";
import { Reviews } from "./reviews.type";

export interface StudentProfile {
  id: string;
  userId: string;

  phone?: string | null;
  level: number;

  createdAt: string;
  updatedAt: string;

  user?: {
    id: string;
    name: string;
    email: string;
    image?: string;
  };
  bookings?: Bookings[];
  reviews?: Reviews[];
}
