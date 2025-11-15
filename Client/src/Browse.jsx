import { useState, useEffect, use } from 'react';
import SingleJob from "./JobInfo/SingleJob";
import Navbar from "./shared/Navbar";
import { useSelector } from 'react-redux';
import store from './redux/store';
import { useGetAllJobs } from './Hooks/useGetAllJobs';


const Browse = () => {
  // State management

  useGetAllJobs()
  const { allJobs } = useSelector((store) => store.job)
  const { searchedQuery } = useSelector((store) => store.job);

  const { user } = useSelector(store => store.auth)
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState(searchedQuery || "");
  const [sortBy, setSortBy] = useState("recent");
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    jobType: [],
    experience: [],
    location: [],
    remote: false
  });

  // Simulate API call
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setJobs(allJobs);
        setFilteredJobs(allJobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [allJobs]);

  // Apply filters and sorting whenever dependencies change
  useEffect(() => {
    if (jobs.length === 0) return;

    let result = [...jobs];

    // Apply search filter
    if (searchTerm && typeof searchTerm === 'string') {
      result = result.filter(job =>
        job?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        job?.company?.CompanyName?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        job?.location?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        job?.skills?.some(skill => skill.toLowerCase().includes(searchTerm?.toLowerCase()))
      );
    }

    // Apply job type filter
    if (filters.jobType.length > 0) {
      result = result.filter(job => filters.jobType.includes(job.type));
    }

    // Apply experience filter
    if (filters.experience.length > 0) {
      result = result.filter(job => filters.experience.includes(job.experience));
    }

    // Apply location filter
    if (filters.location.length > 0) {
      result = result.filter(job => filters.location.includes(job.location));
    }

    // Apply remote filter
    if (filters.remote) {
      result = result.filter(job => job.isRemote);
    }

    // Apply sorting
    switch (sortBy) {
      case "recent":
        result.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
        break;
      case "salary-high":
        result.sort((a, b) => b.salary - a.salary);
        break;
      case "salary-low":
        result.sort((a, b) => a.salary - b.salary);
        break;
      case "relevant":
        // For relevance, you might want to implement a scoring system
        // For now, we'll use title alphabetical order
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    setFilteredJobs(result);
  }, [jobs, searchTerm, sortBy, filters]);

  // Handler functions
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setSortBy("recent");
    setFilters({
      jobType: [],
      experience: [],
      location: [],
      remote: false
    });
  };


  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-white">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
            user ? (
              <>
                  
                <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-white">
                <Navbar />

                {/* Main Content Container */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  {/* Header Section */}
                  <div className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                          Job Opportunities
                        </h1>
                        <p className="text-gray-400 mt-2 text-sm sm:text-base">
                          Discover your next career move
                        </p>
                      </div>
                      
                      {/* Results Count and Filters */}
                      <div className="flex items-center gap-4">
                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg px-4 py-2 border border-gray-700">
                          <span className="text-gray-300 text-sm">Found</span>
                          <span className="text-blue-400 font-semibold ml-2">
                            {filteredJobs.length} jobs
                          </span>
                        </div>
                        <button 
                          onClick={clearAllFilters}
                          className="bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 transition-all duration-200 flex items-center gap-2 group"
                        >
                          <svg className="w-4 h-4 text-gray-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                          <span className="text-sm font-medium">Clear Filters</span>
                        </button>
                      </div>
                    </div>

                    {/* Search and Sort Bar */}
                    <div className="mt-6 flex flex-col sm:flex-row gap-4">
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={searchTerm}
                          onChange={handleSearchChange}
                          placeholder="Search jobs by title, company, or keyword..."
                          className="w-full bg-gray-800/50 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                        />
                        <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <select 
                        value={sortBy}
                        onChange={handleSortChange}
                        className="bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm min-w-[180px]"
                      >
                        <option value="recent">Sort by: Most Recent</option>
                        <option value="relevant">Sort by: Most Relevant</option>
                        <option value="salary-high">Sort by: Salary (High to Low)</option>
                        <option value="salary-low">Sort by: Salary (Low to High)</option>
                      </select>
                    </div>
                  </div>

                  {/* Jobs Grid Section */}
                  <div className="mb-8">
                    {filteredJobs.length === 0 ? (
                      // Empty State
                      <div className="text-center py-16">
                        <div className="max-w-md mx-auto">
                          <svg className="w-20 h-20 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                          <h3 className="text-xl font-semibold text-gray-300 mb-2">No jobs found</h3>
                          <p className="text-gray-500 mb-6">
                            Try adjusting your search criteria or filters to find more opportunities.
                          </p>
                          <button 
                            onClick={clearAllFilters}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                          >
                            Clear Filters
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        {/* Jobs Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                          {filteredJobs.map((job) => (
                            <SingleJob key={job.id} job={job} />
                          ))}
                        </div>

                        {/* Load More Section */}
                        <div className="text-center mt-12">
                          <button className="bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 transform">
                            Load More Jobs
                          </button>
                          <p className="text-gray-500 text-sm mt-4">
                            Showing {filteredJobs.length} of {jobs.length} opportunities
                          </p>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Quick Stats */}
                  <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700 p-6 mt-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                      <div>
                        <div className="text-2xl font-bold text-blue-400">10K+</div>
                        <div className="text-gray-400 text-sm">Active Jobs</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-400">2K+</div>
                        <div className="text-gray-400 text-sm">Companies</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-purple-400">50K+</div>
                        <div className="text-gray-400 text-sm">Candidates Hired</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-orange-400">24/7</div>
                        <div className="text-gray-400 text-sm">Support</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </>
            ) : (<span
  className="
    inline-block
    mt-20
    px-6 py-3
    text-xl font-extrabold
    text-white
    bg-gradient-to-r from-red-600 to-purple-600
    rounded-full
    shadow-lg
    border border-red-400
    transition-transform duration-300
    hover:scale-105
    cursor-not-allowed
    select-none
  "
>
  ⚠️ ACCESS DENIED ⚠️
</span>
)
  );
};

export default Browse;