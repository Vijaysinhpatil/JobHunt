import Navbar from "@/shared/Navbar";
import { ApplicantsTable } from "./ApplicantsTable";
import { useEffect } from "react";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { data, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "@/redux/applicationslice";
import { toast } from "sonner";
// import { toast } from "sonner";

const Applicants = () => {

    const params = useParams()
    const JobId = params.id
    const dispatch = useDispatch()

    const { applicants  } = useSelector(store => store.application)
    console.log("Param or Jobid =>" , JobId);
    

    useEffect(() => {

        const fetchAllApplicants = async() => {

          try {
            
            const res = await axios.get(`${APPLICATION_API_END_POINT}/${JobId}/getApplicant` , {
              withCredentials : true
            })

            console.log("Response => " , res.data);

            if(res.data.success)
            {
              dispatch(setAllApplicants(res.data.job))
            }
          } catch (error) {
            console.log("Error while fetching applicants data" , error);  
          }
        }
        fetchAllApplicants()
    } , [])
  return (
    <div className="min-h-screen bg-gray-950 text-gray-200">
      {/* Navbar */}
      <Navbar />

      {/* Page Wrapper */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <h1 className="text-2xl font-semibold tracking-wide text-white">
            Applicants <span className="text-gray-400"> ({applicants?.applications?.length || 0})</span>
          </h1>

          {/* filter/sort placeholder for future use */}
          <div className="mt-4 sm:mt-0">
            <button className="px-4 py-2 text-sm bg-gray-800 text-gray-300 rounded-md hover:bg-gray-700 transition">
              Filter
            </button>
          </div>
        </div>

        {/* Applicants Table */}
        <section className="rounded-xl border border-gray-800 bg-gray-900/60 backdrop-blur-md shadow-lg">
          <ApplicantsTable />
        </section>
      </main>
    </div>
  );
};

export default Applicants;
