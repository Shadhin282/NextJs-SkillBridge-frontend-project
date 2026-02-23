
import { BookOpen, Clock, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { userService } from '../../../services/user.service';
import { BookingService } from '../../../services/booking.service';
import { Booking } from '../../../types';





export default async function StudentDashboard() {

  const { data: session } = await userService.getSession()

  if (!session?.user) {
    redirect('/login');
  }

  // console.log(session)
  const { data } = await userService.getUsersById(session.user.id)
  // console.log("get user data by id ", data)

  const { data: booking } = await BookingService.getBookingById(session.user.id);
  // console.log(booking)


  return (
    <>
      {/* <UserNavbar userType="student" /> */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {session.user.name}!
          </h1>
          <p className="text-lg text-gray-600">
            Heres whats happening with your learning journey.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Total Sessions */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 text-sm font-medium">Total Sessions</h3>
              <BookOpen className="w-6 h-6 text-gray-400" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{data.data.booking?.status == 'COMPLETED' ? data.data.booking?.length : "No Session Completed"}</div>
            <p className="text-sm text-gray-500">Completed lessons</p>
          </div>

          {/* Hours Learned */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 text-sm font-medium">Hours Learned</h3>
              <Clock className="w-6 h-6 text-gray-400" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2"></div>
            <p className="text-sm text-gray-500">Total time spent learning</p>
          </div>

          {/* Upcoming */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 text-sm font-medium">Upcoming</h3>
              <Calendar className="w-6 h-6 text-gray-400" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{data.data.booking?.status == 'CONFIRMED' ? new Date(data.data.booking?.date).toISOString().split('T')[0] : "No session"}</div>
            <p className="text-sm text-gray-500">Scheduled sessions</p>
          </div>
        </div>

        {/* Upcoming Sessions Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Upcoming Sessions</h2>
            <Button variant="ghost" className="text-gray-900 hover:text-gray-700">
              View All <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="space-y-4">
            {booking.data?.map((session: Booking) => (
              <div
                key={session.id}
                className="bg-white border border-gray-200 rounded-lg p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {session?.tutor?.subjects ? session?.tutor?.subjects[0] : undefined} 
                    </h3>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <span>👤</span> with {session?.tutor?.user?.name}
                    </p>
                  </div>
                  <span className="bg-gray-900 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {session.status}
                  </span>
                </div>

                <div className="flex items-center gap-8 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(session.date as string).toISOString().split('T')[0]  } 
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {/* {session?.time} ({session?.duration}) */}
                  </div>
                </div>

                <Button className="w-full bg-gray-900 text-white hover:bg-gray-800">
                  Join Meeting
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href={'/tutors'}>
              <Button className="bg-gray-900 text-white hover:bg-gray-800">
                Browse Tutors
              </Button>
            </Link>
           
              
            
             
            
          </div>
        </div>
      </main>
    </>
  );
}
