// "use server";

// import { UserStatus } from "@/constants/userStatus";
// import { env } from "@/env";

// const ADMIN_URL = process.env.NEXT_PUBLIC_ADMIN_URL!;

// export const updateUserStatus = async (
//   userId: string,
//   newStatus: UserStatus,
// ) => {
//   const res = await fetch(`${ADMIN_URL}/users/status/${userId}`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//     },
//     body: JSON.stringify({ status: newStatus }),
//   });

//   if (!res.ok) throw new Error("Failed to update user status");

//   return res.json();
// };

"use client";

import { UserStatus } from "@/constants/userStatus";
import { env } from "@/env";

const ADMIN_URL = process.env.NEXT_PUBLIC_ADMIN_URL!;

export const updateUserStatus = async (
  userId: string,
  newStatus: UserStatus,
) => {
  try {
    const res = await fetch(`${ADMIN_URL}/users/status/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
      credentials: "include", // ✅ ensures cookies sent
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to update: ${text}`);
    }

    // optionally, refresh the page or refetch
    window.location.reload();
  } catch (err) {
    console.error(err);
  }
};
