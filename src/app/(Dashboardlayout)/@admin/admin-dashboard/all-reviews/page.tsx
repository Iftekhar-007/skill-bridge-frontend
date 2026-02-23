// import React from "react";

// export default function AllReviewPageForAdmin() {
//   return <div>AllReviewPageForAdmin</div>;
// }

// import { ReviewService } from "@/services/review.service";
// import { ReviewsTable } from "@/components/admin/reviews/reviews-table";
import { ReviewsTable } from "@/components/modules/admin/reviews/reviews-table";
import { ReviewService } from "@/services/review.service";
// import { ReviewService } from "@/services/review.service";
import { Reviews } from "@/types";
import { MessageSquareText } from "lucide-react";

export const metadata = {
  title: "All Reviews | Admin",
};

export default async function AllReviewPageForAdmin() {
  let reviews: Reviews[] = [];

  try {
    reviews = await ReviewService.getAllReviews();
  } catch (err) {
    console.error(err);
  }

  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        ).toFixed(1)
      : "—";

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-primary/10 p-2">
            <MessageSquareText className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-semibold">All Reviews</h1>
            <p className="text-sm text-muted-foreground">
              {reviews.length} total · {avgRating} avg rating
            </p>
          </div>
        </div>
      </div>

      {/* Table */}
      <ReviewsTable reviews={reviews} />
    </div>
  );
}
