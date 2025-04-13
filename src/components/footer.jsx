import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="bg-emerald-900 max-w-screen p-[40px] flex  gap-[130px] justify-center">

        <div className="w-[235px] gap-10">

            <p className="font-[700] text-emerald-100">
                About
            </p>

            <p className="text-emerald-100">
            Welcome to DevSix, your go-to destination for high-quality products at affordable prices.
            We offer a seamless shopping experience with fast shipping and excellent customer service,
             </p>
        </div>

        <div className="w-[250px]">

          <p className="font-[700] text-emerald-100 mb-2">
                Branches
            </p>

            <p className="text-emerald-100 mb-2">
                Pasig City, Philippines
            </p>

            <p className="text-emerald-100 mb-2">
               Pateros, Philippines
            </p>

            <p className="text-emerald-100 mb-2">
               Cainta, Rizal, Philippines
            </p>

            <p className="text-emerald-100 mb-2">
               Taytay, Rizal, Philippines
            </p>

        </div>


        <div className={"w-[250px]"}>
            <p className="font-[700] text-emerald-100">
                Mission
            </p>

            <p className="text-emerald-100">
            To provide innovative solutions and resources that empower individuals and organizations to make sustainable choices,
             while building a community dedicated to environmental stewardship.
            </p>
        </div>

        <div className={"w-[250px] gap-10"}>
            <p className="font-[700] text-emerald-100">
                Vision
            </p>

            <p className="text-emerald-100">
            To be the leading platform for environmental innovation and sustainable development, 
            inspiring positive change and creating a greener future for generations to come.
            </p>
        </div>

        <div>
            <p className="font-[700] text-emerald-100 mb-2">
                Links
            </p>

            <ul>
                <li className="mb-2">
                    <Link to="../allproducts" className="hover:text-emerald-300 transition-colors">Shop</Link>
                </li>

                <li className="mb-2">
                    <Link to="../about" className="hover:text-emerald-300 transition-colors">About</Link>
                </li>

                <li className="mb-2">
                    <Link to="../cart" className="hover:text-emerald-300 transition-colors">Cart</Link>
                </li>
                <li>
                    <Link to="../profilepage" className="hover:text-emerald-300 transition-colors">Profile</Link>
                </li>
            </ul>

        </div>

    </div>
  );
}
