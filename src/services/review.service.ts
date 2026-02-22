// import { env } from "@/env";
// import { userService } from "./user.service";

// const ReviewApi = env.REVIEW_URL;

// export const reviewService = {
//   getMyReviews: async function () {
//     try {
//       const { data: session, error } = await userService.getSession();
//       if (error || !session)
//         throw new Error(error?.message || "No session found");

//       const userId = session.user.id;

//       const res = await fetch(`${ReviewApi}/${userId}`, {
//         headers: { "Content-Type": "application/json" },
//         cache: "no-store",
//       });

//       if (!res.ok) throw new Error("Failed to fetch reviews");

//       const data = await res.json();

//       return { data: data.data, error: null };
//     } catch (err: unknown) {
//       const errorMessage =
//         err instanceof Error ? err.message : "Something went wrong";
//       return { data: null, error: { message: errorMessage } };
//     }
//   },
// };
