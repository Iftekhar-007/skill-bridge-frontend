import { Reviews } from "./reviews.type";
import { StudentProfile } from "./studentProfile.type";
import { TutorProfile } from "./tutor.type";

export interface Bookings {
  id: string;

  studentId: string;
  tutorId: string;

  date: string;
  startTime: string;
  endTime: string;

  status: BookingsStatus;
  price: number;

  ctreatedAt: string; // ⚠ backend typo same রাখা হয়েছে exact match এর জন্য

  student?: StudentProfile;
  tutor?: TutorProfile;
  reviews?: Reviews | null;
}

export type BookingsStatus = "COMPLETED" | "CONFIRMED" | "CANCELLED";
