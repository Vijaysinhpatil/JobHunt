import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Navbar from "@/shared/Navbar"
import CompaniesTable from "./CompaniesTable"
import { useNavigate } from "react-router-dom"
import useGetAllCompanies from "@/Hooks/useGetAllCompanies"

const Companies = () => {
   
    const navigate = useNavigate()
    useGetAllCompanies()

    return(
        <div>
            <Navbar/>

            <div className="max-w-6xl mx-auto my-10">

                <div
                 className="
                  flex 
                  items-center
                  justify-between
                 "
                >
                       <Input
                   className="w-fit"
                   placeholder="Filter By Name"
                 />
                 <Button
                   className="cursor-pointer"
                   onClick={() => navigate('/admin/companies/create')}
                 >
                    New Company
                 </Button>
                </div>

                <CompaniesTable/>
                 
            </div>    
         </div>
    )
}
export default Companies