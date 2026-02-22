import MyBookingCard from "@/components/module/mybooking/MyBookingCard";
import { BookingService } from "../../../../services/booking.service";
import { userService } from "../../../../services/user.service";

export default async function MyBookings() {
  

  const { data: session } = await userService.getSession()
  console.log(session.user.id)
  const {data} = await BookingService.getBookingById(session.user.id);
  console.log(data)

  return (
    <>
      {/* <UserNavbar userType="student" /> */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <h1 className="text-4xl font-bold text-gray-900 mb-8">My Bookings</h1>

        {/* Tabs */}
       <MyBookingCard data={data.data}></MyBookingCard>

        {/* Bookings List */}
        
      </main>
    </>
  );
}
