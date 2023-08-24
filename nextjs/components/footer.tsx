import React from "react";
import { FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
     <div className="bg-beige text-white pt-4 pl-4">
        <div className="flex flex-col justify-left text-left">
          <div className="">
            <p>Join our mailing list</p>
          </div>

          <div className="">
            <p>Enter your email here *</p>
          </div>

          <div>
            <input
              type="text"
              className="form-input"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <button
              type="submit"
              className="bg-white hover:bg-blue-600 text-black font-semibold py-2 px-4 rounded"
            >
              Book a Table
            </button>
          </div>
        </div>

        <div className="flex flex-col justify-right text-right mr-10">
          <div>
            <p>500 Terry Francine St.</p>
          </div>
          <div>
            <p>San Francisco, CA 94158</p>
          </div>

          <div className="flex flex-box justify-end">
            <FaInstagram className="w-6 h-6 text-pink-500" />
            <FaTwitter className="w-6 h-6 text-blue-400" />
          </div>

          <div>
            <button
              type="submit"
              className="bg-white hover:bg-blue-600 text-black font-semibold py-2 px-4 rounded"
            >
              DineDesign Bot
            </button>
          </div>
        </div>
      </div>
  );
}
