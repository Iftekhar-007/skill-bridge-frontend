import { Reviews } from "@/types";
// import ReviewCard from "./ReviewCard";
import { Star } from "lucide-react";
import TutorReviewsCard from "../modules/tutors/reviews/TutorReviewsCard";

interface Props {
  reviews: Reviews[];
}

export default function TutorReviewList({ reviews }: Props) {
  if (reviews.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center mb-4">
          <Star className="w-6 h-6 text-indigo-300" />
        </div>
        <p className="text-slate-500 font-medium">No reviews yet</p>
        <p className="text-slate-400 text-sm mt-1">
          Reviews from students will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {reviews.map((review) => (
        <TutorReviewsCard key={review.id} review={review} />
      ))}
    </div>
  );
}
