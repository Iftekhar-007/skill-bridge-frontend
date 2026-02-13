import { env } from "@/env";

const TutorApi = env.TUTOR_URL;

export const tutorServices = {
  getTutors: async function () {
    try {
      const url = new URL(`${TutorApi}/tutors`);

      const res = await fetch(url.toString());

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
};
