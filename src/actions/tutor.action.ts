"use server";

import { env } from "@/env";
import { updateTag } from "next/cache";
import { cookies } from "next/headers";

const TUTOR_URL = env.TUTOR_URL;
export const createTutor = async (prevState: unknown, formData: FormData) => {
  try {
    const bio = formData.get("bio") as string;
    const hourlyRate = Number(formData.get("hourlyRate"));
    const startTime = formData.get("startTime") as string;
    const endTime = formData.get("endTime") as string;

    const categoryIds = formData
      .getAll("categoryIds")
      .map((id) => id.toString());

    const tutorData = {
      bio,
      hourlyRate,
      startTime,
      endTime,
      categoryIds,
    };

    const cookieStore = await cookies();

    const res = await fetch(`${TUTOR_URL}/create-tutor`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(tutorData),
    });

    const result = await res.json();

    if (!res.ok) {
      return { success: false, message: result.message };
    }

    updateTag("tutors");

    return {
      success: true,
      message: "Tutor profile created successfully 🎉",
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: error instanceof Error ? error.message : String(error),
    };
  }
};
