'use client'
import React from 'react';
import { Booking } from '../../../../types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {  Ban } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { deleteBooking } from '@/actions/booking.action';
import { toast } from 'sonner';



const BookingDeleteCard = ({data}:{data:Booking}) => {
    const handleDelete = async (id: string)=>{

        const {data} = await deleteBooking(id)

        if(data.error){
            return {message : "error found , data not delete"}
        };
        toast.success("data deleted")
    }
    return (
        <div>
             <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Student Info
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Tutor Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Subjects
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.map((booking:Booking) => (
                    <tr
                      key={booking.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                         <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={booking.student.image || "/placeholder.svg"} />
                            <AvatarFallback>{booking.student.name}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-gray-900 text-sm">
                              {booking.student.name}
                            </p>
                            <p className="text-gray-500 text-xs">
                              {booking.student.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                       
                          
                        
                          {booking.tutor.user.name}
                        
                      </td>
                      <td className="px-6 py-4">
                        
                          {booking.tutor.subjects[0]}
                        
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {booking.status}
                      </td>
                      <td className="px-6 py-4">
                        <Button
                        onClick={()=>handleDelete(booking.id)}
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 gap-2"
                        >
                          <Ban className="w-4 h-4" />
                         Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {data.length === 0 && (
              <div className="px-6 py-12 text-center">
                <p className="text-gray-500">No users found matching your search.</p>
              </div>
            )}
          </Card>
        </div>
    );
};

export default BookingDeleteCard;