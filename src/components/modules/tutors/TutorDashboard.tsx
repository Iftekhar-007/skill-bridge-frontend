import {
  BookOpen,
  Star,
  Users,
  BanknoteIcon,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  CalendarDays,
  User,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// ─── Static mock data ───────────────────────────────────────────────
const stats = [
  {
    label: "Total Bookings",
    value: "24",
    change: "+3 this week",
    positive: true,
    icon: BookOpen,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    label: "Total Students",
    value: "18",
    change: "+2 this month",
    positive: true,
    icon: Users,
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    label: "Average Rating",
    value: "4.8",
    change: "From 16 reviews",
    positive: true,
    icon: Star,
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    label: "Total Earned",
    value: "৳ 12,400",
    change: "+৳ 1,200 this month",
    positive: true,
    icon: BanknoteIcon,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
];

const recentBookings = [
  {
    id: "1",
    student: "Arif Hossain",
    date: "2026-02-24",
    time: "10:00 AM – 11:00 AM",
    price: 800,
    status: "CONFIRMED",
  },
  {
    id: "2",
    student: "Nadia Islam",
    date: "2026-02-22",
    time: "02:00 PM – 03:00 PM",
    price: 800,
    status: "COMPLETED",
  },
  {
    id: "3",
    student: "Rakib Khan",
    date: "2026-02-20",
    time: "11:00 AM – 12:00 PM",
    price: 800,
    status: "CANCELLED",
  },
  {
    id: "4",
    student: "Sumaiya Akter",
    date: "2026-02-18",
    time: "03:00 PM – 04:00 PM",
    price: 800,
    status: "COMPLETED",
  },
];

const recentReviews = [
  {
    id: "1",
    student: "Nadia Islam",
    rating: 5,
    comment: "Excellent tutor! Explained everything clearly and patiently.",
    date: "2026-02-22",
  },
  {
    id: "2",
    student: "Sumaiya Akter",
    rating: 4,
    comment: "Very helpful session. Would definitely book again.",
    date: "2026-02-18",
  },
  {
    id: "3",
    student: "Mehedi Hasan",
    rating: 5,
    comment: "Best tutor I have had. Concepts became crystal clear.",
    date: "2026-02-14",
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────
const statusConfig: Record<
  string,
  { label: string; color: string; icon: React.ReactNode }
> = {
  CONFIRMED: {
    label: "Confirmed",
    color: "bg-emerald-100 text-emerald-700 border-emerald-200",
    icon: <Clock className="w-3 h-3" />,
  },
  COMPLETED: {
    label: "Completed",
    color: "bg-blue-100 text-blue-700 border-blue-200",
    icon: <CheckCircle2 className="w-3 h-3" />,
  },
  CANCELLED: {
    label: "Cancelled",
    color: "bg-rose-100 text-rose-700 border-rose-200",
    icon: <XCircle className="w-3 h-3" />,
  },
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="w-3.5 h-3.5"
          fill={i < rating ? "#f59e0b" : "none"}
          stroke={i < rating ? "#f59e0b" : "#cbd5e1"}
        />
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────
export default function TutorDashboardComponent() {
  return (
    <div className="p-6 space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Welcome back! Heres whats happening today.
        </p>
      </div>

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.label}
              className="rounded-2xl border border-slate-100 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.12)] transition-all duration-300 overflow-hidden"
            >
              {/* accent bar */}
              <div className="h-1 w-full bg-gradient-to-r from-violet-500 via-indigo-500 to-sky-400" />
              <CardContent className="pt-5 pb-5 px-5">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[11px] font-medium uppercase tracking-widest text-slate-400">
                    {stat.label}
                  </p>
                  <div
                    className={`w-9 h-9 rounded-xl ${stat.bg} flex items-center justify-center`}
                  >
                    <Icon className={`w-4 h-4 ${stat.color}`} />
                  </div>
                </div>
                <p className="text-2xl font-bold text-slate-800">
                  {stat.value}
                </p>
                <div className="flex items-center gap-1 mt-1.5">
                  <TrendingUp className="w-3 h-3 text-emerald-500" />
                  <p className="text-xs text-slate-400">{stat.change}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* ── Recent Bookings + Reviews ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Recent Bookings — wider */}
        <Card className="lg:col-span-3 rounded-2xl border border-slate-100 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.08)]">
          <CardHeader className="pb-3 px-6 pt-5">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold text-slate-800">
                Recent Bookings
              </CardTitle>
              <span className="text-xs text-indigo-600 font-medium cursor-pointer hover:underline">
                View all →
              </span>
            </div>
          </CardHeader>

          {/* divider */}
          <div className="mx-6 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

          <CardContent className="px-6 pt-4 pb-5 space-y-3">
            {recentBookings.map((booking) => {
              const s = statusConfig[booking.status];
              return (
                <div
                  key={booking.id}
                  className="flex items-center justify-between py-3 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center shrink-0">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-700">
                        {booking.student}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <CalendarDays className="w-3 h-3 text-slate-400" />
                        <p className="text-[11px] text-slate-400">
                          {new Date(booking.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}{" "}
                          · {booking.time}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <p className="text-sm font-semibold text-slate-700">
                      ৳ {booking.price}
                    </p>
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${s.color}`}
                    >
                      {s.icon}
                      {s.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Recent Reviews — narrower */}
        <Card className="lg:col-span-2 rounded-2xl border border-slate-100 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.08)]">
          <CardHeader className="pb-3 px-6 pt-5">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold text-slate-800">
                Recent Reviews
              </CardTitle>
              <span className="text-xs text-indigo-600 font-medium cursor-pointer hover:underline">
                View all →
              </span>
            </div>
          </CardHeader>

          <div className="mx-6 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

          <CardContent className="px-6 pt-4 pb-5 space-y-4">
            {recentReviews.map((review) => (
              <div key={review.id} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center shrink-0">
                      <User className="w-3.5 h-3.5 text-white" />
                    </div>
                    <p className="text-sm font-semibold text-slate-700">
                      {review.student}
                    </p>
                  </div>
                  <StarRating rating={review.rating} />
                </div>
                <p className="text-xs text-slate-500 leading-relaxed pl-9 line-clamp-2">
                  `{review.comment}`
                </p>
                <p className="text-[10px] uppercase tracking-widest text-slate-400 pl-9">
                  {new Date(review.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <div className="h-px bg-slate-100 mt-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
