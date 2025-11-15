import { setAllJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector(store => store.job);

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        // Handle undefined or null searchedQuery
        const keyword = searchedQuery || "";

        const res = await axios.get(
          `${JOB_API_END_POINT}/getAlljobs?keyword=${keyword}`, 
          {
            withCredentials: true,
          }
        );

        // console.log("API Response:", res.data);

        if (res.data.success) {
          console.log("Jobs fetched successfully:", res.data.jobs.length);
          dispatch(setAllJobs(res.data.jobs));
        } else {
          console.warn("Invalid response format:", res.data);
          // Don't clear jobs on invalid format, just log warning
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    
    fetchAllJobs();
  }, []);
};