import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useGetAllJobs } from "@/Hooks/useGetAllJobs";
import { setSingleJob } from "@/redux/jobSlice";
import store from "@/redux/store";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const JobDetails = () => {
  //getting an id
  const params = useParams();
  const JobId = params.id;

  const dispatch = useDispatch();

  // getting deatils from redux slices

  const { user } = useSelector((store) => store.auth);
  const { singleJob } = useSelector((store) => store.job);

  console.log("JobID =>", JobId);

  // apply button logic
  //some => it checks wheather an obj or a thing is present in a given set or obj and it accepts a callback function and return true or false values
  // and it traverse an array

  const isIntiallyApplied =
    singleJob?.applications?.some((appl) => appl.applicant === user?._id) ||
    false;
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/applyJob/${JobId}`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setIsApplied(true); //update local state
        //updating the count of total applicants
        //first take previos singlejobs and the fetch applications which are present in singleJob and store the user id to applicant

        const updateSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updateSingleJob)); // real time ui updation
        toast.success(res.data.message);
      }

      console.log(res.data);
    } catch (error) {
      console.log("Error whlile applying for the job");
      toast.error(error.response.data.message);
    }
  };

  // TO get a single Job

  useEffect(() => {
    const fetchSingleJobs = async () => {
      try {
        const res = await axios.get(
          `${JOB_API_END_POINT}/getJobById/${JobId}`,
          {
            withCredentials: true,
          }
        );

        console.log("Response =>", res);

        if (res.data.success) {
          dispatch(setSingleJob(res.data.jobs));
          setIsApplied(
            res.data?.jobs?.applications?.some(
              (appl) => appl.applicant === user?._id
            )
          ); //ensure that the state is in sync with fetched data
        }
      } catch (error) {
        console.log("Error while getting jobs");
      }
    };

    fetchSingleJobs();
  }, [JobId, dispatch, user?._id]);

  console.log("Single Job from Redux:", singleJob);

  return (
    <div className="bg-gray-900 min-h-screen py-12 px-4 md:px-10">
      {/* Job Header Section */}
      <div className="max-w-6xl mx-auto bg-gray-800 border border-gray-700 rounded-2xl p-8 shadow-lg transition-all hover:shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Left Side: Title & Badges */}
          <div>
            <h1 className="text-3xl font-semibold text-white mb-4 tracking-wide">
              {singleJob?.title}
            </h1>

            <div className="flex flex-wrap gap-3">
              <Badge
                className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-medium px-4 py-1.5 rounded-full shadow-sm hover:scale-105 transition-transform duration-200"
                variant="ghost"
              >
                {singleJob?.position}
              </Badge>
              <Badge
                className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-medium px-4 py-1.5 rounded-full shadow-sm hover:scale-105 transition-transform duration-200"
                variant="ghost"
              >
                {singleJob?.jobType}
              </Badge>
              <Badge
                className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-medium px-4 py-1.5 rounded-full shadow-sm hover:scale-105 transition-transform duration-200"
                variant="ghost"
              >
                {`${singleJob?.salary} ₹`}
              </Badge>
            </div>
          </div>

          {/* Right Side: Apply Button */}
          <div>
            <Button
              onClick={isApplied ? null : applyJobHandler}
              disabled={isApplied}
              className={`rounded-lg px-6 py-2 font-semibold text-sm transition-all duration-200 ${
                isApplied
                  ? "bg-gray-600 cursor-not-allowed text-gray-300"
                  : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-md"
              }`}
            >
              {isApplied ? "Already Applied" : "Apply Now"}
            </Button>
          </div>
        </div>
      </div>

      {/* Job Description Section */}
      <div className="max-w-6xl mx-auto mt-10 bg-gray-800 border border-gray-700 rounded-2xl p-8 shadow-lg transition-all hover:shadow-xl">
        <h2 className="text-2xl font-semibold text-white mb-6 border-b border-gray-700 pb-3">
          {singleJob?.company?.CompanyName}
        </h2>

        <div className="space-y-5 text-gray-300 leading-relaxed">
          <p>
            <span className="font-semibold text-gray-100">Role:</span>{" "}
            <span className="font-light text-gray-400">{singleJob?.title}</span>
          </p>
          <p>
            <span className="font-semibold text-gray-100">Location:</span>{" "}
            <span className="font-light text-gray-400">
              {singleJob?.location}
            </span>
          </p>
          <p>
            <span className="font-semibold text-gray-100">Description:</span>{" "}
            <span className="font-light text-gray-400">
              {singleJob?.description}
            </span>
          </p>
          <p>
            <span className="font-semibold text-gray-100">Experience:</span>{" "}
            <span className="font-light text-gray-400">
              {singleJob?.experienceLevel}
            </span>
          </p>
          <p>
            <span className="font-semibold text-gray-100">Salary:</span>{" "}
            <span className="font-light text-gray-400">
              ₹{`${singleJob?.salary} LPA`}
            </span>
          </p>
          <p>
            <span className="font-semibold text-gray-100">
              Total Applications:
            </span>{" "}
            <span className="font-light text-gray-400">
              {singleJob?.applications?.length}
            </span>
          </p>
          <p>
            <span className="font-semibold text-gray-100">Posted Date:</span>{" "}
            <span className="font-light text-gray-400">
              {singleJob?.createdAt.split("T")[0]}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
