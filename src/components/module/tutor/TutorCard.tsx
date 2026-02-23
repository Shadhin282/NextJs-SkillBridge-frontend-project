import React from 'react';
import Link from 'next/link';
import { Star, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TutorProfile } from '../../../../types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';


interface TutorCardProps {
    tutor: TutorProfile;
}

export function TutorCard({ tutor }: TutorCardProps) {
    return (
        <Card className="flex flex-col h-full hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row gap-4">
                <Avatar className="w-16 h-16 border-2 border-primary/10">
                    <AvatarImage src={tutor?.user?.image} alt={tutor?.name} className="object-cover" />
                    <AvatarFallback>{tutor?.user?.name?.charAt(0)}</AvatarFallback>
                </Avatar>

                <div>
                    <h3 className="font-bold text-lg">{tutor?.user?.name}</h3>
                    <div className="flex items-center text-yellow-500 text-sm mt-1">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="ml-1 font-medium">{tutor.avgRating}</span>
                        <span className="text-muted-foreground ml-1">
                            ({tutor?._count?.review} reviews)
                        </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {tutor.bio}
                    </p>
                </div>
            </CardHeader>

            <CardContent className="flex-1">
                <div className="flex flex-wrap gap-2 mb-4">
                    {tutor?.subjects?.slice(0, 3).map((subject) => (
                        <Badge key={subject} variant="secondary">
                            {subject}
                        </Badge>
                    ))}
                    {/* {tutor.subjects?.length > 3 && (
                        <Badge variant="outline">+{tutor.subjects?.length - 3}</Badge>
                    )} */}
                   
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground mt-4">
                    <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{tutor.availability ? tutor.availability.day : 'Available Today'}</span>
                    </div>
                    <div className="font-bold text-lg text-primary">
                        ${tutor.hourlyRate}/hr
                    </div>
                </div>
            </CardContent>

            <CardFooter>
                <Link href={`/tutors/${tutor.id}`} className="w-full">
                    <Button className="w-full">View Profile</Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
