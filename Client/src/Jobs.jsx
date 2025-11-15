import { useEffect, useState } from 'react';
import FilterCard from "./JobInfo/FilterCard";
import SingleJob from "./JobInfo/SingleJob";
import Navbar from "./shared/Navbar";
import axios from 'axios';
import { JOB_API_END_POINT } from './utils/constant';
import { useSelector } from 'react-redux';
import store from './redux/store';
// import { useGetAllJobs } from './Hooks/useGetAllJobs';



function Jobs() {
  // useGetAllJobs()
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const { allJobs , searchedQuery } = useSelector(store => store.job)
  const [filterJobs , setFilteredJobs ] = useState(allJobs)


useEffect(() => {
  const query = typeof searchedQuery === 'string'
    ? searchedQuery.toLowerCase()
    : '';

  if (query) {
    const filteredJobs = allJobs.filter((job) => {
      return (
        job?.title?.toLowerCase()?.includes(query) ||
        job?.description?.toLowerCase()?.includes(query) ||
        job?.location?.toLowerCase()?.includes(query)
      );
    });
    setFilteredJobs(filteredJobs);
  } else {
    setFilteredJobs(allJobs);
  }
}, [allJobs, searchedQuery]);


  console.log(allJobs);
  

  return (
    <>
      <Navbar />

      {/* Page Background */}
      <div className="min-h-screen bg-gray-800 text-white">
        {/* Page Content */}
        <div className="max-w-7xl mx-auto mt-4 px-3 sm:px-4 md:px-6 lg:px-8">
          
          {/* Mobile Filter Toggle Button */}
          <div className="lg:hidden mb-4">
            <button 
              onClick={() => setShowMobileFilter(!showMobileFilter)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              {showMobileFilter ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
            
            {/* Left Side Filter */}
            <div className={`
              ${showMobileFilter ? 'block' : 'hidden'} 
              lg:block w-full lg:w-1/4
            `}>
              <div className="sticky top-20 lg:top-4 z-10 bg-gray-900 lg:bg-transparent rounded-lg lg:rounded-none p-4 lg:p-0">
                <FilterCard />
              </div>
            </div>

            {/* Job Listings */}
            <div className="w-full lg:w-3/4">
              {filterJobs.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <svg className="w-16 h-16 text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span className="text-gray-400 text-lg font-medium">No jobs found</span>
                  <p className="text-gray-500 mt-2">Try adjusting your filters to find more opportunities</p>
                </div>
              ) : (
                <>
                  {/* Results Count */}
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-white">
                      {filterJobs.length} jobs found
                    </h2>
                    <div className="text-sm text-gray-400">
                      Sorted by: <span className="text-blue-400">Most relevant</span>
                    </div>
                  </div>

                  {/* Jobs Grid */}
                  <div className="h-[calc(100vh-180px)] sm:h-[calc(100vh-160px)] md:h-[75vh] lg:h-[80vh] overflow-y-auto pb-4">
                    <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
                      {allJobs.map((job) => (
                        <div key={job._id}>
                           <SingleJob job = {job} />
                        </div>
                       
                      ))}
                    </div>
                    
                    {/* Load More Indicator */}
                    <div className="flex justify-center mt-6">
                      <div className="text-gray-400 text-sm flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                        Loading more opportunities...
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
}

export default Jobs;