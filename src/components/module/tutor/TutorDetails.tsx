import React from 'react';
import { Star, Clock, MapPin, Shield, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Review, TutorProfile } from '../../../../types';
import { userService } from '../../../../services/user.service';
import { ReviewCard } from './ReviewCard';
import BookingModal from '../booking/BookingModal';
import ReviewModal from '../review/ReviewModal';


const  TutorDetails = async ({tutor, reviews}: {tutor: TutorProfile; reviews : Review[]}) => {
console.log("review details ", reviews )
    

    console.log("tutor details ",tutor)
    const {data} = await userService.getSession()

    const roleStudent = data?.user?.role  == 'STUDENT';
    console.log("detail User session ",data)
    return (
         <div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Profile Info */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Header Card */}
                    <Card>
                        <CardContent className="p-6 sm:p-8">
                            <div className="flex flex-col sm:flex-row gap-6">
                                <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                                    <AvatarImage src={tutor?.user?.image} alt={tutor?.user?.name} className="object-cover" />
                                    <AvatarFallback>{tutor?.user?.name?.charAt(0)}</AvatarFallback>
                                </Avatar>

                                <div className="flex-1">
                                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                                        <div>
                                            <h1 className="text-3xl font-bold text-gray-900">
                                                {tutor?.user?.name}
                                            </h1>
                                            <p className="text-lg text-gray-600 mt-1">
                                                Professional {tutor?.categoryName} Tutor
                                            </p>

                                            <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                                                <div className="flex items-center text-yellow-500 font-medium">
                                                    <Star className="w-4 h-4 fill-current mr-1" />
                                                    {tutor?.avgRating} ({tutor?._count?.review} reviews)
                                                </div>
                                                <div className="flex items-center">
                                                    <MapPin className="w-4 h-4 mr-1" />
                                                    Online
                                                </div>
                                                <div className="flex items-center">
                                                    <Shield className="w-4 h-4 mr-1 text-green-500" />
                                                    Verified
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right hidden sm:block">
                                            <div className="text-2xl font-bold text-primary">
                                                ${tutor?.hourlyRate}
                                            </div>
                                            <div className="text-sm text-gray-500">per hour</div>
                                        </div>
                                    </div>

                                    <div className="mt-6">
                                        <h3 className="font-medium mb-2">Teaches</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {tutor?.subjects?.map((subject) => (
                                                <Badge key={subject} variant="secondary" className="px-3 py-1">
                                                    {subject}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* About Section */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold">About Me</h2>
                        <p className="text-gray-600 leading-relaxed text-lg">{tutor?.bio}</p>
                    </div>

                    {/* Reviews Section */}
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold">Student Reviews</h2>
                        {reviews?.length > 0 ? (
                            <div className="space-y-4">
                                {reviews?.map((review: Review) => (
                                    <ReviewCard key={review?.id} review={review} />
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500">No reviews yet.</p>
                        )}
                    </div>
                    <div>
                       {roleStudent && (
  <ReviewModal
    tutorId={tutor.id as string}
    studentId={data?.user?.id}
  />
)}
                    </div>
                </div>

                {/* Right Column: Booking Card */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24 space-y-6">
                        <Card className="border-2 border-primary/10 shadow-lg">
                            <CardContent className="p-6 space-y-6">
                                <div className="flex justify-between items-center sm:hidden">
                                    <span className="text-lg font-medium">Hourly Rate</span>
                                    <span className="text-2xl font-bold text-primary">
                                        ${tutor?.hourlyRate}
                                    </span>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <Clock className="w-5 h-5 text-primary mt-0.5" />
                                        <div>
                                            <div className="font-medium">Response Time</div>
                                            <div className="text-sm text-gray-500">
                                                Usually responds in 1 hour
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Check className="w-5 h-5 text-green-500 mt-0.5" />
                                        <div>
                                            <div className="font-medium">Free Intro Call</div>
                                            <div className="text-sm text-gray-500">
                                                15-min consultation available
                                            </div>
                                        </div>
                                    </div>
                                </div>

                               {/* { roleStudent  &&
                                <ButtonModal></ButtonModal>
                                } */}
                                {roleStudent && <BookingModal tutorId={tutor.id as string} studentId={data.user.id}></BookingModal>}

                                <p className="text-xs text-center text-gray-500">
                                    100% Satisfaction Guaranteed
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <h3 className="font-bold mb-4">Availability</h3>
                                <div className="space-y-2 text-sm">
                                    {tutor.availability ?
                                        <div
                                            
                                            className="flex justify-between py-2 border-b last:border-0">
                                            <span className="font-medium">{tutor.availability.day}</span>
                                            <span className="text-gray-600">
                                                {tutor.availability.startTime} - {tutor.availability.endTime}
                                            </span>
                                        </div> : 'Available Today'
                                    }
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {/* <BookingModals tutor={tutor}></BookingModals> */}

         </div>
    );
};

export default TutorDetails;