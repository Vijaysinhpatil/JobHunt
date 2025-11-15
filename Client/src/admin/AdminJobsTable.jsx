
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table.jsx";

import { Popover, PopoverContent } from "@/components/ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setSearchCompanyByText } from "@/redux/companySlice.js";
import { useNavigate } from "react-router-dom";
import store from "@/redux/store.js";
import useGetAllAdminJobs from "@/Hooks/useGetAllAdminJobs.jsx";

const AdminJobsTable = () => {


  useGetAllAdminJobs()
  const currentDate = Date.now()

  const navigate = useNavigate()
  const { allAdminJobs , searchJobByText} = useSelector(store => store.job)

  const { companies , serchCompanyByText } = useSelector((store) => store.company);

  const [filterJobs , setFilterJobs] = useState(allAdminJobs)


  
  useEffect(() => {

    const filteredJobs = allAdminJobs.length >= 0 && allAdminJobs.filter((job) => {
      if(!searchJobByText){
        return true;
      }

      return job?.company?.CompanyName?.toLowerCase().includes(searchJobByText.toLowerCase())
             ||
             job?.title?.toLowerCase().includes(searchJobByText.toLowerCase())
    })
    setFilterJobs(filteredJobs)

  }, [allAdminJobs , searchJobByText])


  return (
    <div className="p-4 bg-gray-900 rounded-xl shadow-lg">
      <Table className="bg-gray-800 text-gray-100">
        <TableCaption className="text-gray-400">
               List of Posted Jobs
        </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date Added</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterJobs.length <= 0 ? (
            <span>Not Posted  any Company yet</span>
          ) : (
            <>
              {filterJobs.map((job) => (
                <TableRow className="hover:bg-gray-700 transition-colors" key={job._id}>
                
                    <TableCell>{job?.company?.CompanyName}</TableCell>
                    <TableCell>{job?.title}</TableCell>
                   
                    <TableCell>{job?.createdAt?.split("T")[0]}</TableCell>

                    <TableCell className="text-right">
                      <Popover>
                        <PopoverTrigger>
                          <MoreHorizontal className="cursor-pointer" />
                        </PopoverTrigger>
                        <PopoverContent className="w-32 bg-gray-800 text-gray-100">
                          <div
                            onClick={() => navigate(`/admin/companies/${job._id}`)} 
                            className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded-md cursor-pointer">
                            <Edit2 className="w-4 h-4" />
                            <span>Edit</span>
                          </div>
                          <div
                             className="flex items-center w-fit gap-2 cursor-pointer mt-2"
                             onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                          >
                               <Eye className="w-4"/>
                               <span>Applicants</span>
                          </div>
                        </PopoverContent>
                        
                      </Popover>
                    </TableCell>
                  </TableRow>
              ))}
            </>
          )}

          {/* Add more rows dynamically as needed */}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
