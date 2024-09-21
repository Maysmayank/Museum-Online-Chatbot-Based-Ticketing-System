import React, { useState } from 'react';
import { MapPinCheck } from 'lucide-react';

function RestaurantCard({ image, desc, time1, time2, location }) {
  const [changecolor, setChangeColor] = useState(null);

  return (
    <div
      onMouseEnter={() => setChangeColor('#FF6347')}
      onMouseLeave={() => setChangeColor(null)}
      className='flex justify-around px-28 gap-8 p-5 transform transition-transform duration-300 animate-ease-in'
      style={{ backgroundColor: changecolor ? changecolor : '' }}
    >
      <div
        className=' w-[650px] h-[255px] transform transition-transform duration-300 ease-in-out'
        style={{ transform: changecolor ? 'translateX(10px)' : 'translateX(0)' }}
      >
        <img
          src={image}
          alt='restaurantimage'
          className='w-full h-full object-cover cursor-pointer'
        />
      </div>

      <div
        className='flex flex-col gap-5 pt-4 w-full transform transition-transform duration-300 ease-in-out'
        style={{ transform: changecolor ? 'translateX(10px)' : 'translateX(0)' }}
      >
        <span className='description'>{desc}</span>
        <span className='Timing'>
          <span>
            <p className='inline text-xl font-semibold pr-2'>Monday-Saturday:</p>
            {time1}
          </span>
          <span className='block'>
            <p className='inline font-semibold text-xl pr-2'>Sunday:</p>
            {time2}
          </span>
        </span>
        <span className='flex gap-2'>
          <MapPinCheck className='inline animate-pulse' />
          {location}
        </span>

        <span>
          Tixplore DiscountPoints : Accetped (member only)
        </span>
      </div>
    </div>
  );
}

export default RestaurantCard;
