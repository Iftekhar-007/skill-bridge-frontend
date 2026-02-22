// "use client";

// import { useState } from "react";
// // import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Bookings } from "@/types";
// import ReviewModal from "@/components/cards/ReviewModal";
// import { CalendarDays, Clock, BanknoteIcon, Star, User } from "lucide-react";
// import { Roles } from "@/constants/roles";

// interface Props {
//   booking: Bookings;
//   role: string;
// }

// const statusConfig: Record<string, { color: string; dot: string }> = {
//   confirmed: {
//     color: "bg-emerald-100 text-emerald-700 border border-emerald-200",
//     dot: "bg-emerald-500",
//   },
//   pending: {
//     color: "bg-amber-100 text-amber-700 border border-amber-200",
//     dot: "bg-amber-500",
//   },
//   cancelled: {
//     color: "bg-rose-100 text-rose-700 border border-rose-200",
//     dot: "bg-rose-500",
//   },
// };

// export default function BookingCard({ booking, role }: Props) {
//   const [open, setOpen] = useState(false);
//   const [hovered, setHovered] = useState(false);

//   const reviewed = !!booking.reviews;
//   const canReview =
//     role === "student" &&
//     booking.status.toLowerCase() === "confirmed" &&
//     !reviewed;

//   const personName =
//     role === "student"
//       ? booking.tutor?.user?.name
//       : booking.student?.user?.name;

//   const statusKey = booking.status.toLowerCase();
//   const statusStyle = statusConfig[statusKey] ?? {
//     color: "bg-slate-100 text-slate-600 border border-slate-200",
//     dot: "bg-slate-400",
//   };

//   return (
//     <>
//       <div
//         onMouseEnter={() => setHovered(true)}
//         onMouseLeave={() => setHovered(false)}
//         className="relative group rounded-2xl overflow-hidden transition-all duration-300"
//         style={{
//           transform: hovered ? "translateY(-4px)" : "translateY(0)",
//           boxShadow: hovered
//             ? "0 20px 40px -12px rgba(0,0,0,0.15)"
//             : "0 4px 16px -4px rgba(0,0,0,0.08)",
//         }}
//       >
//         {/* Gradient top accent bar */}
//         <div className="h-1 w-full bg-linear-to-r from-violet-500 via-indigo-500 to-sky-400" />

//         <div className="bg-white border border-slate-100 rounded-b-2xl">
//           {/* Header */}
//           <div className="px-6 pt-5 pb-4 flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               {/* Avatar placeholder */}
//               <div className="w-10 h-10 rounded-full bg-linear-to-br from-violet-400 to-indigo-500 flex items-center justify-center shadow-sm">
//                 <User className="w-5 h-5 text-white" />
//               </div>
//               <div>
//                 <p className="text-[11px] font-medium uppercase tracking-widest text-slate-400">
//                   {role === "student" ? "Tutor" : "Student"}
//                 </p>
//                 <p className="text-base font-semibold text-slate-800 leading-tight">
//                   {personName ?? "—"}
//                 </p>
//               </div>
//             </div>

//             {/* Status badge */}
//             <span
//               className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${statusStyle.color}`}
//             >
//               <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
//               {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
//             </span>
//           </div>

//           {/* Divider */}
//           <div className="mx-6 h-px bg-linear-to-r from-transparent via-slate-200 to-transparent" />

//           {/* Info rows */}
//           <div className="px-6 py-4 space-y-3">
//             <InfoRow
//               icon={<CalendarDays className="w-4 h-4 text-indigo-400" />}
//               label="Date"
//               value={new Date(booking.date).toLocaleDateString("en-US", {
//                 weekday: "short",
//                 year: "numeric",
//                 month: "short",
//                 day: "numeric",
//               })}
//             />
//             <InfoRow
//               icon={<Clock className="w-4 h-4 text-indigo-400" />}
//               label="Time"
//               value={`${new Date(booking.startTime).toLocaleTimeString([], {
//                 hour: "2-digit",
//                 minute: "2-digit",
//               })} – ${new Date(booking.endTime).toLocaleTimeString([], {
//                 hour: "2-digit",
//                 minute: "2-digit",
//               })}`}
//             />
//             <InfoRow
//               icon={<BanknoteIcon className="w-4 h-4 text-indigo-400" />}
//               label="Price"
//               value={`৳ ${booking.price}`}
//             />
//           </div>

