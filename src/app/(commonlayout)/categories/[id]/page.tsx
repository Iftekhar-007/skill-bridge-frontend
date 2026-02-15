import { categoryService } from "@/services/category.service";
import { Categories } from "@/types";
import React from "react";

export async function generateStaticParams() {
  const res = await categoryService.getCategories();
  //   console.log(res);

  return res.data.data;
}

export default async function SingleCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data } = await categoryService.getCategoryById(id);

  console.log(data);
  return <div>SingleCategoryPage:{id}</div>;
}
