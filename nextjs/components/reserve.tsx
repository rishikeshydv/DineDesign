import React from "react";

function Reserve() {
  return (
      <div
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.60), rgba(0, 0, 0, 0.60)), url(/images/hero-bg.jpg)",
        }}
        className="w-full bg-cover lg:px-15 md:px-10 sm:px-7 px-5 flex flex-col gap-6 py-5 items-center justify-center"
      >
        <h3 className="text-3xl font-semibold text-neutral-200">
          Reserve a Table
        </h3>
        <form className="w-full flex md:flex-row flex-col gap-4">
          <div className="flex flex-col gap-2 items-start">
            <label
              className="text-neutral-200 font-semibold"
              htmlFor="numberOfPeople"
            >
              Number of People
            </label>
            <input type="number" className="w-full rounded-sm bg-" />
          </div>
          <div className="mb-4">
            <label className="text-neutral-200 font-semibold" htmlFor="date">
              Date
            </label>
            <input type="date" />
          </div>
          <div className="mb-4">
            <label className="text-neutral-200 font-semibold" htmlFor="time">
              Time
            </label>
            <input type="time" />
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
  );
}

export default Reserve;
