import { Avatar, AvatarImage } from "@/components/ui/avatar.jsx";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table.jsx";
import vijaysinh from "../images/Vijaysinh.jpg";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setSearchCompanyByText } from "@/redux/companySlice.js";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {


 
  const currentDate = Date.now()

  const navigate = useNavigate()
  
  const { companies , serchCompanyByText } = useSelector((store) => store.company);

  const [filterCompany , setFilterCompany] = useState(companies)

  useEffect(() => {

    const filteredCompany = companies.length >= 0 && companies.filter((company) => {
      if(!serchCompanyByText){
        return true;
      }

      return company?.CompanyName?.toLowerCase().includes(serchCompanyByText.toLowerCase())
             ||
             company?.title?.toLowerCase().includes(serchCompanyByText.toLowerCase())
    })
    setFilterCompany(filteredCompany)

  }, [companies , serchCompanyByText])


  return (
    <div className="p-4 bg-gray-900 rounded-xl shadow-lg">
      <Table className="bg-gray-800 text-gray-100">
        <TableCaption className="text-gray-400">
          Recently Registered Companies
        </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date Added</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterCompany.length <= 0 ? (
            <span>Not Registered to a Company Yet</span>
          ) : (
            <>
              {filterCompany.map((comp) => (
                <TableRow className="hover:bg-gray-700 transition-colors">
                    <TableCell>
                      <Avatar>
                        <AvatarImage src={comp.logo} alt="Company Logo" />
                      </Avatar>
                    </TableCell>

                    <TableCell>{comp.CompanyName}</TableCell>
                   
                    <TableCell>{comp?.createdAt?.split("T")[0]}</TableCell>

                    <TableCell className="text-right">
                      <Popover>
                        <PopoverTrigger>
                          <MoreHorizontal className="cursor-pointer" />
                        </PopoverTrigger>
                        <PopoverContent className="w-32 bg-gray-800 text-gray-100">
                          <div
                            onClick={() => navigate(`/admin/companies/${comp._id}`)} 
                            className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded-md cursor-pointer">
                            <Edit2 className="w-4 h-4" />
                            <span>Edit</span>
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

export default CompaniesTable;
