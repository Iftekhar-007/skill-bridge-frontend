import { env } from "@/env";
import { cookies } from "next/headers";

const BOOKING_URL = env.BOOKING_URL;

export const bookingService = {
  async getAllBookings() {
    const cookieStore = await cookies();

    const res = await fetch(`${BOOKING_URL}/all-bookings`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message);
    }

    return result.data;
  },
};
