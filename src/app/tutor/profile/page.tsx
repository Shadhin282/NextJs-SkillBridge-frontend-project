
import React from 'react';
import { categoryService } from '../../../../services/category.service';
import { tutorService } from '../../../../services/tutor.service';
import { userService } from '../../../../services/user.service';
import TutorProfileUpdateForm from '@/components/module/tutor/TutorProfileForm';

const ProfilePage = async () => {
    const {data:session} = await userService.getSession()
    console.log("session",session)
        const {data} = await categoryService.getCategory()
        // console.log(data.data.map((cat:{name : string}) => cat.name))
        console.log("category ",data)
        const {data: profile } = await tutorService.getTutorDetailsById(session?.user.id)
        // const categoriesList = data.data.map((cat:{name : string}) => cat.name) 
        console.log("profile ", profile)
        return (
        <div className='max-w-7xl mx-auto my-10'>
            <TutorProfileUpdateForm profile={profile} categoryList={data.data}/>
        </div>
    );
};

export default ProfilePage;