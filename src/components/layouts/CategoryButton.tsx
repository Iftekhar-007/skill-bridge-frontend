"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function CategoryButton({
  categoryId,
  title,
}: {
  categoryId: string;
  title: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("expertise", categoryId);
    params.set("pageNumber", "1");

    router.push(`/tutors?${params.toString()}`);
  };

  return (
    <button onClick={handleClick} className="btn">
      {title}
    </button>
  );
}
