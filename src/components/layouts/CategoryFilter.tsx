"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface Category {
  id: string;
  title: string;
}

export default function CategoryFilter({
  categories,
}: {
  categories: Category[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selected = searchParams.get("expertise");

  const handleClick = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (selected === id) {
      params.delete("expertise");
    } else {
      params.set("expertise", id);
    }

    params.set("pageNumber", "1");

    router.push(`/tutors?${params.toString()}`);
  };

  return (
    <div className="flex gap-3 flex-wrap mb-6">
      {/* All button */}
      <button
        onClick={() => router.push("/tutors")}
        className={`px-4 py-2 rounded border ${
          !selected ? "bg-black text-white" : ""
        }`}
      >
        All
      </button>

      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => handleClick(cat.id)}
          className={`px-4 py-2 rounded border ${
            selected === cat.id ? "bg-black text-white" : ""
          }`}
        >
          {cat.title}
        </button>
      ))}
    </div>
  );
}
