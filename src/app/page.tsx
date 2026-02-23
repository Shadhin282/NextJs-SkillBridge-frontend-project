import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Search, CheckCircle, ArrowRight } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { tutorService } from "../../services/tutor.service";
import { Category, TutorProfile } from "../../types";
import { TutorCard } from "@/components/module/tutor/TutorCard";



export default async function Home() {

  const [data, category] = await Promise.all([await tutorService.getTutorsPost(),await tutorService.getCategory()])
    console.log("category",category)
    console.log("data", data)
    

  return (
   <div className="flex flex-col min-h-screen">

      {/* Hero Section */}
      <section className="bg-gray-200 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
            Master Any Subject with{' '}
            <span className="text-primary">Expert Tutors</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Connect with top-rated tutors for 1-on-1 learning. From Mathematics
            to Music, find the perfect mentor to help you achieve your goals.
          </p>

          <div className="max-w-2xl mx-auto bg-white p-2 rounded-lg shadow-lg flex flex-col sm:flex-row gap-2">
            <div className="relative grow">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="What do you want to learn?"
               
                className="pl-10 border-0 shadow-none focus-visible:ring-0 text-lg h-12" />

            </div>
            <Link href="/tutors">
              <Button size="lg" className="w-full bg-gray-900 text-white sm:w-auto h-12 px-8">
                Find Tutors
              </Button>
            </Link>
          </div>

          <div className="mt-8 flex justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
              Verified Tutors
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
              Secure Payment
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
              Satisfaction Guaranteed
            </div>
          </div>
        </div>
      </section>


       {/* Categories Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Explore Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {category.data.data.map((category : Category) => (
              <Link
                key={category.id}
                href={`/tutors?category=${category.name}`}
                className="group p-4 border rounded-lg hover:border-primary hover:shadow-md transition-all text-center">

                <div className="font-medium text-gray-900 group-hover:text-primary">
                  {category.name}
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  {category?._count?.tutors} tutors
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

                 {/* Featured Tutors */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Featured Tutors
              </h2>
              <p className="text-gray-600 mt-2">
                Top-rated experts ready to help you learn
              </p>
            </div>
            <Link href="/tutors">
              <Button variant="ghost" className="hidden sm:flex">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.data.data?.slice(0, 4).map((tutor: TutorProfile) => (
              <TutorCard key={tutor.id} tutor={tutor} />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link href="/tutors">
              <Button variant="outline" className="w-full">
                View All Tutors
              </Button>
            </Link>
          </div>
        </div>
      </section>



          {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white/80">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to start your learning journey?
          </h2>
          <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
            Join thousands of students who are mastering new skills with
            personalized guidance from expert tutors.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto bg-white text-black font-bold text-lg h-14 px-8">

                Get Started for Free
              </Button>
            </Link>
            <Link href="/register?role=tutor">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto bg-transparent border-white text-white hover:bg-white/10 h-14 px-8">

                Become a Tutor
              </Button>
            </Link>
          </div>
        </div>
      </section>
   </div>
  );
}
