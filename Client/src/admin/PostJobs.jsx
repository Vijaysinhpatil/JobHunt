import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import store from "@/redux/store";
import Navbar from "@/shared/Navbar";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// const companyArray = [];

const PostJobs = () => {
  const { companies } = useSelector((store) => store.company);
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });

  const [loading , setLoading] = useState(false)
  
  const navigate = useNavigate()

  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const selectChangeHandler = (value) => {
    
    const selectedCompany = companies.find((company) => company?.CompanyName?.toLowerCase() === value)

    setInput({
      ...input ,
      companyId : selectedCompany._id
    })
  }

  const submitHandler = async (e) => {

    e.preventDefault(e);
    // console.log(input);

    try {
      
      setLoading(true)

      const res = await axios.post(`${JOB_API_END_POINT}/postJob` , input , {

        headers : {
          "Content-Type" : "application/json"
        } , 
        withCredentials : true
      })

      console.log("Response => " , res);
      
      if(res.data.success) {
           
        navigate('/admin/jobs')
        toast.success(res.data.message)
      }
        
    } catch (error) {
       toast.error(error.response.data.message)
    } finally{
      setLoading(false)
    }
    
  }
  return (
    <div className="min-h-screen bg-[#0b1b33] text-gray-100">
      <Navbar />

      <div className="flex items-center justify-center w-full px-4 py-10">
        <form 
        onSubmit={submitHandler}
        className="w-full max-w-4xl bg-[#111c2e] border border-gray-700 rounded-2xl shadow-2xl p-8 transition-all duration-300 hover:shadow-blue-900/30">
          <h2 className="text-center text-2xl font-semibold mb-6 text-white">
            Post a New Job
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "Title", name: "title", placeholder: "Title..." },
              {
                label: "Description",
                name: "description",
                placeholder: "Description...",
              },
              {
                label: "Requirements",
                name: "requirements",
                placeholder: "Requirements...",
              },
              {
                label: "Location",
                name: "location",
                placeholder: "Location...",
              },
              { label: "Salary", name: "salary", placeholder: "Salary..." },
              {
                label: "Job Type",
                name: "jobType",
                placeholder: "Job Type...",
              },
              {
                label: "Experience",
                name: "experience",
                placeholder: "Experience...",
                type: "number",
              },
              {
                label: "Position",
                name: "position",
                placeholder: "Position...",
                type: "number",
              },
            ].map(({ label, name, placeholder, type = "text" }) => (
              <div key={name}>
                <Label className="text-gray-300">{label}</Label>
                <Input
                  type={type}
                  name={name}
                  placeholder={placeholder}
                  value={input[name]}
                  onChange={changeEventHandler}
                  className="mt-1 bg-[#1b2a45] border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 text-gray-100 placeholder-gray-400 rounded-md"
                />
              </div>
            ))}
          </div>
          {companies.length > 0 && (
            <Select
             onValueChange = {selectChangeHandler}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a Company" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                <SelectLabel>Company</SelectLabel>
                    {
                        companies.map((company) => {
                            return(
                               <SelectItem value={company?.CompanyName?.toLowerCase()}>{company?.CompanyName}</SelectItem>
                            )
                        })
                    } 
                </SelectGroup>
              </SelectContent>
            </Select>
          )}

           {loading ? (
                        <Button
                          disabled
                          className="w-full flex justify-center items-center bg-gradient-to-r from-blue-600 to-purple-600 
                         text-white font-bold py-3 px-4 rounded-lg cursor-not-allowed"
                        >
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-4 
                         rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 
                         focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 cursor-pointer"
                        >
                          Post New Job
                        </Button>
                      )
            }

          {companies.length === 0 && (
            <p className="text-sm text-red-500 font-bold text-center mt-4">
              Please Register a Company
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJobs;
