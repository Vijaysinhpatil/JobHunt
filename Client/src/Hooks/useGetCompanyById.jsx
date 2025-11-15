import { setSingleCompany } from "@/redux/companySlice";
import { setAllJobs } from "@/redux/jobSlice";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const useGetCompanyById = (companyId) => {
   
 const dispatch = useDispatch()
 
     useEffect(() => {

        const fetchSingleCompany = async() => {

               try {
                
                const res = await axios.get(`${COMPANY_API_END_POINT}/getComById/${companyId}`,{
                    withCredentials : true
                })
                
                
                console.log("Response => " , res.data.comapny);
                
                if(res.data.success)
                {
                    dispatch(setSingleCompany(res.data.comapny))
                    toast.success(res.data.message)
                }
               } catch (error) {
                console.log("Error while getting Company By its ID");
                toast.error(error.response.data.message)
                
               }
        }
        fetchSingleCompany()
     } , [companyId , dispatch])

}
export default useGetCompanyById;