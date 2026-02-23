'use client';

import { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';
// import UserNavbar from '@/components/user-navbar';
import { Button } from '@/components/ui/button';
import { Booking } from '../../../../types';

type TabType = 'upcoming' | 'past' | 'cancelled';

const MyBookingCard = ({data}:{data : Booking[]}) => {

      const [activeTab, setActiveTab] = useState<TabType>('upcoming');

console.log("booking data at booking card",data)
 
  const tabs = [
    { id: 'upcoming', label: 'Upcoming', count: 1 },
    { id: 'past', label: 'Past', count: 1 },
    { id: 'cancelled', label: 'Cancelled', count: 1 },
  ];

  const currentBookings = data?.filter((booking) => {
    if (activeTab === "upcoming") return booking.status === "CONFIRMED";
    if (activeTab === "past") return booking.status === "COMPLETED";
    if (activeTab === "cancelled") return booking.status === "CANCELLED";
  });
    return (
        <div>
             <div className="flex gap-8 mb-8 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`pb-4 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'text-gray-900 border-b-2 border-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {currentBookings?.map((booking : Booking) => (
            <div
              key={booking.id}
              className="bg-white border border-gray-200 rounded-lg p-6 max-w-2xl"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {booking.subject}
                  </h3>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <span>👤</span> with {booking?.tutor?.user?.name}
                  </p>
                </div>
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    booking.status === 'CONFIRMED'
                      ? 'bg-gray-900 text-white'
                      : booking.status === 'COMPLETED'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                  }`}
                >
                  {booking.status}
                </span>
              </div>

              <div className="flex items-center gap-8 text-sm text-gray-600 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                   {new Date(booking.date as string).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {booking.time} ({booking.duration})
                </div>
              </div>

              {activeTab === 'upcoming' && (
                <Button className="w-full bg-gray-900 text-white hover:bg-gray-800">
                  Join Meeting
                </Button>
              )}
            </div>
          ))}
        </div>
        </div>
    );
};

export default MyBookingCard;