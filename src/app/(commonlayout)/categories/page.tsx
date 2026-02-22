import { CategoryCard } from "@/components/cards/CategoryCard";
import { categoryService } from "@/services/category.service";
import { Categories } from "@/types";
// import React from "react";

export async function generateStaticParams() {
  const response = await categoryService.getCategories();

  return response?.data?.map((category: Categories) => ({ id: category.id }));
}

export default async function CategoryPage() {
  const { data } = await categoryService.getCategories();
  // console.log(JSON.stringify(data, null, 2));

  console.log(data);
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.data.map((category: Categories) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
