import React from "react";

function hometop() {
  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.60), rgba(0, 0, 0, 0.60)), url(/images/aboutimg.jpg)",
      }}
      className="w-full bg-cover lg:px-15 md:px-10 sm:px-7 px-5 flex flex-col gap-6 py-5 items-center justify-center"
    >
      <div className="bg-white text-black">
        <h3>Multicultural Cuisine Delivered to Your Doorstep</h3>
      </div>
    </div>
  );
}

export default hometop;
