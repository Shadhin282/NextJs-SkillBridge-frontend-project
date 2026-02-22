'use client'
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {  Ban } from 'lucide-react';
import { Category } from '../../../../types';
import { toast } from 'sonner';
import { deleteCategory } from '@/actions/category.action';


const CategoriesDeleteCard = ({data}:{data:Category}) => {
    const handleDelete = async (id:string)=>{

        const {data} = await deleteCategory(id)

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
                      Name
                    </th>
                    {/* <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Role
                    </th> */}
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Count
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.map((category:Category) => (
                    <tr
                      key={category.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {/* <Avatar className="w-10 h-10">
                            <AvatarImage src={user.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{user.initials}</AvatarFallback>
                          </Avatar> */}
                          <div>
                            <p className="font-medium text-gray-900 text-sm">
                              {category.name}
                            </p>
                            <p className="text-gray-500 text-xs">
                              {/* {user.email} */}
                            </p>
                          </div>
                        </div>
                      </td>
                      {/* <td className="px-6 py-4">
                        <Badge
                          className={`${getRoleBadgeColor(
                            user.role
                          )} text-xs font-semibold capitalize`}
                        >
                          {user.role}
                        </Badge>
                      </td> */}
                      <td className="px-6 py-4">
                        <Badge className="bg-green-100 text-green-800 text-xs font-semibold">
                          {category.description}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {category._count.tutors}
                      </td>
                      <td className="px-6 py-4">
                        <Button
                        onClick={()=>handleDelete(category.id)}
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

export default CategoriesDeleteCard;