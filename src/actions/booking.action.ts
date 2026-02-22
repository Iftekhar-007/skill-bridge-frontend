// app/actions/booking.ts
"use server";

import { Roles } from "@/constants/roles";
import { env } from "@/env";
import { userService } from "@/services/user.service";
import { cookies } from "next/headers";
// import { env } from "@/env";

const BOOKING_URL = env.BOOKING_URL;

export async function createBookingAction(payload: {
  tutorId: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  price: number;
}) {
  const { data: session } = await userService.getSession();

  const cookieStore = await cookies();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  if (session.user.role !== Roles.student) {
    throw new Error("Only students can book sessions");
  }

  const res = await fetch(`${BOOKING_URL}/create-booking`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
}

export async function updateBookingStatusAction(
  bookingId: string,
  status: string,
) {
  const cookieStore = await cookies();
  const { data: session } = await userService.getSession();

  if (!session?.user) throw new Error("Unauthorized");

  console.log("Cookies being sent:", cookieStore.toString().substring(0, 100));

  const res = await fetch(`${BOOKING_URL}/${bookingId}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
    body: JSON.stringify({ status }),
    cache: "no-store",
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);

  return data;
}
