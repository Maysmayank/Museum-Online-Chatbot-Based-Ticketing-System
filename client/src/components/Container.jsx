import React, { Suspense, useEffect, useState } from 'react'
import ImageSlider from './ImageSlider'
import EventComponent from './EventComponent'

function Container() {
  const [color1, setColor1] = useState('#fc578a'); // Initial color for first div
  const [color2, setColor2] = useState('#8f8afa'); // Initial color for second div
  const [color3, setColor3] = useState('hsl(19, 84%, 56%)'); // Initial color for third div

  useEffect(()=>{
    const handleScroll=()=>{
      const scrollPosition=window.scrollY;
      if (scrollPosition < 1300) {
        setColor1('#0a81db');
        setColor2('#EBD7B2');
        setColor3("#d85e31")
      } else if (scrollPosition >= 1300 && scrollPosition < 1800) {
        setColor1('#fc578a'); // Initial color
        setColor2('#d57e48');
        setColor3('#2fbf49')

        
      } else if (scrollPosition >= 1800) {
        setColor1('#ff6347'); // Another color
        setColor2('#4169E1');
        setColor3('#603bb5')
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  },[])

  return (
    <div >
      <div className='relative h-[2600px] grid grid-cols-1 md:grid-cols-3'>
        <div className='h-full bg-[#fc578a]' style={{backgroundColor:color1, transition:'background-color 0.5s ease-in'}}></div>
        <div className='h-full bg-[#8f8afa]' style={{backgroundColor:color2, transition:'background-color 0.5s ease-in'}}></div>
        <div className='h-full bg-[#ed6c31]'  style={{backgroundColor:color3, transition:'background-color 0.5s ease-in'}}></div>

        <div className='absolute inset-0 text-white flex flex-col justify-around items-center  py-4' >
          <div className='flex flex-col items-center justify-center'>
            <h1 className='container-title'>Events</h1>
            <EventComponent/>
          </div>
          
          
          <div className='flex flex-col  justify-center items-center'>
            <div className='relative flex items-center justify-center'>
              <h1 className='container-title  top-0 '>Become a</h1>
              <h1 className='container-title absolute top-28'>Member</h1>
            </div>
            <div className='mt-52'>
            <ImageSlider/>
            </div>
          </div>

          <div className=''>
            
          </div>

        </div>
      </div>


      
      
    </div>
  )
}
export default Container
