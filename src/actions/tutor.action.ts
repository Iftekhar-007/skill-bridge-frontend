"use server";

import { tutorServices } from "@/services/tutor.service";

export const getTutors = async () => {
  return await tutorServices.getTutors();
};
