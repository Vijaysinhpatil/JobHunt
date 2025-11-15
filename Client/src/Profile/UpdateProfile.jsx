import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import store from '@/redux/store'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { setLoading, setUser } from '@/redux/authSlice'

const UpdateProfile = ({ Open, setOpen }) => {
  // const [loading, setLoading] = useState(false)
  const { loading , user } = useSelector(store => store.auth)

  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    bio: "",
    skills: "",
    file: "", 
  });
  
    // 👇 This will run when `user` becomes available in Redux
  useEffect(() => {
    if (user) {
      setInput({
        fullname: user.fullname || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        bio: user.profile?.bio || "",
        skills: user.profile?.skills?.join(", ") || "",
        file: null,
      });
    }
  }, [user]);

  // getting updated User

  const dispatch = useDispatch()
console.log("Redux user data:", user);

  console.log(input);
  
  // Fixed: Added 'e' parameter and capital 'C' in onChange
  const handleChange = (e) => {
    setInput({
      ...input, [e.target.name]: e.target.value
    })
  }

  // Separate handler for file
  const handleFileChange = (e) => {
    setInput({
      ...input, file: e.target.files?.[0]
    })
  }
  const submitHandler = async(e) => {
    e.preventDefault();

    // Api Call

    const formdata = new FormData()
    
    formdata.append("fullname" , input.fullname)
    formdata.append("email" , input.email)
    formdata.append("phoneNumber" , input.phoneNumber)
    formdata.append("skills" , input.skills)
    formdata.append("bio",input.bio)
    
    if(input.file)
    {
      formdata.append("file" , input.file)
    }

    try {
      dispatch(setLoading(true))
      const res = await axios.post(`${USER_API_END_POINT}/updateProfile` , formdata , {
        headers : {
          "Content-Type" : 'multipart/form-data'
        },
        withCredentials : true
      })

      if(res.data.success)
      {
        dispatch(setUser(res.data.user))
         toast.success(res.data.message || "successfully Updated profile")
         setOpen(false)
        }
    } catch (error) {
      
      console.log("Error");
      toast.error(error.response.data.message || "Error While updating profile")
      
    }finally{
      dispatch(setLoading(false))
    }
   
    console.log("Input Deatails => " , input);
    
  }

  return (
    <Dialog open={Open} onOpenChange={setOpen}>
      <DialogContent className="bg-gray-900 text-gray-100 rounded-xl shadow-lg max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">Update Profile</DialogTitle>
        </DialogHeader>

        <form onSubmit={submitHandler} className="space-y-6 py-4">
          {/* Name */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right text-gray-300 font-medium">Name</Label>
            <Input
              id="name"
              name="fullname"  // Changed to match state
              value={input.fullname}
              onChange={handleChange}  // Fixed: capital C
              className="col-span-3 bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 rounded-md"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right text-gray-300 font-medium">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={input.email}
              onChange={handleChange}  // Added
              className="col-span-3 bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 rounded-md"
              placeholder="Enter your email"
            />
          </div>

          {/* Number */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phoneNumber" className="text-right text-gray-300 font-medium">Number</Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"  // Changed to match state
              type="tel"
              value={input.phoneNumber}
              onChange={handleChange}  // Added
              className="col-span-3 bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 rounded-md"
              placeholder="Enter your phone number"
            />
          </div>

          {/* Bio */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="bio" className="text-right text-gray-300 font-medium">Bio</Label>
            <Input
              id="bio"
              name="bio"
              value={input.bio}
              onChange={handleChange}  // Added
              className="col-span-3 bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 rounded-md"
              placeholder="Write a short bio"
            />
          </div>

          {/* Skills */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="skills" className="text-right text-gray-300 font-medium">Skills</Label>
            <Input
              id="skills"
              name="skills"
              value={input.skills}
              onChange={handleChange}  // Added
              className="col-span-3 bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 rounded-md"
              placeholder="e.g., JavaScript, React, Node.js"
            />
          </div>

          {/* Resume Upload */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="file" className="text-right text-gray-300 font-medium">Resume</Label>
            <Input
              id="file"
              type="file"
              name="file"
              onChange={handleFileChange}  // Changed handler
              accept="application/pdf"
              className="col-span-3 bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 rounded-md"
            />
          </div>
          <DialogFooter className="flex justify-end gap-3 pt-4">
          {loading ? (
            <Button
              disabled
              className="w-full flex justify-center items-center bg-gradient-to-r from-blue-600 to-purple-600 
               text-white font-bold py-3 px-4 rounded-lg cursor-not-allowed"
            >
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </Button>
          ) : (
            <>
              <Button
                variant="outline"
                className="border-gray-600 text-gray-600 hover:bg-gray-800 hover:text-white cursor-pointer"
                onClick={() => setOpen(false)}
                type="button"
              >
                Cancel
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                type="submit"
                
              >
                Save Changes
              </Button>
            </>
          )}
        </DialogFooter>
        </form>

        
      </DialogContent>
    </Dialog>
  )
}

export default UpdateProfile