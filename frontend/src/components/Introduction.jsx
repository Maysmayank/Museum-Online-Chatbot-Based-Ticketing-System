import React from 'react';
import { Link } from 'react-router-dom';

function Introduction() {
  return (
    <div className="">
      <div className="bg-orange-200 grid grid-cols-1 md:grid-cols-2 gap-4">

        <div className="relative w-full h-[400px] md:h-[500px]">
          <img
            src="alexander.webp"
            className="w-full h-full object-cover opacity-90"
            alt="Museum Gallery"
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-4xl md:text-7xl font-bold text-white text-center md:text-left px-5 md:px-10">
              In the Gallery of Time: <br />
              A Majestic Journey Through Art and Heritage
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center text-lg py-20 md:text-xl p-5 md:p-10">
          <p className="intro-title text-center md:text-left">
            Discover history, art, and culture, where the past meets the present. Our museum offers a journey through time, showcasing unique collections and exhibitions that celebrate creativity, knowledge, and heritage.
          </p>
          <Link to={'/plan-your-visit'}>
          <button className="mt-10 hover:scale-110 hover:transition ease-linear bg-black bg-opacity-90 p-3 text-white">
            Plan Your Visit
          </button>
          </Link>
         
        </div>

      </div>
    </div>
  );
}

export default Introduction;
