
import React from 'react';
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Review } from '../../../../types';


export function ReviewCard({ review }: {review:Review}) {
    if(!review){
        return 'no review'
    }
    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                            {/* <User className="h-4 w-4 text-primary" /> */}
                            <Avatar className=" border-4 border-white shadow-lg">
                                    <AvatarImage src={review?.student.image} alt={review?.student.name} className="object-cover" />
                                    <AvatarFallback>{review?.student.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                        </div>
                        <div>
                            <div className="font-medium text-sm">{review?.student.name}</div>
                            <div className="text-xs text-muted-foreground">
                                {new Date(review.createdAt).toLocaleDateString()}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center text-yellow-500">
                        {Array.from({ length: 5 }).map((_ , i : number ) => (
                            <Star
                                key={i}
                                className={`w-4 h-4 ${i < review.rating  ? 'fill-current' : 'text-gray-300'}`}
                            />
                        ))}
                    </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">{review.comment}</p>
            </CardContent>
        </Card>
    );
}
