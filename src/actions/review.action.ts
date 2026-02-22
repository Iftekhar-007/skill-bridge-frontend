"use server";

import { env } from "@/env";
import { cookies } from "next/headers";

const REVIEW_URL = env.REVIEW_URL; // backend API for review

export const createReview = async (prevState: unknown, formData: FormData) => {
  try {
    const tutorId = formData.get("tutorId") as string;
    const bookingId = formData.get("bookingId") as string;
    const rating = Number(formData.get("rating"));
    const comment = formData.get("comment") as string;

    const reviewData = {
      tutorId,
      bookingId,
      rating,
      comment,
    };

    const cookieStore = await cookies();

    const res = await fetch(`${REVIEW_URL}/create-review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(reviewData),
      cache: "no-store",
    });

    const result = await res.json();

    if (!res.ok) {
      return { success: false, message: result.message };
    }

    return { success: true, message: "Review submitted successfully 🎉" };
  } catch (error: unknown) {
    return {
      success: false,
      message: error instanceof Error ? error.message : String(error),
    };
  }
};
