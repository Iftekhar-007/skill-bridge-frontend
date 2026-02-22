"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { env } from "@/env";

export async function createCategoryAction(payload: { title: string }) {
  const cookieStore = await cookies();

  const res = await fetch(`${env.CATEGORY_URL}/create-category`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!data.success) throw new Error(data.message);

  revalidatePath("/categories");

  return data;
}
