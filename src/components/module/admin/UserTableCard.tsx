'use client'
import React from 'react';
import { User } from '../../../../types';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Ban } from 'lucide-react';
import { patchUser } from '@/actions/user.action';



const UserTableCard = ({data}: {data: User[]}) => {
    console.log(data)

    const handleClick = async (id : string,status : string)=>{
        console.log('click',id,status)
        const statusInfo : User = {
            id ,
            status: 'INACTIVE'
        }
        const res = await patchUser(statusInfo)

        if(res?.error){
            return {message:"User Status not updated"}
        }
        

    }


      const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'student':
        return 'bg-gray-100 text-gray-800';
      case 'tutor':
        return 'bg-gray-900 text-white';
      case 'admin':
        return 'bg-red-600 text-white';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
    return (
        <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Joined
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.map((user:User) => (
                    <tr
                      key={user.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={user.image || "/placeholder.svg"} />
                            <AvatarFallback>{user.name}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-gray-900 text-sm">
                              {user.name}
                            </p>
                            <p className="text-gray-500 text-xs">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge
                          className={`${getRoleBadgeColor(
                            user?.role as string
                          )} text-xs font-semibold capitalize`}
                        >
                          {user.role}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className={` ${user.status == "ACTIVE" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"  }  text-xs font-semibold`}>
                          {user.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(user.createdAt as Date).toISOString().split('T')[0]}
                      </td>
                      <td className="px-6 py-4">
                        <Button
                         onClick={()=>handleClick(user.id as string,user.status as string)}
                          variant="ghost"
                          size="sm"
                          className="text-red-600 cursor:pointer hover:text-red-700 hover:bg-red-50 gap-2"
                        >
                          <Ban className="w-4 h-4" />
                          Ban
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
    );
};

export default UserTableCard;