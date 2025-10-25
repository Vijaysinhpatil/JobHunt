import { Button } from "@headlessui/react";
import { Input } from "../components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../redux/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);
  const { loginWithRedirect } = useAuth0();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting:", formData);


   

    try {
      dispatch(setLoading(true));

      
      // ✅ Send as JSON, not FormData
      const res = await axios.post(
        `${USER_API_END_POINT}/login`,
        {
          email: formData.email,
          password: formData.password,
          role: formData.role,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        navigate("/");
      } else {
        toast.error(res.data.message || "Login failed");
      }
    } catch (error) {
      console.log("Error => ", error);
      toast.error(error.response?.data?.error || "Error while Logging");
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Google login handler
  const handleGoogleLogin = () => {
    loginWithRedirect();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-center">
          <h1 className="text-3xl font-bold text-white">Join JobHunt</h1>
          <p className="text-blue-100 mt-2">
            Login to your account and find your dream job
          </p>
        </div>

        {/* Form Section */}
        <div className="p-6">
          {/* Google Login Button */}
          <div className="mb-6">
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 font-medium py-3 px-4 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Login with Google
            </button>
          </div>

          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-600"></div>
            <span className="mx-4 text-gray-400">or</span>
            <div className="flex-grow border-t border-gray-600"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
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
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Role Selection */}
            <div className="pt-2">
              <label className="block text-sm font-medium text-gray-300 mb-3">
                I am a:
              </label>
              <div className="flex space-x-6">
                <label className="flex items-center cursor-pointer">
                  <Input
                    type="radio"
                    name="role"
                    value="student"
                    checked={formData.role === "student"}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 flex items-center justify-center rounded-full border-2 ${
                      formData.role === "student"
                        ? "border-blue-500"
                        : "border-gray-500"
                    } transition-colors`}
                  >
                    <div
                      className={`w-2.5 h-2.5 rounded-full ${
                        formData.role === "student"
                          ? "bg-blue-500"
                          : "bg-transparent"
                      } transition-colors`}
                    ></div>
                  </div>
                  <span className="ml-2 text-gray-300">Student</span>
                </label>

                <label className="flex items-center cursor-pointer">
                  <Input
                    type="radio"
                    name="role"
                    value="recruiter"
                    checked={formData.role === "recruiter"}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 flex items-center justify-center rounded-full border-2 ${
                      formData.role === "recruiter"
                        ? "border-blue-500"
                        : "border-gray-500"
                    } transition-colors`}
                  >
                    <div
                      className={`w-2.5 h-2.5 rounded-full ${
                        formData.role === "recruiter"
                          ? "bg-blue-500"
                          : "bg-transparent"
                      } transition-colors`}
                    ></div>
                  </div>
                  <span className="ml-2 text-gray-300">Recruiter</span>
                </label>
              </div>
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
                Login
              </Button>
            )}
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-blue-400 hover:text-blue-300"
              >
                Signup
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
