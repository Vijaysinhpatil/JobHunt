import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const CategoryCarousel = () => {
  const categories = [
    "Frontend Developer",
    "Fullstack Developer",
    "Backend Developer",
    "AI/ML Engineer",
    "Data Analyst",
    "UI/UX Designer",
    "Cloud Engineer",
    "Mobile Developer",
  ];

    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const searchedQueryHandler = (query) => {
  
          dispatch(setSearchedQuery(query))
  
          navigate('/browse')
  
    }
  return (
    <div className="relative w-full bg-black py-12 sm:py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-8 sm:mb-10 md:mb-12 text-center">
          🔥 Popular Job Categories
        </h2>

        {/* Carousel Container */}
        <div className="relative px-6 sm:px-8 md:px-12 lg:px-16">
          <Carousel className="w-full cursor-grab">
            <CarouselContent className="-ml-3 sm:-ml-4 md:-ml-6 transition-transform duration-500 ease-out">
              {categories.map((category, idx) => (
                <CarouselItem
                  key={idx}
                  className="pl-3 sm:pl-4 md:pl-6 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <div className="p-1">
                    <Button
                      variant="secondary"
                      onClick = {() => searchedQueryHandler(category)}
                      className="w-full h-10 sm:h-24 md:h-15 
                                 text-sm sm:text-base md:text-lg font-semibold 
                                 rounded-2xl
                                 bg-gradient-to-br from-black/60 to-black/40 
                                 backdrop-blur-md 
                                 border border-white/10 
                                 text-white
                                 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500
                                 hover:border-transparent
                                 hover:scale-105
                                 hover:shadow-xl hover:shadow-purple-500/40
                                 transition-all duration-300 ease-out
                                 shadow-md"
                    >
                      {category}
                    </Button>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation Arrows */}
            <CarouselPrevious
              className="absolute -left-12 sm:-left-14 md:-left-16 
                         top-1/2 -translate-y-1/2 
                         w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14
                         bg-gradient-to-br from-purple-500/80 to-pink-500/80
                         hover:from-purple-600 hover:to-pink-600
                         text-white flex items-center justify-center
                         border border-white/20
                         rounded-full 
                         shadow-lg hover:shadow-xl
                         hover:scale-110
                         transition-all duration-300 ease-out"
            />
            <CarouselNext
              className="absolute -right-12 sm:-right-14 md:-right-16 
                         top-1/2 -translate-y-1/2 
                         w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14
                         bg-gradient-to-br from-purple-500/80 to-pink-500/80
                         hover:from-purple-600 hover:to-pink-600
                         text-white flex items-center justify-center
                         border border-white/20
                         rounded-full 
                         shadow-lg hover:shadow-xl
                         hover:scale-110
                         transition-all duration-300 ease-out"
            />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default CategoryCarousel;
