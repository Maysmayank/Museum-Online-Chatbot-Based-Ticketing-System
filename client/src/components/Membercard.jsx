import React from 'react';

function Membercard({ title, price, buttontext }) {
    return (
        <div className='relative w-[180%] p-8 grid grid-cols-2 gap-4 bg-[#40b8d1] items-center hover:scale-105 transition-all hover:-translate-x-6'>
            <div className='flex flex-col w-[140%] gap-3 text-white'>
                <h1 className='text-5xl'>{title}</h1>
                <span className='text-4xl'>{price}</span>
            </div>

            <div className='flex justify-end items-center'>
                <button className='absolute p-4 right-0 px-16 bg-black text-white'>{buttontext}</button>
            </div>
        </div>
    );
}

export default Membercard;
