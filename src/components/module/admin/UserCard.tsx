import { Card } from '@/components/ui/card';
import React from 'react';
import { User } from '../../../../types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';




const UserCard = ({users}:{users : User[]}) => {
    // console.log(users)
    return (
         <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Recent Registrations
              </h2>
              <div className="space-y-4">
                {users.map((registration:User) => (
                  <div
                    key={registration.id}
                    className="flex items-center justify-between py-3 border-b border-gray-300 last:border-b-0"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={registration.image|| "/placeholder.svg"} />
                        <AvatarFallback>{registration.name}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">
                          {registration.name}
                        </p>
                        <p className="text-gray-500 text-xs">
                          {registration.role}
                        </p>
                      </div>
                    </div>
                    <span className="text-gray-500 text-sm">
                      {new Date(registration.createdAt).toISOString().split('T')[0]}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
    );
};

export default UserCard;