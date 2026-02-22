'use client'
import React from 'react';
import { Button } from '../ui/button';

import { useRouter } from 'next/navigation';



const Sidebar = () => {
    const router = useRouter();
    

    const categories = ['Mathematics', 'Computer Science', 'Languages', 'Science', 'Arts & Music', 'Business'];
    const handleCategory = (e:string)=> {

           router.push(`/tutors?category=${e}`);
    }
    // console.log(category)
    return (
        <aside className="sm:col-span-1">
            <div className="bg-white rounded-lg p-6 border border-gray-200 sticky top-20">
              <h3 className="font-bold text-gray-900 mb-6">Filters</h3>

              {/* Categories */}
              <div className="mb-8">
                <h4 className="font-semibold text-gray-900 text-sm mb-4">Categories</h4>
                <div className="space-y-3">
                  {categories.map((cat) => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name='cat'
                        onClick={() => handleCategory(cat)}
                        className="w-4 h-4 rounded"
                      />
                      <span className="text-sm text-gray-600">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Hourly Rate */}
              <div className="mb-8">
                <h4 className="font-semibold text-gray-900 text-sm mb-4">Hourly Rate</h4>
                <div className="space-y-3">
                  {[
                    { value: 'under30', label: 'Under $30' },
                    { value: '30-60', label: '$30 - $60' },
                    { value: '60+', label: '$60+' },
                  ].map((rate) => (
                    <label key={rate.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="rate"
                        value={rate.value}
                        // checked={filters.hourlyRate === rate.value}
                        // onChange={(e) => setFilters((prev) => ({ ...prev, hourlyRate: e.target.value }))}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-gray-600">{rate.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div className="mb-8">
                <h4 className="font-semibold text-gray-900 text-sm mb-4">Rating</h4>
                <div className="space-y-3">
                  {[
                    { value: '4+', label: '4+ Stars' },
                    { value: '3+', label: '3+ Stars' },
                    { value: '2+', label: '2+ Stars' },
                  ].map((rating) => (
                    <label key={rating.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="rating"
                        value={rating.value}
                        // checked={filters.rating === rating.value}
                        // onChange={(e) => setFilters((prev) => ({ ...prev, rating: e.target.value }))}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-gray-600">{rating.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <Button
                variant="outline"
                // onClick={resetFilters}
                className="w-full border-gray-300 bg-transparent"
              >
                Reset Filters
              </Button>
            </div>
          </aside>
    );
};

export default Sidebar;