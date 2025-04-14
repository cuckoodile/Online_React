import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-emerald-900 w-full p-[40px]">
      {/* Main footer content - made responsive */}
      <div className="flex flex-wrap justify-center gap-8 md:gap-[60px] lg:gap-[130px] max-w-7xl mx-auto">
        <div className="w-full sm:w-[235px]">
            <p className="font-[700] text-emerald-100 text-lg mb-4 border-b border-emerald-700 pb-2">
                About
            </p>

            <p className="text-emerald-100 text-sm leading-relaxed">
            Welcome to DevSix, your go-to destination for high-quality products at affordable prices.
            We offer a seamless shopping experience with fast shipping and excellent customer service.
            </p>
        </div>

        <div className="w-full sm:w-[250px]">
          <p className="font-[700] text-emerald-100 text-lg mb-4 border-b border-emerald-700 pb-2">
                Branches
          </p>

          <p className="text-emerald-100 text-sm mb-2">
              Pasig City, Philippines
          </p>

          <p className="text-emerald-100 text-sm mb-2">
              Pateros, Philippines
          </p>

          <p className="text-emerald-100 text-sm mb-2">
              Cainta, Rizal, Philippines
          </p>

          <p className="text-emerald-100 text-sm mb-2">
              Taytay, Rizal, Philippines
          </p>
        </div>

        {/* <div className="w-full sm:w-[250px]">
            <p className="font-[700] text-emerald-100 text-lg mb-4 border-b border-emerald-700 pb-2">
                Mission
            </p>

            <p className="text-emerald-100 text-sm leading-relaxed">
            To provide innovative solutions and resources that empower individuals and organizations to make sustainable choices,
            while building a community dedicated to environmental stewardship.
            </p>
        </div>

        <div className="w-full sm:w-[250px]">
            <p className="font-[700] text-emerald-100 text-lg mb-4 border-b border-emerald-700 pb-2">
                Vision
            </p>

            <p className="text-emerald-100 text-sm leading-relaxed">
            To be the leading platform for environmental innovation and sustainable development, 
            inspiring positive change and creating a greener future for generations to come.
            </p>
        </div> */}

        <div className="w-full sm:w-[250px]">
            <p className="font-[700] text-emerald-100 text-lg mb-4 border-b border-emerald-700 pb-2">
                Connect With Us
            </p>

            <ul className="text-emerald-100 text-sm">
                <li className="mb-3 flex items-center">
                    <FaFacebook className="mr-2" size={18} />
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-300 transition-colors">Facebook</a>
                </li>

                <li className="mb-3 flex items-center">
                    <FaTwitter className="mr-2" size={18} />
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-300 transition-colors">Twitter</a>
                </li>

                <li className="mb-3 flex items-center">
                    <FaInstagram className="mr-2" size={18} />
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-300 transition-colors">Instagram</a>
                </li>
                
                <li className="mb-3 mt-4">
                    <Link to="/about" className="text-emerald-100 hover:text-emerald-300 transition-colors font-medium">
                        Contact Us
                    </Link>
                </li>
            </ul>
        </div>
      </div>   
      {/* Copyright section */}
      <div className="text-center mt-8 pt-4 border-t border-emerald-700">
        <p className="text-emerald-100 text-sm">
          © {new Date().getFullYear()} DevSix. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
