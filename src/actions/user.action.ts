"use server";

import { userService } from "@/services/user.service";

export const userAction = async () => {
  return await userService.getSession();
};
