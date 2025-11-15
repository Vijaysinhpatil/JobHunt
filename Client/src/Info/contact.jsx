import Navbar from '@/shared/Navbar';
import { Input } from '../components/ui/input';
import { Mail, Phone, Linkedin, Github, Instagram } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';
import { CONTACT_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const Contact = () => {


  const [input , setInput] = useState({

    name : "",
    email : "",
    message : "",

  })

  const handleChange = (e) => {

    const { name , value } = e.target;

    setInput(prev => ({
      ...prev ,
      [name] : value
    }))
  }

  const handleSubmit = async(e) => {


    e.preventDefault()
   

    try {
      
      const res = await axios.post(`${CONTACT_API_END_POINT}/feedback` , input , {
        headers : {
          "Content-Type" : "application/json"
        },
        withCredentials : true
      })

      console.log("Response" , res);

      if(res.data.success)
      {
        toast.success(res.data.message)

      }
    } catch (error) {
       console.log("Error => " , error);
      toast.error(error?.response?.data?.message || "Something went wrong")
    }
  }

  return (
    <>
    <Navbar/>
    <section className="bg-gray-900 text-gray-200 w-full min-h-screen flex items-center justify-center px-6 md:px-20">
      <div className="max-w-4xl w-full space-y-12">
        {/* Heading */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">Contact Us</h1>
          <p className="text-lg text-gray-300">
            Have questions or want to post a job? Reach out to us today!
          </p>
        </div>

        {/* Form + Contact Info */}
        <div className="flex flex-col md:flex-row gap-12 justify-center items-center">
          {/* Contact Form */}
          <form
           onSubmit={handleSubmit}
          className="flex-1 space-y-6 bg-gray-800 p-8 rounded-xl shadow-lg">
            <Input
              type="text"
              name = "name"
              value={input.name}
              onChange={handleChange}
              placeholder="Enter Name"
              className="w-full bg-gray-700 text-white placeholder-gray-400 border-none"
            />
            <Input
              type="email"
              placeholder="Enter Email"
              name = "email"
              value = {input.email}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white placeholder-gray-400 border-none"
            />
            <textarea
              placeholder="Your Message"
              name='message'
              value={input.message}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white placeholder-gray-400 p-3 rounded-lg resize-none border-none h-32"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg shadow-md transition"
            >
              Send Message
            </button>
          </form>

          {/* Contact Info */}
          <div className="flex-1 space-y-6 flex flex-col items-center text-center">
            <h2 className="text-2xl font-semibold text-white">Get in Touch</h2>
            <div className="flex items-center gap-3 text-gray-300">
              <Mail className="text-blue-400" /> 
              <span>vijaysinhpatil28@gmail.com</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <Phone className="text-green-400" /> 
              <span>+91 7619179674</span>
            </div>

            <h3 className="text-xl font-semibold text-white mt-6">Follow Us</h3>
            <div className="flex items-center gap-4 mt-2 text-gray-300 justify-center">
              <a href="https://www.linkedin.com/in/vijaysinh-patil-4a8a81278/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="hover:text-blue-500 transition" />
              </a>
              <a href="https://github.com/Vijaysinhpatil" target="_blank" rel="noopener noreferrer">
                <Github className="hover:text-gray-100 transition" />
              </a>
              <a href="https://www.instagram.com/vijaysinh17_/" target="_blank" rel="noopener noreferrer">
                <Instagram className="hover:text-blue-400 transition" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>

  );
};

export default Contact;
