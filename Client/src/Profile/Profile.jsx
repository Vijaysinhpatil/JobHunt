import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Navbar from "@/shared/Navbar";
import vijaysinh from "../images/Vijaysinh.jpg";
import { Button } from "@/components/ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Label } from "@/components/ui/label";
import AppliedJobsTable from "@/JobInfo/AppliedJobsTable";
import { useState } from "react";
import UpdateProfile from "./UpdateProfile";
import { useSelector } from "react-redux";
import store from "@/redux/store";
import useGetAllAppliedJobs from "@/Hooks/useGetAllAppliedJobs.jsx";
const Profile = () => {
  const isResume = true;

  useGetAllAppliedJobs()


  const [Open , setOpen] = useState(false)
  
  const { user } = useSelector(store => store.auth)


  let skillsArray = user?.profile?.skills

  
  return (
    <div className="bg-gray-900 min-h-screen text-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Profile Container */}
      <div className="max-w-5xl mx-auto bg-gray-800 border border-gray-700 rounded-2xl my-8 p-8 shadow-md transition-all hover:shadow-lg">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-5">
            <Avatar className="h-20 w-20 border-2 border-gray-700">
              <AvatarImage src={user?.profile?.profilePhoto} alt="Vijaysinh" />
            </Avatar>

            <div>
              <h1 className="text-2xl font-semibold text-white">
                {user?.fullname}
              </h1>
              <p className="text-gray-400 text-sm max-w-md">
                  {
                      user?.profile?.bio
                  }
              </p>
            </div>
          </div>

          <Button
            variant="outline"
             onClick={() => setOpen(true)}
            className="flex items-center gap-2 border-gray-600 text-gray-600 hover:bg-gray-700 hover:text-white"
          >
            <Pen 
           
            className="w-4 h-4" />
            Edit Profile
          </Button>
        </div>

        {/* Divider */}
        <hr className="my-6 border-gray-700" />

        {/* Contact Section */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <div className="flex items-center gap-3 text-gray-300">
            <Mail className="w-5 h-5 text-gray-400" />
            <span className="text-sm md:text-base">
               {user?.email}
            </span>
          </div>
          <div className="flex items-center gap-3 text-gray-300">
            <Contact className="w-5 h-5 text-gray-400" />
            <span className="text-sm md:text-base">+91 {user?.phoneNumber}</span>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-white mb-3">Skills</h2>
          <div className="flex flex-wrap gap-3">
            {skillsArray?.length > 0 ? (
              skillsArray.map((skill, index) => (
                <Badge
                  key={index}
                  className="bg-blue-900/40 text-blue-300 hover:bg-blue-800/60 text-sm px-3 py-1.5 border border-blue-700"
                >
                  {skill}
                </Badge>
              ))
            ) : (
              <span className="text-gray-400">NA</span>
            )}
          </div>
        </div>

        {/* Resume Section */}
        <div className="mb-8">
          <Label className="text-lg font-semibold text-white mb-2 block">
            Resume
          </Label>
          {isResume ? (
            <a
              target="_blank"
              href={user?.profile?.resume}
              className="text-blue-400 hover:text-blue-300 hover:underline text-sm md:text-base"
            >
             {
                user?.profile?.resumeOriginalName
             }
            </a>
          ) : (
            <span className="text-gray-400">NA</span>
          )}
        </div>
      </div>

      {/* Applied Jobs Section */}
      <div className="max-w-5xl mx-auto bg-gray-800 border border-gray-700 rounded-2xl shadow-md p-8 mb-12">
        <h2 className="text-xl font-semibold text-white mb-4">
          Applied Jobs
        </h2>
        <AppliedJobsTable />
      </div>
      {/* creating an external component for popover*/}
      <UpdateProfile Open={Open} setOpen = {setOpen}/>
    </div>
  );
};

export default Profile;