//           {/* Review button */}
//           {canReview && (
//             <div className="px-6 pb-5">
//               <Button
//                 onClick={() => setOpen(true)}
//                 className="w-full bg-linear-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-semibold rounded-xl py-2.5 transition-all duration-200 shadow-sm hover:shadow-indigo-200 hover:shadow-md"
//               >
//                 <Star className="w-4 h-4 mr-2" />
//                 Leave a Review
//               </Button>
//             </div>
//           )}

//           {/* Already reviewed pill */}
//           {reviewed && role === Roles.student && (
//             <div className="px-6 pb-5">
//               <p className="text-center text-xs text-emerald-600 font-medium bg-emerald-50 border border-emerald-100 rounded-xl py-2">
//                 ✓ You have reviewed this session
//               </p>
//             </div>
//           )}
//         </div>
//       </div>

//       <ReviewModal
//         open={open}
//         setOpen={setOpen}
//         bookingId={booking.id}
//         tutorId={booking.tutorId}
//       />
//     </>
//   );
// }

// function InfoRow({
//   icon,
//   label,
//   value,
// }: {
//   icon: React.ReactNode;
//   label: string;
//   value: string;
// }) {
//   return (
//     <div className="flex items-center gap-3">
//       <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
//         {icon}
//       </div>
//       <div>
//         <p className="text-[10px] uppercase tracking-widest text-slate-400 font-medium leading-none mb-0.5">
//           {label}
//         </p>
//         <p className="text-sm font-medium text-slate-700">{value}</p>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Bookings } from "@/types";
import ReviewModal from "@/components/cards/ReviewModal";
import {
  CalendarDays,
  Clock,
  BanknoteIcon,
  Star,
  User,
  Loader2,
} from "lucide-react";
import { Roles } from "@/constants/roles";
// import { updateBookingStatusAction } from "@/app/actions/booking";
import { toast } from "sonner"; // or however you handle toasts
import { useRouter } from "next/navigation";
import { updateBookingStatusAction } from "@/actions/booking.action";

interface Props {
  booking: Bookings;
  role: string;
}

const statusConfig: Record<string, { color: string; dot: string }> = {
  confirmed: {
    color: "bg-emerald-100 text-emerald-700 border border-emerald-200",
    dot: "bg-emerald-500",
  },
  pending: {
    color: "bg-amber-100 text-amber-700 border border-amber-200",
    dot: "bg-amber-500",
  },
  cancelled: {
    color: "bg-rose-100 text-rose-700 border border-rose-200",
    dot: "bg-rose-500",
  },
  completed: {
    color: "bg-blue-100 text-blue-700 border border-blue-200",
    dot: "bg-blue-500",
  },
};

