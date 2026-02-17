"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("pageNumber", page.toString());

    router.push(`/tutors?${params.toString()}`);
  };

  return (
    <div className="flex justify-center gap-2 mt-10">
      <button
        disabled={currentPage === 1}
        onClick={() => goToPage(currentPage - 1)}
        className="btn"
      >
        Prev
      </button>

      {[...Array(totalPages)].map((_, i) => {
        const page = i + 1;

        return (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`btn ${currentPage === page ? "btn-primary" : ""}`}
          >
            {page}
          </button>
        );
      })}

      <button
        disabled={currentPage === totalPages}
        onClick={() => goToPage(currentPage + 1)}
        className="btn"
      >
        Next
      </button>
    </div>
  );
}
