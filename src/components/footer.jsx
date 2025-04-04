import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="bg-emerald-900 max-w-screen p-[40px] flex  gap-[90px] ">

        <div>

            <p className="font-[700] text-emerald-100">
                About
            </p>

            <p className="text-emerald-100">
                Enjoy fast and free shipping on all orders over ₱500 <br />
              with easy returns and excellent customer service every step of the way!
             </p>
        </div>

        <div>

          <p className="font-[700] text-emerald-100">
                Branches
            </p>

            <p className="text-emerald-100">
                Pasig City, Philippines
            </p>

        </div>

        <div>
            <p className="font-[700] text-emerald-100 mb-2">
                Links
            </p>

            <ul>
                <li className="mb-2">
                    <Link to="../allproducts">Shop</Link>
                </li>

                <li className="mb-2">
                    <Link to="../about">About</Link>
                </li>

                <li>
                    <Link to="../cart">Cart</Link>
                </li>
            </ul>

        </div>
    </div>
  );
}
