import { setAllAppliedJobs } from "@/redux/jobSlice";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const useGetAllAppliedJobs = () => {
    
    const dispatch = useDispatch()
    
    useEffect(() => {

        const fetchAllAppliedJobs = async() => {

            try {
                
                const res = await axios.get(`${APPLICATION_API_END_POINT}/get` , {
                    withCredentials : true
                })
                console.log("Applied Job Response => " , res.data);
                

                if(res.data.success)
                {
                    dispatch(setAllAppliedJobs(res.data.application))
                }
            } catch (error) {
                
                console.log("Error while fetching All applied Jobs");
                
            }
        }
        fetchAllAppliedJobs()
    } , [])

}

export default useGetAllAppliedJobs;