import { Bookings } from "@/types";
import BookingCard from "./BookingCard";

interface Props {
  bookings: Bookings[];
  role: string;
}

export default function BookingList({ bookings, role }: Props) {
  if (bookings.length === 0) {
    return <div className="text-muted-foreground">No bookings found.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {bookings.map((booking) => (
        <BookingCard key={booking.id} booking={booking} role={role} />
      ))}
    </div>
  );
}
