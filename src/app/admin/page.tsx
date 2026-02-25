import { redirect } from 'next/navigation';
import { userService } from '../../../services/user.service';
import BookingCard from '@/components/module/admin/BookingCard';
import StatCard from '@/components/module/admin/StatCard';
import UserCard from '@/components/module/admin/UserCard';


export default async function AdminDashboard() {


  const { data: stats } = await userService.getStats();
  // console.log(stats)
  // if (!stats?.data) {
  //   redirect('/login');
  // }

  const { users, bookings,
    totalBooking
    , totalCategory, totalUser
  } = stats.data

  // console.log(totalBooking,totalUser,totalCategory)
  return (
    <>
      {/* <AdminNavbar /> */}
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          </div>

          {/* Stats Cards */}
          <StatCard totalBooking={totalBooking} totalUser={totalUser} totalCategory={totalCategory}></StatCard>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Registrations */}
            <UserCard users={users}></UserCard>

            {/* Recent Bookings */}
            <BookingCard bookings={bookings}></BookingCard>
          </div>
        </div>

      </main>
    </>
  );
}
