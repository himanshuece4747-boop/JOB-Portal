import React from "react";
import { motion } from "framer-motion";

import { Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const isAuthenticated = true;
    const user = { fullName: "Alex", role: "employer" };
    const navigate = useNavigate();

    return <header>
        <div className="container mx-auto px-4">
            <div className="flex item-center justify-between h-16">
                {/* logo */}
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify">
                        <Briefcase className="w-5 h-5 text-white" />
                    </div>
                    
                    <samp className="text-xl font-bold text-gray-900">jobPortal</samp>
                </div>

                {/* Navigation Link - Hidden on mobile */}
                <nav className="hidden md:flex items-center space-x-8">
                  <a
                    onClick={() => navigate("/find-jobs")}
                    className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
                  >
                    Find jobs
                  </a>
                  <a
                    onClick={() =>{
                        navigate(
                            isAuthenticated && user?.role === "employer"
                              ? "/employer-dashbord"
                              : "/login"
                        );
                     }}
                     className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
                    >
                        For Employers
                    </a>
                  </nav>

                  {/* Auth Button */}
                    <div className="flex items-center space-x-3">
                        {isAuthenticated ? 
                            <div className="flex items-center space-x-3">
                                <spam className="text-gray-700">welcome, {user?.fullName}</spam>
                                <a
                                href={
                                    user?.role === "employer"
                                    ? "/employer-dashboard"
                                    : "/find-jobs"
                                }
                                className="bg-gradient-to-r from-blue-600 to-purple text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-sm hover:shadow-md"
                                >
                                Dashboard
                                </a>
                            </div>
                        : (
                        <>
                            <a
                            href="/login"
                            className="text-gray-600 hover:text-gray-900 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-gray-500"
                            >
                                login
                            </a>
                            <a
                            href="/signup"
                            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 trasition-all duration-300 shadow-sm hover:shadow-md "
                            >
                            Sign up   
                            </a>
                        </>   
                        )}
                    </div>
                </div>  
              </div>             
        </header>;
};

export default Header;
                
                    
                      
                 
                   
              
            

