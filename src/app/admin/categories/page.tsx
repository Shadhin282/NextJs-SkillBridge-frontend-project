
import CategoriesDeleteCard from '@/components/module/admin/CategoriesDeleteCard';
import { categoryService } from '../../../../services/category.service';
import { Button } from '@/components/ui/button';
import CategoryModal from '@/components/module/admin/AddCategoryModal';



export default async function UserManagement() {
 
  const {data} = await categoryService.getCategory();
  console.log(data)

  return (
    <>
      {/* <AdminNavbar /> */}
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
            <h1  className="text-3xl font-bold text-gray-900"><CategoryModal/></h1>
          </div>

          {/* Users Table */}
         <CategoriesDeleteCard data={data.data}></CategoriesDeleteCard>

          {/* Stats */}
          <div className="mt-6 flex items-center justify-between text-sm text-gray-600">
            <p>
              Showing <span className="font-medium">{data.data.length}</span> of{' '}
              <span className="font-medium">{data.data.length}</span> categories
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
