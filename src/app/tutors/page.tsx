
import { TutorCard } from '@/components/module/tutor/TutorCard';
import { tutorService } from '../../../services/tutor.service';
import { TutorProfile } from '../../../types';
import Sidebar from '@/components/layout/Sidebar';
import Searchbar from '@/components/layout/Searchbar';





export default async function BrowseTutors(props: {
  searchParams: Promise<{ category?: string; search?:string }>;
}) {

const { category , search } = await props.searchParams;


    const {data} = await tutorService.getTutorsPost({
       search,
      price : 0,
      category
    },{
      cache : 'no-store'
    });
 

  return (
    <>
      {/* <UserNavbar userType="student" /> */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Browse Tutors</h1>
          <p className="text-lg text-gray-600">Find the perfect tutor for your needs</p>
        </div>

        {/* Search Bar */}
        
        <Searchbar></Searchbar>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <Sidebar></Sidebar>

          {/* Tutors Grid */}
          <div className="sm:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6">
              {
              data.data?.map((tutor:TutorProfile) => (
               <TutorCard key={tutor.id} tutor={tutor}></TutorCard>
              ))
              }
            </div>

           
          </div>
        </div>
      </main>
    </>
  );
}
