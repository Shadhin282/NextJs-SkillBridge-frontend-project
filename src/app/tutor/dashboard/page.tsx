
import {  Users, Calendar, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { tutorService } from '../../../../services/tutor.service';
import { userService } from '../../../../services/user.service';
import { Booking } from '../../../../types';
import Link from 'next/link';
import AvailabilityModal from '@/components/module/tutor/AvailabilityModal';
import EditAvailabilityModal from '@/components/module/tutor/EditAvailabilityModal';

export default async function TutorDashboard() {

  const {data:session} = await userService.getSession();
// console.log(session.user.id)
  const {data} = await tutorService.getTutorDetailsById(session.user?.id);
  console.log(data)

  


  return (
    <>
      {/* <UserNavbar userType="tutor" userName="Sarah Wilson" /> */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Tutor Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Manage your sessions and track your performance.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Total Earnings */}
          {/* <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 text-sm font-medium">Total Earnings</h3>
              <DollarSign className="w-6 h-6 text-gray-400" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">$0</div>
            <p className="text-sm text-green-600 font-medium">+12% from last month</p>
          </div> */}

          {/* Active Students */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 text-sm font-medium">Active Students</h3>
              <Users className="w-6 h-6 text-gray-400" />
            </div>
            <div className="text-3xl font-bold text-gray-900">{data?.data?.booking?.length}</div>
          </div>

          {/* Upcoming Sessions */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 text-sm font-medium">Upcoming Sessions</h3>
              <Calendar className="w-6 h-6 text-gray-400" />
            </div>
            <div className="text-3xl font-bold text-gray-900">{data?.data?.booking?.length}</div>
          </div>

          {/* Average Rating */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 text-sm font-medium">Average Rating</h3>
              <Star className="w-6 h-6 text-gray-400" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{data?.data?.avgRating}</div>
            <p className="text-sm text-gray-600">Based on {data?.data?._count?.review} reviews</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upcoming Sessions Section */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Upcoming Sessions
            </h2>

            <div className="space-y-4">
              {data?.data?.booking?.map((session:Booking) => (
                <div
                  key={session.id}
                  className="bg-white border border-gray-200 rounded-lg p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        {session.subject}
                      </h3>
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <span>👤</span> with 
                        {/* {session.student.name} */}
                      </p>
                    </div>
                    <span className="bg-gray-900 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {session.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-8 text-sm text-gray-600 mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {session.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {session.time} ({session.duration})
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
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-20">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
              <div className="space-y-3">
                <span  className="w-full mr-5 justify-center items-center rounded-2xl flex bg-gray-900 text-white hover:bg-gray-800 px-4">
                  📅 {!data?.data?.availability ? <AvailabilityModal tutorId={data?.data.id}></AvailabilityModal> : <EditAvailabilityModal tutorId={data?.data?.id}></EditAvailabilityModal>}
                </span>
                {data.data  ? <Link href={'/tutor/profile'}>
                <Button
                  variant="outline"
                  className="w-full border-gray-300 justify-start bg-transparent"
                >
                  👤 Edit Profile
                </Button>
                </Link> : <Link href={'/tutor/create-profile'}>
                <Button
                  variant="outline"
                  className="w-full border-gray-300 justify-start bg-transparent"
                >
                  👤 Create Profile
                </Button>
                </Link>}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
