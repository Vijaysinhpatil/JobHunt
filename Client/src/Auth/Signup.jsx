import { Button } from '@headlessui/react';
import { Input } from '../components/ui/input';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import store from '@/redux/store';
import { setLoading } from '../redux/authSlice';
const Signup = () => {

  const dispatch = useDispatch()

  const {loading} = useSelector((store) => store.auth)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    file : null,
    role: ""
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("FormData =>", formData);

    //converting data to formData or appending FormData

    const Data = new FormData();
    Data.append("fullname" , formData.name);
    Data.append("email" , formData.email)
    Data.append("phoneNumber" , formData.phoneNumber);
    Data.append("password" , formData.password)
    Data.append("role", formData.role)

    if(formData.file)
    {
       
        Data.append("file" , formData.file)
       
    }

    // API call

    try {
      
      dispatch(setLoading(true))
      const res = await axios.post(`${USER_API_END_POINT}/register` , Data , {

        headers : {
          "Content-Type" : "multipart/form-data"
        },
        withCredentials : true
      })

      if(res.data.success)
      {
          toast.success(res.data.message)
           navigate('/login')
      }
    } catch (error) {
      
      console.log("Error => " , error);
      toast.error(res.data.error || "Error => ")
    } finally {
      dispatch(setLoading(false))
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-center">
          <h1 className="text-3xl font-bold text-white">Join JobHunt</h1>
          <p className="text-blue-100 mt-2">Create your account and find your dream job</p>
        </div>
        
        {/* Form Section */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Input 
                type="text" 
                name="name"
                placeholder="Full Name" 
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <Input 
                type="email" 
                name="email"
                placeholder="Email Address" 
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <Input 
                type="tel" 
                name="phoneNumber"
                placeholder="Phone Number" 
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <Input 
                type="password" 
                name="password"
                placeholder="Password" 
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Role Selection - Improved Radio Buttons */}
            <div className="pt-2">
              <label className="block text-sm font-medium text-gray-300 mb-3">
                I am a:
              </label>
              <div className="flex space-x-6">
                <label className="flex items-center cursor-pointer">
                  <div className="relative">
                    <Input
                      type="radio"
                      name="role"
                      checked={formData.role === "student"}
                      onChange={handleChange}
                      value="student"
                      className="sr-only" // Hide the default radio button
                    />
                    <div className={`w-5 h-5 flex items-center justify-center rounded-full border-2 ${formData.role === "student" ? 'border-blue-500' : 'border-gray-500'} transition-colors`}>
                      <div className={`w-2.5 h-2.5 rounded-full ${formData.role === "student" ? 'bg-blue-500' : 'bg-transparent'} transition-colors`}></div>
                    </div>
                  </div>
                  <span className="ml-2 text-gray-300">Student</span>
                </label>
                
                <label className="flex items-center cursor-pointer">
                  <div className="relative">
                    <Input
                      type="radio"
                      name="role"
                      checked={formData.role === "recruiter"}
                      onChange={handleChange}
                      value="recruiter"
                      className="sr-only" // Hide the default radio button
                    />
                    <div className={`w-5 h-5 flex items-center justify-center rounded-full border-2 ${formData.role === "recruiter" ? 'border-blue-500' : 'border-gray-500'} transition-colors`}>
                      <div className={`w-2.5 h-2.5 rounded-full ${formData.role === "recruiter" ? 'bg-blue-500' : 'bg-transparent'} transition-colors`}></div>
                    </div>
                  </div>
                  <span className="ml-2 text-gray-300">Recruiter</span>
                </label>
              </div>
            </div>
            
            <div className="pt-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">Upload Profile Pic</label>
              <div className="relative border-2 border-dashed border-gray-600 rounded-lg p-4 bg-gray-700 hover:border-blue-500 transition-colors">
                <Input 
                  type="file" 
                  name="file"
                  onChange={handleChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept="image/*"
                  required
                />
                <div className="text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex text-sm text-gray-400">
                    <span className="relative font-medium text-blue-400 hover:text-blue-300">Upload a file</span>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-400">PDF, DOC, DOCX up to 10MB</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded bg-gray-700"
                required
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-300">
                I agree to the <a href="#" className="font-medium text-blue-400 hover:text-blue-300">Terms</a> and <a href="#" className="font-medium text-blue-400 hover:text-blue-300">Privacy Policy</a>
              </label>
            </div>
            
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
                Create Account
              </Button>
            )}
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-blue-400 hover:text-blue-300">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;