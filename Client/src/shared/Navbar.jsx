import React, { useState, useEffect } from "react";
import { Rocket, BriefcaseBusiness, User2 } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { AvatarImage, Avatar } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import { LogOut } from "lucide-react";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import { setUser } from "../redux/authSlice";

const Navbar = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch()
 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Apply dark mode to document
  // useEffect(() => {
  //   if (darkMode) {
  //     document.documentElement.classList.add('dark');
  //   } else {
  //     document.documentElement.classList.remove('dark');
  //   }
  // }, [darkMode]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLoginNavigate = () => {
    navigate("/login");
  };

  const handleSignupNavigate = () => {
    navigate("/signup");
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Jobs", path: "/jobs" },
    { name: "Browse", path: "/browse" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Companies", path:'/admin/companies'},
    { name: "adminJobs", path:'/admin/jobs'}
  ];

  const handlelogout = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
           dispatch(setUser(null));
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      console.log("Eror", error);
    }
  };

 
  const {user} = useSelector(store => store.auth)
  return (
    <nav
      className={`w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-gray-900 shadow-lg py-2" : "bg-gray-900 py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}

          <div className="flex items-center gap-1">
            <div className="text-white ">
              <BriefcaseBusiness />
            </div>
            <span className="text-white text-xl font-bold">
              Job<span className="text-blue-400">Hunt</span>
            </span>
          </div>

          {/* Desktop Navigation */}
         {/* Desktop Navigation */}
<div className="hidden md:flex items-center space-x-8">
  {navItems
    .filter((item) => {
      // If user is a recruiter, show only recruiter-specific links
      if (user?.role === "recruiter") {
        return ["Companies", "adminJobs", "About", "Contact"].includes(item.name);
      }

      // If user is a student (or not logged in), hide recruiter-only links
      return !["Companies", "adminJobs"].includes(item.name);
    })
    .map((item) => (
      <Link
        key={item.name}
        to={item.path}
        className="text-gray-300 hover:text-white transition-colors duration-300 font-medium"
      >
        {item.name}
      </Link>
    ))}
</div>


          {/* Auth Buttons - Desktop */}
          { user ? (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer border-2 border-gray-600 hover:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md">
                  <AvatarImage src={user?.profile?.profilePhoto}/>
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className="w-64 p-4 bg-gray-800 border border-gray-700 shadow-xl rounded-xl">
                {/* User Info Section */}
                <div className="flex items-center gap-3 pb-3 border-b border-gray-700">
                  <Avatar className="border-2 border-blue-400">
                    <AvatarImage src={user?.profile?.profilePhoto} />
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-white text-sm truncate">
                      {user?.fullname}
                    </h4>
                    <p className="text-gray-400 text-xs truncate">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>

{/* conditional rendering for admin */}
{
      user && user.role === 'student' ? (
           <Link to="/profile">
                    <div className="flex items-center gap-2 p-2 rounded-md hover:bg-blue-700 transition-colors duration-150 cursor-pointer group">
                      <User2 className="w-4 h-4 text-gray-400 group-hover:text-white" />
                      <Button
                        variant="link"
                        className="p-0 h-auto font-normal text-gray-200 group-hover:text-white cursor-pointer"
                      >
                        View Profile
                      </Button>
                    </div>
                  </Link>
      ) : (null)
}
                {/* Navigation Links */}
                <div className="pt-3">
                  {user ? (
                    <Link to="/">
                      <div className="flex items-center gap-2 p-2 rounded-md hover:bg-red-600 transition-colors duration-150 cursor-pointer group mt-1">
                        <LogOut className="w-4 h-4 text-gray-400 group-hover:text-white" />
                        <Button
                          variant="link"
                          className="p-0 h-auto font-normal text-gray-200 group-hover:text-white"
                          onClick={handlelogout}
                        >
                          Logout
                        </Button>
                      </div>
                    </Link>
                  ) : (
                    <div className="hidden md:flex items-center space-x-4">
                      <button
                        onClick={handleSignupNavigate}
                        className="text-gray-300 hover:text-white transition-colors duration-300 font-medium"
                      >
                        Signup
                      </button>
                      <button
                        onClick={handleLoginNavigate}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-300 font-medium flex gap-1"
                      >
                        Get Started <Rocket />
                      </button>
                    </div>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={handleSignupNavigate}
                className="text-gray-300 hover:text-white transition-colors duration-300 font-medium"
              >
                Signup
              </button>
              <button
                onClick={handleLoginNavigate}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-300 font-medium flex gap-1"
              >
                Get Started <Rocket />
              </button>
            </div>
          )}

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors duration-300"
              aria-label="Toggle dark mode"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
            <button
              onClick={toggleMenu}
              className="text-gray-300 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <span className="text-2xl">✕</span>
              ) : (
                <span className="text-2xl">☰</span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? "max-h-96 opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="py-4 space-y-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.path}
                className="block text-gray-300 hover:text-white transition-colors duration-300 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="pt-4 border-t border-gray-700 space-y-3">
              <button
                onClick={handleSignupNavigate}
                className="block w-full text-left text-gray-300 hover:text-white transition-colors duration-300 font-medium py-2"
              >
                Signup
              </button>
              <button
                onClick={handleLoginNavigate}
                className="bg-blue-500 hover:bg-blue-600 text-white w-full py-2 rounded-md transition-colors duration-300 font-medium"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
