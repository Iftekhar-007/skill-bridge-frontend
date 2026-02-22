import TutorCard from "@/components/cards/TutorCard";
import CategoryFilter from "@/components/layouts/CategoryFilter";
import Pagination from "@/components/layouts/Pagination";
import TutorSearch from "@/components/layouts/TutorSearch";
import { categoryService } from "@/services/category.service";
import { tutorServices } from "@/services/tutor.service";
import { TutorProfile } from "@/types/tutor.type";

interface Props {
  searchParams: {
    search?: string;
    expertise?: string;
    rating?: string;
    pageNumber?: string;
    limitNumber?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  };
}

export default async function TutorPage({ searchParams }: Props) {
  const params = await searchParams;
  const pageNumber = Number(params.pageNumber) || 1;
  const limitNumber = Number(params.limitNumber) || 9;

  const { data } = await tutorServices.getTutors(
    {
      search: params.search,
      expertise: params.expertise,
      rating: params.rating ? Number(params.rating) : undefined,
      pageNumber,
      limitNumber,
      sortBy: params.sortBy,
      sortOrder: params.sortOrder,
    },
    { revalidate: 10 },
  );

  const tutors = data?.data || [];
  const total = data?.meta?.total || 0;
  const totalPages = Math.ceil(total / limitNumber);

  const { data: categoryData } = await categoryService.getCategories();

  return (
    <div className="max-w-7xl mx-auto mt-20">
      <TutorSearch />

      <CategoryFilter categories={categoryData?.data || []} />

      {/* tutors grid */}
      <div className="grid grid-cols-3 gap-5">
        {tutors.map((tutor: TutorProfile) => (
          <TutorCard key={tutor.id} tutor={tutor} />
        ))}
      </div>

      {/* pagination */}
      <Pagination currentPage={pageNumber} totalPages={totalPages} />
    </div>
  );
}
