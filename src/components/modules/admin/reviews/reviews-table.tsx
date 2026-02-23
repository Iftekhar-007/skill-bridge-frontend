"use client";

import { useState } from "react";
import { RatingStars } from "./rating-stars";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search } from "lucide-react";
import { Reviews } from "@/types";

interface ReviewsTableProps {
  reviews: Reviews[];
}

export function ReviewsTable({ reviews }: ReviewsTableProps) {
  const [search, setSearch] = useState("");

  const filtered = reviews.filter((r) => {
    const q = search.toLowerCase();
    const studentName = r.student?.user?.name?.toLowerCase() ?? "";
    const tutorName = r.tutor?.user?.name?.toLowerCase() ?? "";
    const comment = r.comment.toLowerCase();
    return (
      studentName.includes(q) || tutorName.includes(q) || comment.includes(q)
    );
  });

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by student, tutor or comment..."
          className="pl-9"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Tutor</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead className="max-w-xs">Comment</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="py-12 text-center text-muted-foreground"
                >
                  No reviews found.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((review) => (
                <TableRow key={review.id}>
                  {/* Student */}
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={review.student?.user?.image ?? ""} />
                        <AvatarFallback>
                          {review.student?.user?.name?.charAt(0) ?? "S"}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">
                        {review.student?.user?.name ?? "Unknown"}
                      </span>
                    </div>
                  </TableCell>

                  {/* Tutor */}
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={review.tutor?.user?.image ?? ""} />
                        <AvatarFallback>
                          {review.tutor?.user?.name?.charAt(0) ?? "T"}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">
                        {review.tutor?.user?.name ?? "Unknown"}
                      </span>
                    </div>
                  </TableCell>

                  {/* Rating */}
                  <TableCell>
                    <RatingStars rating={review.rating} />
                  </TableCell>

                  {/* Comment */}
                  <TableCell className="max-w-xs">
                    <p className="line-clamp-2 text-sm text-muted-foreground">
                      {review.comment}
                    </p>
                  </TableCell>

                  {/* Date */}
                  <TableCell>
                    <Badge variant="outline" className="text-xs font-normal">
                      {new Date(review.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <p className="text-xs text-muted-foreground">
        Showing {filtered.length} of {reviews.length} reviews
      </p>
    </div>
  );
}
