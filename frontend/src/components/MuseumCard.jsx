import React, { useState } from 'react';
import museum1 from '../assets/museum1.jpg';
import { Link } from 'react-router-dom';

function MuseumCard({ image, title }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className='w-full flex gap-10  justify-end'>
            <div
                className='h-[240px] w-[400px]'
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)} >
                
                <img
                    src={image}
                    className='rounded-sm object-cover w-full h-full hover:scale-110 transition-all'
                    alt=""
                />

            </div>
            <div className='flex flex-col items-center gap-12 '>
                <h1  onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`museum-title text-6xl break-words w-[400px] ${isHovered ? 'underline' : ''}`}
                >
                {title}
                </h1>
                <div className='w-[50%]'>
                <Link to={`/view/${encodeURIComponent(title)}`}>
                <button className='bg-black w-full text-white p-2 rounded-md hover:opacity-85  '>View</button>
                </Link>
                </div>
                
            </div>
           
            
        </div>
    );
}

export default MuseumCard;
