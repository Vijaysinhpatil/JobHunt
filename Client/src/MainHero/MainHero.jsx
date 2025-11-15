import Hero from "@/Home/hero";
import CategoryCarousel from "@/Home/HomeParts/CategaryCarousel";
import Footer from "@/Home/HomeParts/Footer";
import LatestJobs from "@/Home/HomeParts/LatestJobs";
import { useGetAllJobs } from "@/Hooks/useGetAllJobs";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MainHero = () => {

    const { user } = useSelector(store => store.auth)
    const navigate = useNavigate()
    useEffect(() => {

        if(user?.role === 'recruiter'){
              navigate('/admin/companies')
        }
    } , [])
    useGetAllJobs()
    return(
        <div className="min-w-screen min-h-screen bg-black">
              <Hero/>
              <CategoryCarousel/>
              <LatestJobs/>
              <Footer/>
        </div>
    )
}
export default MainHero;