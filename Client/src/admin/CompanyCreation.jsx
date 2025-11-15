import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { setSingleCompany } from '@/redux/companySlice'
import Navbar from '@/shared/Navbar'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const CompanyCreation = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // Register New Company
  const [companyName , setNewCompanyName] = useState()
  const registerNewCompany = async() => {

    try {
      
      const res = await axios.post(`${COMPANY_API_END_POINT}/registerCompany` , {CompanyName : companyName} , {
        headers : {
          "Content-Type" : 'application/json'
        },
        withCredentials : true
      })

      if(res?.data?.success)
      {
        dispatch(setSingleCompany(res.data.company))
        toast.success(res.data.message)
        const companyId = res?.data?.company?._id 
        navigate(`/admin/companies/${companyId}`)
      }
    } catch (error) {
      
      console.log("Error =>", error.response || error.message || error);
      
    }
  }
  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      
      <div className="max-w-3xl mx-auto mt-16 bg-gray-800 p-8 rounded-2xl shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Your Company Name</h1>
          <p className="text-gray-300">
           Your companys name is the first step toward building your brand. You can always edit it later.
           </p>
        </div>

        <div className="mb-6">
          <Label className="text-gray-200 font-medium mb-2 block">
            Company Name
          </Label>
          <Input
            type="text"
            onChange={(e) => setNewCompanyName(e.target.value)}
            placeholder="Jobhunt, JPMorgan etc..."
            className="w-full border-gray-600 bg-gray-700 text-white focus:border-blue-500 focus:ring focus:ring-blue-400 rounded-lg p-3 mt-4"
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            className="bg-gray-700 text-gray-200 border-gray-500 hover:bg-gray-600"
            onClick={() => navigate('/admin/companies')}
          >
            Cancel
          </Button>
          <Button 
          onClick={registerNewCompany}
          className="bg-blue-600 text-white hover:bg-blue-700">
            Continue
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CompanyCreation
