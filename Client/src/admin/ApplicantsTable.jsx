import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { MoreHorizontal } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const shortListedResult = ["Accepted", "Rejected"];

export const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);


  // status updatation

  const statusHandler = async(status , id) => {
    try {
      
      const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, {status} , {
        withCredentials : true
      })

      console.log("Status response =>" , res);
      
      if(res.data.success)
      {
        toast.success(res.data.success)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }

  return (
    <div className="overflow-x-auto rounded-xl shadow-md bg-gray-900 border border-gray-800">
      <Table className="min-w-full text-gray-300">
        <TableCaption className="text-left text-gray-400 py-3 text-center">
          A list of recent applied users
        </TableCaption>

        {/* Header */}
        <TableHeader>
          <TableRow className="bg-gray-800/80 border-b border-gray-700">
            <TableHead className="px-6 py-3 text-gray-200 font-medium">
              Full Name
            </TableHead>
            <TableHead className="px-6 py-3 text-gray-200 font-medium">
              Email
            </TableHead>
            <TableHead className="px-6 py-3 text-gray-200 font-medium">
              Contact
            </TableHead>
            <TableHead className="px-6 py-3 text-gray-200 font-medium">
              Resume
            </TableHead>
            <TableHead className="px-6 py-3 text-gray-200 font-medium">
              Date
            </TableHead>
            <TableHead className="px-6 py-3 text-right text-gray-200 font-medium">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        {/* Body */}
        <TableBody>
          {applicants &&
            applicants?.applications?.map((item) => (
              <TableRow 
               key={item._id}
              className="bg-gray-800/60 hover:bg-gray-800 transition-colors duration-200">
                <TableCell className="px-6 py-3">{item?.applicant?.fullname}</TableCell>
                <TableCell className="px-6 py-3">{item?.applicant?.email}</TableCell>
                <TableCell className="px-6 py-3">{item?.applicant?.phoneNumber}</TableCell>
                <TableCell className="px-6 py-3 text-blue-400 underline cursor-pointer hover:text-blue-300 transition">
                {
                  item?.applicant?.profile?.resume ?  <a
                   href={item?.applicant?.profile?.resume}
                   target="_blank"
                >
                  {item?.applicant?.profile?.resumeOriginalName}
                </a> : <span>Not Uploaded</span>
                }
               
                </TableCell>
                <TableCell className="px-6 py-3">{item?.applicant?.createdAt?.split("T")[0]}</TableCell>

                {/* Action Button */}
                <TableCell className="px-6 py-3 text-right">
                  <Popover>
                    <PopoverTrigger className="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-700 transition">
                      <MoreHorizontal className="w-5 h-5 text-gray-300" />
                    </PopoverTrigger>

                    <PopoverContent
                      align="end"
                      className="bg-gray-800 border border-gray-700 text-gray-200 w-36 rounded-lg shadow-lg p-2 space-y-1"
                    >
                      {shortListedResult?.map((status, index) => (
                        <button
                          key={index}
                          onClick={() => statusHandler(status , item?._id)}
                          className={`w-full text-left px-3 py-2 rounded-md text-sm hover:bg-gray-700 transition ${
                            status === "Accepted"
                              ? "text-green-400"
                              : "text-red-400"
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};
