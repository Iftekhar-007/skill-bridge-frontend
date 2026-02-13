import { Bookings } from "./booking.type";
import { StudentProfile } from "./studentProfile.type";
import { TutorProfile } from "./tutor.type";

export interface Reviews {
  id: string;

  studentId: string;
  tutorId: string;
  bookingId: string;

  rating: number;
  comment: string;

  createdAt: string;

  student?: StudentProfile;
  tutor?: TutorProfile;
  booking?: Bookings;
}
