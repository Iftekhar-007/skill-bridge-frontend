"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function TutorSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("search", search);
    params.set("pageNumber", "1");

    router.push(`/tutors?${params.toString()}`);
  };

  return (
    <div className="flex gap-2 mb-5">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="input input-bordered"
        placeholder="Search tutor or category"
      />

      <button onClick={handleSearch} className="btn btn-primary">
        Search
      </button>
    </div>
  );
}
