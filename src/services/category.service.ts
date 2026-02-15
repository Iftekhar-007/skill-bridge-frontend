import { env } from "@/env";

export const CategoryApi = env.CATEGORY_URL;

export const categoryService = {
  getCategories: async function () {
    try {
      const url = new URL(`${CategoryApi}/all-category`);

      const res = await fetch(url.toString());

      const data = await res.json();

      console.log(data);

      return { data: data, error: null };
    } catch (err) {
      return {
        data: null,
        error: { message: "Something went wrong!!!!" },
        err,
      };
    }
  },

  getCategoryById: async function (id: string) {
    try {
      const url = new URL(`${CategoryApi}/${id}`);

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
