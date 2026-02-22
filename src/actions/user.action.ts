"use server";

import { adminService } from "@/services/admin.service";
import { userService } from "@/services/user.service";

export const userAction = async () => {
  return await userService.getSession();
};

export const getAllUsersServer = async () => {
  const { data, total, error } = await adminService.getAllUsers();
  if (error) throw new Error(error.message);
  return { data, total };
};
