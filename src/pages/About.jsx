import React from 'react';
import Navbar from "../components/Navbar";
import { Sun, Battery, Leaf, Users, Award, Zap } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-cover bg-center opacity-20" 
               style={{backgroundImage: "url('https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"}}></div>
          <div className="absolute inset-0 bg-gradient-to-b from-green-600/30 to-green-800/40"></div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 tracking-tight">
              About <span className="text-sky-600">Solar Paddy</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-slate-600">
              Powering a sustainable future with innovative solar solutions.
            </p>
          </div>
        </div>
      </div>
      
      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-10">
              <h2 className="text-3xl font-bold text-slate-800 mb-6">Our Mission</h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                At Solar Paddy, we are passionate about powering the future with clean, reliable, and sustainable energy. As a trusted provider of high-quality solar power equipment, we specialize in offering innovative solutions that meet the energy needs of homes, businesses, and communities.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Founded with a mission to promote energy independence and environmental sustainability, Solar Paddy has grown into a go-to destination for top-tier solar panels, inverters, batteries, and accessories.
              </p>
            </div>
            <div className="md:w-1/2">
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                  alt="Solar panels at sunset" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <span className="inline-block bg-sky-600 rounded-full px-4 py-1 text-sm font-semibold text-white mb-2">Renewable Energy</span>
                  <h3 className="text-xl text-white font-bold">Powering a Brighter Tomorrow</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-yellow-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-800">What We Offer</h2>
            <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
              We partner with leading manufacturers to ensure every product we offer meets the highest standards of efficiency and durability.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-xl">
              <div className="p-8">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
                  <Sun className="h-6 w-6 text-sky-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Solar Panels</h3>
                <p className="text-slate-600">
                  High-efficiency panels designed to capture maximum sunlight and convert it into usable electricity for your home or business.
                </p>
              </div>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-xl">
              <div className="p-8">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
                  <Battery className="h-6 w-6 text-sky-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Energy Storage</h3>
                <p className="text-slate-600">
                  Advanced battery solutions that store excess energy for use during nighttime or cloudy days, ensuring constant power supply.
                </p>
              </div>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-xl">
              <div className="p-8">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
                  <Zap className="h-6 w-6 text-sky-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Inverters & Accessories</h3>
                <p className="text-slate-600">
                  Quality inverters and complete solar system accessories to ensure optimal performance of your renewable energy setup.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800">Our Commitment</h2>
            <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
              Our team is dedicated to guiding customers through every step of their solar journey — from product selection to installation support and after-sales service.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-sky-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Expert Support</h3>
              <p className="text-slate-600">
                Our knowledgeable team provides personalized consultations and ongoing support.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <Award className="h-8 w-8 text-sky-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Quality Assurance</h3>
              <p className="text-slate-600">
                We stand behind every product with comprehensive warranties and quality guarantees.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <Leaf className="h-8 w-8 text-sky-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Sustainability Focus</h3>
              <p className="text-slate-600">
                Our business practices prioritize environmental responsibility at every step.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Join Us in Building a Brighter Future</h2>
          <p className="text-xl text-white mb-8">
            Whether you're looking to reduce your electricity bills, embrace off-grid living, or invest in a greener tomorrow, Solar Paddy is here to help you make it happen.
          </p>
          <button className="bg-white px-8 py-3 rounded-full font-semibold text-lg shadow-lg hover:bg-sky-50 transition-colors">
            Contact Us Today
          </button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-[#2C5530] text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Solar Paddy</h3>
            <p className="text-slate-400 mb-8">Powering a cleaner future — one panel at a time.</p>
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>
          <div className="mt-8 border-t border-slate-800 pt-8 text-center text-sm text-slate-400">
            <p>&copy; {new Date().getFullYear()} Solar Paddy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;