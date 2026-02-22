import TutorDetails from "@/components/module/tutor/TutorDetails";
import { tutorService } from "../../../../services/tutor.service";
import { ReviewService } from "../../../../services/review.service";
import { TutorProfile } from "../../../../types";



export default async function TutorProfilePage({params}:{params:Promise<{id?:string}>;}) {
    

    const {id} = await params || ''
    console.log("params review id ",id)
    const {data: tutor } = await tutorService.getTutorById(id as string) 
    console.log('tutor id ',tutor)
    const {data : reviews} = await ReviewService.getReviewById(id as string);
    console.log('review id ',reviews)
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
           
        <TutorDetails key={tutor?.id} tutor={tutor as TutorProfile} reviews={reviews}></TutorDetails>
            

        </div>
    );
}
