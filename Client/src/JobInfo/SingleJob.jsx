import React from "react";
import { Bookmark } from "lucide-react";
import { Button } from "../components/ui/button"; 
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import VijayLogo from "../../src/images/Vijaysinh.jpg";
import { Badge } from "../components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import store from "@/redux/store";
import LatestJobs from "@/Home/HomeParts/LatestJobs";

function SingleJob({job}) {

    const navigate = useNavigate()
    

    // creating days ago function

    const daysAgofunction = (mongoDBTime) => {

      const createdAt = new Date(mongoDBTime)
        //  console.log("Creacted Time => " , createdAt);
      const currentTime = new Date()
      // console.log("Current Time => " , currentTime);
      
      const timeDifference = currentTime - createdAt;

      // console.log("Time Difference => " , timeDifference);
      
      return Math.floor( timeDifference / (24 * 60 * 60 * 1000))
    }

  return (
    <div
      className="p-6 rounded-2xl bg-gray-900 border border-gray-800 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
    >
      {/* Top Row */}
      <div className="flex justify-between items-center">
        <p className="text-xs text-gray-400">{
           
            daysAgofunction(job?.createdAt) === 0 ? "Today" : `${
              daysAgofunction(job?.createdAt)
            } Days Ago`
          }</p>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full cursor-pointer border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white transition"
        >
          <Bookmark className="h-4 w-4" />
        </Button>
      </div>

      {/* Company Logo */}
      <div className="flex items-center gap-3 my-4">
        <Avatar>
          <AvatarImage
            src={job?.company?.logo}
            alt="Company Logo"
            className="h-12 w-12 rounded-full object-cover border border-gray-700"
          />
        </Avatar>
        <div>
          <h1 className="text-lg font-semibold text-white">{job?.company?.CompanyName}</h1>
          <p className="text-sm text-gray-400">{job?.location}</p>
        </div>
      </div>

      {/* Job Info */}
      <div className="mt-3">
        <h2 className="text-base font-medium text-white">{job?.title}</h2>
        <p className="text-sm text-gray-400 mt-1">
         {job?.description}
        </p>
      </div>

      {/* Badges */}

     <div>
                  <Badge
                    className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
                              text-white font-semibold px-4 py-1.5 rounded-full shadow-md 
                                hover:scale-105 transition-transform duration-200 mt-6 mr-2"
                    variant="ghost"
                  >
                    {job?.position} vacencies
                  </Badge>
                  <Badge
                    className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
                              text-white font-semibold px-4 py-1.5 rounded-full shadow-md 
                                hover:scale-105 transition-transform duration-200 mt-6 mr-2"
                    variant="ghost"
                  >
                  {job?.jobType}
                  </Badge>
                  <Badge
                    className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
                              text-white font-semibold px-4 py-1.5 rounded-full shadow-md 
                                hover:scale-105 transition-transform duration-200 mt-6 mr-2"
                    variant="ghost"
                  >
                    {job?.salary}₹
                  </Badge>
    </div>
      {/* Apply Button */}
      <div className="mt-4 flex items-center gap-5 justify-between">
         
            <Button 
             onClick = {() => navigate(`/details/${job?._id}`)}
            className="w-25  rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition p-5 cursor-pointer">
              See Details
            </Button>
       
        <Button className="w-30 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition p-5">
          Save for Later
        </Button>
      </div>
    </div>
  );
}

export default SingleJob;
