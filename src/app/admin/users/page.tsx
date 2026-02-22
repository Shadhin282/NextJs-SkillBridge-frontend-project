
import { userService } from '../../../../services/user.service';

import UserTableCard from '@/components/module/admin/UserTableCard';


export default async function UserManagement() {
  // const [searchQuery, setSearchQuery] = useState('');

  
    const {data} = await userService.getUsers()
    console.log(data)



  return (
    <>
      {/* <AdminNavbar /> */}
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
            {/* <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-10"
              />
            </div> */}
          </div>

          {/* Users Table */}
          <UserTableCard data={data.data}></UserTableCard>

          {/* Stats */}
          <div className="mt-6 flex items-center justify-between text-sm text-gray-600">
            <p>
              Showing <span className="font-medium">{data.data.length}</span> of{' '}
              <span className="font-medium">{data.data.length}</span> users
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
