import React from "react";
import { FaInstagram, FaTwitter } from "react-icons/fa";


export default function footer() {
  return (
    <div className="w-full bottom-0">
        <div>
      <section>
        <div className="flex flex-row items-center justify-center px-10 py-5 w-full">
          <h3 className="text-3xl font-semibold text-">Reserve a Table</h3>
        </div>
        <div className="flex flex-row container mx-auto p-4">
          <form className="w-full max-w-sm">
            <div className="mb-4">
              <label
                className="block text-gray-600 font-semibold"
                htmlFor="numberOfPeople"
              >
                Number of People
              </label>
              <input type="number" className="form-input" />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-600 font-semibold"
                htmlFor="date"
              >
                Date
              </label>
              <input type="date" className="form-input" />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-600 font-semibold"
                htmlFor="time"
              >
                Time
              </label>
              <input type="time" className="form-input" />
            </div>
            <div>
              <button
                type="submit"
                className="bg-beige hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
              >
                Book a Table
              </button>
            </div>
          </form>
        </div>
      </section>
      </div>

      <section className="bg-beige text-white pt-4 pl-4">
        <div className="flex flex-col justify-left text-left">
            <div className="">
                <p>Join our mailing list</p>
            </div>

            <div className="">
                <p>Enter your email here *</p>
            </div>

            <div>
            <input type="text" className="form-input" placeholder="Enter your email"/>
            </div>

            <div>
            <button
                type="submit"
                className="bg-white hover:bg-blue-600 text-black font-semibold py-2 px-4 rounded">
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
                className="bg-white hover:bg-blue-600 text-black font-semibold py-2 px-4 rounded">
                DineDesign Bot
              </button>
            </div>

        </div>
      </section>
    </div>
);
}
