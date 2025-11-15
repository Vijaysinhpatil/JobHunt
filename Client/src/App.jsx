
import { useEffect } from "react"
import { createBrowserRouter } from "react-router-dom"
import { RouterProvider } from "react-router"
import Login from "./Auth/Login"
import Signup from "./Auth/Signup"
import About from "./Info/about"
import Contact from "./Info/contact"
import MainHero from "./MainHero/MainHero"
import Jobs from "./Jobs"
import Browse from "./Browse"
import Profile from "./Profile/Profile"
import JobDetails from "./JobInfo/JobDetails"
import UpdateProfile from "./Profile/UpdateProfile"
import Companies from "./admin/Companies"
import CompanyCreation from "./admin/CompanyCreation"
import  CompanySetup  from "./admin/CompanySetup"
import AdminJobs from "./admin/AdminJobs"
import PostJobs from "./admin/Postjobs"
import Applicants from "./admin/Applicants"

function App() {

  useEffect(() => {

    const link = document.createElement('link')
    link.href =  "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
    document.head.append(link)
  } , [])


  const appRouter = createBrowserRouter([

    //student side routing

    {
       path : '/',
       element :<MainHero/>
    },
    {
      path : '/login',
      element : <Login/>
    },
    {
      path : "/signup",
      element : <Signup/>
    },
    {
      path : "/about",
      element : <About/>
    },
    {
      path : '/contact',
      element : <Contact/>
    },
    {
      path : '/jobs',
      element : <Jobs/>
    },
    {
      path : '/browse',
      element : <Browse/>
    },
    {
      path : '/profile',
      element : <Profile/>
    },
    {
      path : "/details/:id",
      element : <JobDetails/>
    },
    {
      path : "/updateProfile",
      element : <UpdateProfile/>
    },
    // admin side routing
    {
      path : '/admin/companies',
      element : <Companies/>
    },
    {
      path : '/admin/companies/create',
      element : <CompanyCreation/>
    },
    {
      path : '/admin/companies/:id',
      element : <CompanySetup/>
    },
    {
      path : '/admin/jobs',
      element : <AdminJobs/>
    },
    {
      path : '/admin/jobs/create',
      element : <PostJobs/>
    },
    {
      path : '/admin/jobs/:id/applicants',
      element : <Applicants/>
    }

  ])

  return (
       <div style={{ fontFamily : "'Poppins' , sans-serif"}}>
          
          <RouterProvider router={appRouter}/>


       </div>
      
  )
}

export default App
