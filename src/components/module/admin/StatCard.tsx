import React from 'react';

import { BookOpen, DollarSign, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';



const StatCard = ({totalBooking 
,totalCategory  ,totalUser}:{totalBooking : number 
,totalCategory : number ,totalUser : number}) => {

            const stats = [
    {
      title: 'Total Users',
      value: totalUser,
      change: '',
      icon: Users,
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Total Bookings',
      value: totalBooking,
      change: '',
      icon: BookOpen,
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
    },
    {
      title: 'Total Category',
      value: totalCategory,
      change: '',
      icon: DollarSign,
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
    },
  
  ];
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {stats.map((stat  , index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-gray-600 text-sm font-medium mb-2">
                        {stat.title}
                      </p>
                      <div className="flex items-baseline gap-2">
                        <p className="text-3xl font-bold text-gray-900">
                          {stat.value as number}
                        </p>
                      </div>
                      <p className="text-green-600 text-xs mt-2 font-medium">
                        {stat.change}
                      </p>
                    </div>
                    <div className={`${stat.bgColor} p-3 rounded-lg`}>
                      <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
    );
};

export default StatCard;