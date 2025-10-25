import { useEffect } from "react"
import axios from "axios"
import { COMPANY_API_END_POINT } from "@/utils/constant"
import { toast } from "sonner"
import { useDispatch } from "react-redux"
import { setCompanies } from "@/redux/companySlice"

const useGetAllCompanies = () => {
     const dispatch = useDispatch()

    useEffect(() => {


        const fetchCompanies = async() => {

            const res = await axios.get(`${COMPANY_API_END_POINT}/getComDet` , {
              withCredentials : true
            })

            if(res.data.success)
            {
                dispatch(setCompanies(res.data.companies))
                toast.success(res.data.message)
            }
        }
        fetchCompanies()
    } , [])
}
export default useGetAllCompanies