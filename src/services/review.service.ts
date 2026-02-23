import { env } from "@/env";
import { cookies } from "next/headers";
import { Reviews } from "@/types";
import { userService } from "./user.service";

const REVIEW_URL = env.REVIEW_URL;

export const ReviewService = {
  async getAllReviews(): Promise<Reviews[]> {
    const cookieStore = await cookies();

    const res = await fetch(`${REVIEW_URL}/all-reviews`, {
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

export const reviewService = {
  async getTutorReviews(tutorId: string): Promise<Reviews[]> {
    const { data: session } = await userService.getSession();
    console.log("session user:", JSON.stringify(session?.user, null, 2));

    const res = await fetch(`${REVIEW_URL}/${tutorId}`, {
      cache: "no-store",
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message);
    }

    return result.data;
  },
};
