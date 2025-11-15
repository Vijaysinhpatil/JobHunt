import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useGetCompanyById from "@/Hooks/useGetCompanyById";
import { setLoading } from "@/redux/authSlice";
import store from "@/redux/store";
import Navbar from "@/shared/Navbar";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { ArrowLeft, Signal } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";


const CompanySetup = () => {
  const { loading } = useSelector((store) => store.auth);
  const { singleCompany } = useSelector((store) => store.company)
  const dispatch = useDispatch()
  const params = useParams(); 
  const navigate = useNavigate()

  console.log("Param Id => " , params.id);
  
  
     useGetCompanyById(params.id)
  // Form data handling
  const [input , setInput] = useState({

    name : "",
    description : "",
    website : "",
    location : "",
    file : null

  })

  const changeEventHandler = (e) => {

    const { name , value} = e.target;

    setInput({
      ...input , [name] : value
    })
  }

  const fileEventHandler = (e) => {

    const file = e.target.files?.[0];
    setInput({
      ...input , file
    })

  }

  const submitHandler = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name" , input.name);
    formData.append("description" , input.description)
    formData.append("website" , input.website)
    formData.append("location" , input.location)

    if(input.file)
    {
      formData.append("file" , input.file)
    }
    console.log("Input Data" , input);


    // api call for update Company details 
    
    try {

   setLoading(true)
      const res = await axios.put(`${COMPANY_API_END_POINT}/Update/${params.id}` , formData , {
        headers : {
          "Content-Type" : "multipart/form-data"
        }, 
        withCredentials : true
      })

      if(res.data.success){
        toast.success(res.data.message)
        navigate('/admin/companies')

      }
    } catch (error) {
      console.log("Error while Compnay setup");
      toast.error(error.response.data.message)
    }finally{
   setLoading(false)
    }
  }


   useEffect(() => {
  console.log("🔍 Single Company:", singleCompany);

       setInput({
        name : singleCompany?.CompanyName || "",
        description : singleCompany?.description || "",
        website : singleCompany?.website || "",
        location : singleCompany?.location || "",
        file : singleCompany?.file || null
       })
   },[singleCompany])
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-100">
      <Navbar />

      <div className="max-w-3xl mx-auto my-12 p-8 bg-gray-900/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-800">
        <form onSubmit={submitHandler}>
          {/* Header */}
          <div className="flex items-center gap-4 mb-10">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/admin/companies')}
              className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>
            <h1 className="text-2xl font-extrabold tracking-wide text-white">
              Company Setup
            </h1>
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <Label className="text-gray-300">Company Name</Label>
              <Input
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
                className="bg-gray-800 border-gray-700 text-gray-100 focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-gray-300">Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="bg-gray-800 border-gray-700 text-gray-100 focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-gray-300">Website</Label>
              <Input
                type="text"
                name="website"
                value={input.website}
                onChange={changeEventHandler} 
                className="bg-gray-800 border-gray-700 text-gray-100 focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-gray-300">Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="bg-gray-800 border-gray-700 text-gray-100 focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div className="flex flex-col gap-2 md:col-span-2">
              <Label className="text-gray-300">Logo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={fileEventHandler}
                className="bg-gray-800 border-gray-700 text-gray-100 file:bg-indigo-600 file:text-white file:border-0 file:px-4 file:py-2 hover:file:bg-indigo-500"
              />
            </div>
          </div>

          {/* Submit */}
          {/* Submit Button with Loading State */}
          <div className="mt-10 flex justify-end">
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
                Create Company
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
