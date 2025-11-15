import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import useGetAllCompanies from "@/Hooks/useGetAllCompanies"
import Navbar from "@/shared/Navbar"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import AdminJobsTable from "./AdminJobsTable"
import { setSearchJobByText } from "@/redux/jobSlice"

const AdminJobs = () => {
   

  const [input , setInput] = useState("")

  const dispatch = useDispatch()
  
  useEffect(() => {
     dispatch(setSearchJobByText(input))
  } , [input])

  const navigate = useNavigate()

  useGetAllCompanies()
    return(
        <div className="min-h-screen bg-gray-900 text-gray-100">
      <Navbar />

      <div className="max-w-6xl mx-auto mt-10 p-6 bg-gray-900 shadow-lg rounded-2xl border border-gray-700">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-semibold text-white tracking-wide">
            Companies
          </h2>

          <div className="flex w-full sm:w-auto items-center gap-3">
            <Input
              placeholder="🔍 Search by company name..."
              onChange={(e) => setInput(e.target.value)}
              className="sm:w-64 bg-[#1E1E2E] border-gray-600 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />
            <Button
              className="bg-indigo-600 hover:bg-indigo-700 transition-colors font-medium"
              onClick={() => navigate("/admin/jobs/create")}
            >
              Post Jobs
            </Button>
          </div>
        </div>

        {/* Table Section */}
        <div className="rounded-lg border border-gray-700 bg-[#232334] shadow-md overflow-hidden">
            <AdminJobsTable/>
        </div>
      </div>
    </div>
    )
}

export default AdminJobs;