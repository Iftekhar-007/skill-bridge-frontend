import { env } from "@/env";
import { cookies } from "next/headers";

const TutorApi = env.TUTOR_URL;

export interface fetchInter {
  cache?: RequestCache;
  revalidate?: number;
}

export interface fetchParams {
  search?: string;
  expertise?: string;
  rating?: number;
  pageNumber?: number;
  limitNumber?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export const tutorServices = {
  getTutors: async function (params?: fetchParams, options?: fetchInter) {
    try {
      const url = new URL(`${TutorApi}/tutors`);

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, String(value));
          }
        });
      }

      const config: RequestInit = {};

      if (options?.cache) {
        config.cache = options.cache;
      }

      if (options?.revalidate) {
        config.next = { revalidate: options.revalidate };
      }

      config.next = { ...config.next, tags: ["tutors"] };

      const res = await fetch(url.toString(), config);

      const data = await res.json();

      return { data: data, error: null };
    } catch (err) {
      return {
        data: null,
        error: { message: "Something went wrong!!!!" },
        err,
      };
    }
  },

  getSingleTutor: async function (id: string) {
    try {
      const url = new URL(`${TutorApi}/${id}`);

      const res = await fetch(url.toString());

      const data = await res.json();

      return { data: data, error: null };
    } catch (err) {
      return {
        data: null,
        error: { message: "Something went wrong!!" },
        err,
      };
    }
  },

  // services/tutor.service.ts
  // import { env } from "@/env";

  // const TutorApi = env.TUTOR_URL;

  getMyTutorProfile: async function () {
    try {
      const url = new URL(`${TutorApi}/my-tutor-profile`);

      // Forward auth cookies from the current Next.js request to the backend
      const cookieStore = await cookies();
      const cookieHeader = cookieStore
        .getAll()
        .map((c) => `${c.name}=${c.value}`)
        .join("; ");

      const res = await fetch(url.toString(), {
        cache: "no-store",
        headers: cookieHeader ? { cookie: cookieHeader } : undefined,
      });

      if (!res.ok) throw new Error("Failed to fetch profile");

      const data = await res.json();
      return { data, error: null };
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      return { data: null, error: { message } };
    }
  },
};
