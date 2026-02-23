import React from 'react';
import { Booking } from '../../../../types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const BookingCard = ({bookings}:{bookings : Booking[]}) => {
    console.log("booking  ",bookings)
    return (
        <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Recent Bookings
              </h2>
              <div className="space-y-4">
                {bookings.map((booking:Booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between py-3 border-b border-gray-300 last:border-b-0"
                  >
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">
                        {booking?.tutor?.subjects ? booking?.tutor?.subjects[0] : ''} 
                      </p>
                      <p className="text-gray-500 text-xs ">
                        {booking?.student?.name}
                      </p>
                    </div>
                    <Badge className={`${booking.status} text-xs font-semibold`}>
                      {booking.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
    );
};

export default BookingCard;