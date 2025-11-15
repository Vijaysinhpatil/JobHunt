import PixelBlast from "@/components/PixelBlast";
import ShinyText from "@/components/ShinyText";
import SplitText from "@/components/SplitText";
import "./hero.css";
import Navbar from "@/shared/Navbar";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/ui/input";
import { Lightbulb } from "lucide-react";
import CategaryCarousel from "./HomeParts/CategaryCarousel";
import LatestJobs from "./HomeParts/LatestJobs";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const Hero = () => {

  
  const navigate = useNavigate();

  const user = true;
  const handleNavigate = () => {
    navigate("/login");
  };

  // handling searched query data

  const [query , setQuery] = useState("")
  
  const dispatch = useDispatch()

  const searchedQueryHandler = () => {

        dispatch(setSearchedQuery(query))

        navigate('/browse')

  }
  return (
    <>
        <div className="relative width-100% h-100vh bg-gradient-to-b from-gray-900 via-black to-gray-800 overflow-hidden">
      <Navbar />
      {/* PixelBlast Background - Fixed positioning covering entire screen */}
      <PixelBlast
        className="absolute top-0 left-0 w-screen h-screen z-0 mt-30"
        variant="circle"
        pixelSize={6}
        color="#B19EEF"
        patternScale={6}
        patternDensity={1.5}
        pixelSizeJitter={0.6}
        enableRipples
        rippleSpeed={0.4}
        rippleThickness={0.12}
        rippleIntensityScale={1.5}
        liquid
        liquidStrength={0.12}
        liquidRadius={1.2}
        liquidWobbleSpeed={5}
        speed={0.6}
        edgeFade={0.25}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 pointer-events-none z-10"></div>

      {/* Navbar */}

      {/* Hero Content */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center px-4 w-full max-w-5xl z-20">
        {/* Title */}
        <SplitText
          text="Find Your Dream Job."
          className="
            text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl
            font-extrabold
            text-white
            bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-300
            bg-clip-text
            text-transparent
            px-2 sm:px-4 py-2
            rounded-3xl
          "
          delay={100}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
        />

        {/* Subtitle */}
        <div className="mt-4 sm:mt-6 md:mt-8">
          <ShinyText
            text="Explore opportunities at top companies and startups. Discover your ideal career path with our comprehensive resources and build the future you deserve."
            speed={1.7}
            className="text-sm sm:text-base md:text-lg font-semibold text-gray-200 leading-relaxed max-w-3xl mx-auto"
          />
        </div>
 
  {

           user ? (
            <div className="mt-8 sm:mt-10 flex justify-center px-2">
                <div className="flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3 sm:px-5 py-2 sm:py-3 w-full max-w-lg sm:max-w-xl shadow-lg">
                  <Input
                    placeholder="Find your dream job..."
                    onChange = {(e) => setQuery(e.target.value)}
                    className="flex-1 bg-transparent text-white placeholder-gray-300 
                   outline-none border-none shadow-none focus:ring-0 focus:outline-none text-sm sm:text-base"
                  />
                  <button

                    onClick={searchedQueryHandler}
                    className="ml-2 sm:ml-3 flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 
                         text-white p-2 sm:p-3 rounded-full hover:scale-105 transition-transform duration-300 cursor-pointer"
                  >
                    <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
           ) : (

             <div className="mt-6 sm:mt-8 flex justify-center gap-4 sm:gap-6">
              <button
                className="relative px-5 sm:px-6 py-2 sm:py-3 rounded-2xl font-semibold text-white text-sm md:text-base overflow-hidden 
                            bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
                            bg-[length:200%_100%] 
                            hover:bg-[position:100%_0] 
                            transition-all duration-500
                            hover:shadow-lg hover:-translate-y-0.5
                            focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50
                            cursor-pointer"
                onClick={handleNavigate}
              >
                Login
              </button>
            </div>
           )
      }
      </div>

        
    </div>

 
    </>


  );
};

export default Hero;
