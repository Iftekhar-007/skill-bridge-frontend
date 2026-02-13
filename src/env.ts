import { z } from "zod";
import { createEnv } from "@t3-oss/env-nextjs";

export const env = createEnv({
  server: {
    BACKEND_API: z.url(),
    FRONTEND_API: z.url(),
    ADMIN_URL: z.url(),
    TUTOR_URL: z.url(),
    STUDENT_URL: z.url(),
    BOOKING_URL: z.url(),
    CATEGORY_URL: z.url(),
    REVIEW_URL: z.url(),
    AUTH_URL: z.url(),
  },
  runtimeEnv: {
    BACKEND_API: process.env.BACKEND_API,
    FRONTEND_API: process.env.FRONTEND_API,
    ADMIN_URL: process.env.ADMIN_URL,
    TUTOR_URL: process.env.TUTOR_URL,
    STUDENT_URL: process.env.STUDENT_URL,
    BOOKING_URL: process.env.BOOKING_URL,
    CATEGORY_URL: process.env.CATEGORY_URL,
    REVIEW_URL: process.env.REVIEW_URL,
    AUTH_URL: process.env.AUTH_URL,
  },
});
