import { setAllJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useGetAllJobs = () => {
  const dispatch = useDispatch();
  // const {job} = useSelector(store => store.job)
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/getAlljobs`, {
          withCredentials: true,
        });

        if (res.data.success && Array.isArray(res.data.jobs)) {
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        console.log("Error custom Creating Custom Hook1", error);
      }
    };
    fetchAllJobs();
  }, []);
};
