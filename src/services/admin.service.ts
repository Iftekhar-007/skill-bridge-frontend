import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.ADMIN_URL;

export const adminService = {
  async getAllUsers() {
    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/users`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    const result = await res.json();

    if (!res.ok) throw new Error(result.message);

    return result.data.data; // just array of users
  },

  // getUserById: async (userId: string) => {
  //   try {
  //     const cookieStore = await cookies();
  //     const cookieHeader = cookieStore
  //       .getAll()
  //       .map((c) => `${c.name}=${c.value}`)
  //       .join("; ");

  //     const res = await fetch(`${API_URL}/users/${userId}`, {
  //       cache: "no-store",
  //       headers: cookieHeader ? { cookie: cookieHeader } : undefined,
  //     });

  //     const result = await res.json();
  //     console.log(result);

  //     if (!res.ok) throw new Error(result.message);

  //     return { data: result.data, error: null };
  //   } catch (err: unknown) {
  //     const message =
  //       err instanceof Error ? err.message : "Something went wrong";
  //     return { data: null, error: { message } };
  //   }
  // },

  getUserById: async (id: string) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/users/${id}`, {
        cache: "no-store",
        headers: {
          Cookie: cookieStore.toString(), // ← same as getSession & getAllUsers
        },
      });

      const result = await res.json();
      console.log(result);

      if (!res.ok) throw new Error(result.message);

      return { data: result.data, error: null };
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      return { data: null, error: { message } };
    }
  },
};
