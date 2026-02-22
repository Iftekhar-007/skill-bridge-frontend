import { userService } from "@/services/user.service";
import { bookingService } from "@/services/booking.service";
import BookingList from "@/components/modules/bookings/BookingList";

export default async function BookingsPage() {
  const { data: session } = await userService.getSession();

  if (!session?.user) {
    return <div className="text-center py-20">Unauthorized</div>;
  }

  const bookings = await bookingService.getAllBookings();

  return (
    <div className="max-w-6xl mx-auto py-10 space-y-6">
      <h1 className="text-3xl font-bold">All Bookings</h1>

      <BookingList bookings={bookings} role={session.user.role} />
    </div>
  );
}
