import { Badge } from "../../components/ui/badge";
import SpotlightCard from "../../components/SpotlightCard.jsx";
import { Button } from "../../components/ui/button.jsx"; // optional, if you have a styled button component
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LatestJobs = (job) => {
  //converting static data to dynamic

  const { allJobs } = useSelector((store) => store.job);

  const navigate = useNavigate();
  return (
    <div className="p-6 cursor-pointer">
      <h1 className="text-white text-3xl font-bold mb-6 flex items-center justify-center">
        Latest Job Openings
      </h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {allJobs.length <= 0 ? (
          <span>NA</span>
        ) : (
          allJobs.slice(0, 6).map((job, index) => (
            <SpotlightCard
              key={index}
              className="custom-spotlight-card p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 "
              spotlightColor="rgba(0, 229, 255, 0.1)"
            >
              <div className="flex flex-col justify-between h-full">
                <div onClick={() => navigate(`/details/${job._id}`)}>
                  <h2 className="text-xl font-semibold text-white mb-1">
                    {job.title}
                  </h2>
                  <p className="text-gray-300 mb-1">
                    {job?.company?.CompanyName}
                  </p>
                  <p className="text-gray-400 text-sm">{job.location}</p>
                  <div>
                    <Badge
                      className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
                              text-white font-semibold px-4 py-1.5 rounded-full shadow-md 
                                hover:scale-105 transition-transform duration-200 mt-6 mr-2"
                      variant="ghost"
                    >
                      {job?.jobType}
                    </Badge>
                    <Badge
                      className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
                              text-white font-semibold px-4 py-1.5 rounded-full shadow-md 
                                hover:scale-105 transition-transform duration-200 mt-6 mr-2"
                      variant="ghost"
                    >
                      {job?.position}
                    </Badge>
                    <Badge
                      className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
                              text-white font-semibold px-4 py-1.5 rounded-full shadow-md 
                                hover:scale-105 transition-transform duration-200 mt-6 mr-2"
                      variant="ghost"
                    >
                      {job?.salary}
                    </Badge>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          ))
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
