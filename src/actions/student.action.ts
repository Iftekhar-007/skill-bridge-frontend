"use server";

import { env } from "@/env";
import { cookies } from "next/headers";

const STUDENT_URL = env.STUDENT_URL;

export const createStudent = async (prevState: unknown, formData: FormData) => {
  try {
    const phone = formData.get("phone") as string;
    const level = Number(formData.get("level"));

    const studentData = {
      phone,
      level,
    };

    const cookieStore = await cookies();

    const res = await fetch(`${STUDENT_URL}/create-student`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(studentData),
    });

    const result = await res.json();

    if (!res.ok) {
      return { success: false, message: result.message };
    }

    return {
      success: true,
      message: "Student profile created successfully 🎉",
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: error instanceof Error ? error.message : String(error),
    };
  }
};
