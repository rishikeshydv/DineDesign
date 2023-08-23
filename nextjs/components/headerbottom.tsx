import React from "react";
import { FaInstagram, FaTwitter } from "react-icons/fa";

export default function header() {
  return (
    <div className="w-full fixed top-0">
      <div className="justify-end flex flex-row space-x-4 mr-10 mt-4">
        <a href="#">Login</a>
        <a href="#">Register</a>
        <FaInstagram className="w-6 h-6 text-pink-500" />
        <FaTwitter className="w-6 h-6 text-blue-400" />
      </div>
      <div className="flex flex-row items-center justify-center px-10 py-5 w-full h-full">
        <h3 className="text-3xl font-semibold text-beige">DineDesign</h3>
      </div>
      <div className="flex flex-row gap-5 items-center justify-center">
        <a href="#" >
          <span>
            Home
          </span>
        </a>
        <a href="">
          <span>Menu</span>
        </a>
        <a href="">
          <span>Reservations</span>
        </a>
        <a href="">
          <span>Blog</span>
        </a>
        <a href="">
          <span>Contact Us</span>
        </a>
      </div>
    </div>
  );
}
