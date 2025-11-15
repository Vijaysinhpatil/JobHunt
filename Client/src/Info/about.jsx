import Navbar from "@/shared/Navbar";

const About = () => {
  return (
   <> 
   <Navbar/>

   < section className="bg-gray-900 text-gray-200 py-16 px-6 md:px-20">
       
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Heading + Intro */}
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-white">About Us</h1>
          <p className="text-lg leading-relaxed text-gray-300">
            Welcome to <span className="text-blue-400 font-semibold">JobHunt</span> — 
            a smart platform built to bridge the gap between 
            <span className="text-green-400"> job seekers</span> and 
            <span className="text-green-400"> recruiters</span>. 
            Our mission is to make the hiring process faster, transparent, and more efficient.
          </p>
        </div>

        {/* Mission + Vision */}
        <div className="grid md:grid-cols-2 gap-10 text-center md:text-left">
          <div className="p-6 bg-gray-800 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold text-white mb-3">🎯 Our Mission</h2>
            <p className="text-gray-300">
              To empower every job seeker to find the right opportunity while 
              helping recruiters connect with the best talent effortlessly.
            </p>
          </div>
          <div className="p-6 bg-gray-800 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold text-white mb-3">🚀 Our Vision</h2>
            <p className="text-gray-300">
              To become the most trusted and transparent platform where 
              careers grow and companies find their perfect match.
            </p>
          </div>
        </div>

        {/* Features */}
        <div>
          <h2 className="text-3xl font-bold text-center text-white mb-10">Why Choose JobHunt?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="p-6 bg-gray-800 rounded-xl hover:bg-gray-700 transition">
              ✅ <h3 className="font-semibold text-xl mt-2">Fast Job Search</h3>
              <p className="text-gray-400 mt-2">Find relevant jobs in seconds with our smart search.</p>
            </div>
            <div className="p-6 bg-gray-800 rounded-xl hover:bg-gray-700 transition">
              💼 <h3 className="font-semibold text-xl mt-2">Direct Connection</h3>
              <p className="text-gray-400 mt-2">Chat directly with recruiters — no middlemen.</p>
            </div>
            <div className="p-6 bg-gray-800 rounded-xl hover:bg-gray-700 transition">
              🔒 <h3 className="font-semibold text-xl mt-2">Verified Listings</h3>
              <p className="text-gray-400 mt-2">We ensure all job posts are authentic & secure.</p>
            </div>
            <div className="p-6 bg-gray-800 rounded-xl hover:bg-gray-700 transition">
              🌍 <h3 className="font-semibold text-xl mt-2">Global Reach</h3>
              <p className="text-gray-400 mt-2">Discover opportunities from startups to MNCs.</p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gray-800 py-10 px-6 rounded-xl shadow text-center grid md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-4xl font-bold text-blue-400">100+</h3>
            <p className="text-gray-400">Jobs Posted</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-green-400">50+</h3>
            <p className="text-gray-400">Recruiters Joined</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-yellow-400">200+</h3>
            <p className="text-gray-400">Job Seekers Connected</p>
          </div>
        </div>

        
      </div>
    </section>
   </>
    
  );
};

export default About;
