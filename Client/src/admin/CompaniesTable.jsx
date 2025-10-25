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

const CompaniesTable = () => {
  const { companies } = useSelector((store) => store.company);
  console.log(companies);
  
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
            <TableHead>Industry</TableHead>
            <TableHead>Date Added</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {companies.length <= 0 ? (
            <span>You are not register a single Company</span>
          ) : (
            <>
              {companies.map((company) => {
                return (

                 <div key={company._id}>
                       <TableRow className="hover:bg-gray-700 transition-colors">
                    <TableCell>
                      <Avatar>
                        <AvatarImage src={vijaysinh} alt="Company Logo" />
                      </Avatar>
                    </TableCell>

                    <TableCell>Microsoft</TableCell>
                    <TableCell>Finance</TableCell>
                    <TableCell>17/02/2005</TableCell>

                    <TableCell className="text-right">
                      <Popover>
                        <PopoverTrigger>
                          <MoreHorizontal className="cursor-pointer" />
                        </PopoverTrigger>
                        <PopoverContent className="w-32 bg-gray-800 text-gray-100">
                          <div className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded-md cursor-pointer">
                            <Edit2 className="w-4 h-4" />
                            <span>Edit</span>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                  </TableRow>
                 </div>
                );
              })}
            </>
          )}

          {/* Add more rows dynamically as needed */}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
