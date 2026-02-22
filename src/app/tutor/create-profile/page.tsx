import React from 'react';
import { categoryService } from '../../../../services/category.service';
import TutorProfileCreateForm from '@/components/module/tutor/TutorProfileCreateForm';

const ProfileCreatepage = async () => {
    const {data} = await categoryService.getCategory()
    return (
        <div className='max-w-7xl mx-auto my-10'>
            <TutorProfileCreateForm categoryList={data.data}></TutorProfileCreateForm>
        </div>
    );
};

export default ProfileCreatepage;