export default function BookingCard({ booking, role }: Props) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const reviewed = !!booking.reviews;
  const canReview =
    role === Roles.student &&
    booking.status.toLowerCase() === "confirmed" &&
    !reviewed;

  // Tutor can change status only if booking is CONFIRMED
  const canUpdateStatus =
    role === Roles.tutor && booking.status.toLowerCase() === "confirmed";

  const personName =
    role === Roles.student
      ? booking.tutor?.user?.name
      : booking.student?.user?.name;

  const statusKey = booking.status.toLowerCase();
  const statusStyle = statusConfig[statusKey] ?? {
    color: "bg-slate-100 text-slate-600 border border-slate-200",
    dot: "bg-slate-400",
  };

  function handleStatusUpdate(status: "COMPLETED" | "CANCELLED") {
    startTransition(async () => {
      try {
        await updateBookingStatusAction(booking.id, status);
        toast.success(`Booking marked as ${status.toLowerCase()}`);
        router.refresh(); // re-fetches server data, updates the card
      } catch (err: any) {
        toast.error(err.message ?? "Something went wrong");
      }
    });
  }

  return (
    <>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative group rounded-2xl overflow-hidden transition-all duration-300"
        style={{
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
          boxShadow: hovered
            ? "0 20px 40px -12px rgba(0,0,0,0.15)"
            : "0 4px 16px -4px rgba(0,0,0,0.08)",
        }}
      >
        <div className="h-1 w-full bg-linear-to-r from-violet-500 via-indigo-500 to-sky-400" />

        <div className="bg-white border border-slate-100 rounded-b-2xl">
          {/* Header */}
          <div className="px-6 pt-5 pb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-violet-400 to-indigo-500 flex items-center justify-center shadow-sm">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-[11px] font-medium uppercase tracking-widest text-slate-400">
                  {role === Roles.student ? "Tutor" : "Student"}
                </p>
                <p className="text-base font-semibold text-slate-800 leading-tight">
                  {personName ?? "—"}
                </p>
              </div>
            </div>

            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${statusStyle.color}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
              {booking.status.charAt(0).toUpperCase() +
                booking.status.slice(1).toLowerCase()}
            </span>
          </div>

          <div className="mx-6 h-px bg-linear-to-r from-transparent via-slate-200 to-transparent" />

          {/* Info rows */}
          <div className="px-6 py-4 space-y-3">
            <InfoRow
              icon={<CalendarDays className="w-4 h-4 text-indigo-400" />}
              label="Date"
              value={new Date(booking.date).toLocaleDateString("en-US", {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            />
            <InfoRow
              icon={<Clock className="w-4 h-4 text-indigo-400" />}
              label="Time"
              value={`${new Date(booking.startTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })} – ${new Date(booking.endTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}`}
            />
            <InfoRow
              icon={<BanknoteIcon className="w-4 h-4 text-indigo-400" />}
              label="Price"
              value={`৳ ${booking.price}`}
            />
          </div>

          {/* ── Tutor actions ── */}
          {canUpdateStatus && (
            <div className="px-6 pb-5 flex gap-2">
              <Button
                onClick={() => handleStatusUpdate("COMPLETED")}
                disabled={isPending}
                className="flex-1 bg-linear-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-semibold rounded-xl py-2.5 transition-all duration-200 shadow-sm hover:shadow-indigo-200 hover:shadow-md"
              >
                {isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Mark Complete"
                )}
              </Button>
              <Button
                onClick={() => handleStatusUpdate("CANCELLED")}
                disabled={isPending}
                variant="outline"
                className="flex-1 border-rose-200 text-rose-600 hover:bg-rose-50 font-semibold rounded-xl py-2.5"
              >
                Cancel
              </Button>
            </div>
          )}

          {/* Student review button */}
          {canReview && (
            <div className="px-6 pb-5">
              <Button
                onClick={() => setOpen(true)}
                className="w-full bg-linear-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-semibold rounded-xl py-2.5 transition-all duration-200 shadow-sm hover:shadow-indigo-200 hover:shadow-md"
              >
                <Star className="w-4 h-4 mr-2" />
                Leave a Review
              </Button>
            </div>
          )}

          {reviewed && role === Roles.student && (
            <div className="px-6 pb-5">
              <p className="text-center text-xs text-emerald-600 font-medium bg-emerald-50 border border-emerald-100 rounded-xl py-2">
                ✓ You have reviewed this session
              </p>
            </div>
          )}
        </div>
      </div>

      <ReviewModal
        open={open}
        setOpen={setOpen}
        bookingId={booking.id}
        tutorId={booking.tutorId}
      />
    </>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-widest text-slate-400 font-medium leading-none mb-0.5">
          {label}
        </p>
        <p className="text-sm font-medium text-slate-700">{value}</p>
      </div>
    </div>
  );
}
