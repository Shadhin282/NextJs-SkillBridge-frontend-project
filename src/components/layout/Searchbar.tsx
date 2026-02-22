'use client'
import { Search } from 'lucide-react';
import { Input } from '../ui/input';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Searchbar = () => {
     const router = useRouter();
  const [value, setValue] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  const searchValue = e.target.value;
  setValue(searchValue);

  router.push(`/tutors?search=${value}`);
};
    return (
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <Input 
              type="text"
              placeholder="Search by name or subject..."
              // value={filters.searchQuery}
              // onChange={(e) => setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))}
              value={value}
          onChange={handleSearch}
              className="pl-10 py-3 h-12"
            />
          </div>
        </div>
    );
};

export default Searchbar;