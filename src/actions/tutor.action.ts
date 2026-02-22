"use server";


import { tutorService } from "../../services/tutor.service";
import { Availability, TutorProfile } from "../../types";


export interface ProDataType {
    
    
    bio?: string;
    hourlyRate?: number;
    subjects?: string[];
    categoryName?: string;

}

export const putAvailability = async (data : Availability)=>{

    const res = await tutorService.putAvailability(data)
    return res
}

export const UpdateProfileAction = async (ProfileData : ProDataType)=>{
        const res = await tutorService.updateProfile(ProfileData)
        console.log(res)
        return res;
} 

export const postAvailability = async (availInfo : Availability)=>{
        const res = await tutorService.postAvailability(availInfo)
        return res;
}

     
export const CreateTutorProfileAction = async (tutorInfo : TutorProfile)=> {
        const res = await tutorService.CreateTutorProfileAction(tutorInfo)
        return res
}