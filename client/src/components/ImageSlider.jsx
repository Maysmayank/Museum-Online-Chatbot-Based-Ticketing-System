import { sliderimageData } from '../assets/sliderImagesData.js'
import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel.jsx"
import { Link } from 'react-router-dom'

function ImageSlider() {
  return (
    <Carousel className=" max-w-[1415px] ">
      <CarouselContent>
        {sliderimageData.map((slide, index) => (
          <div key={index} className="w-1/5 flex-shrink-0">
            <Link to={`/membership`} className='relative flex items-center justify-center hover:scale-110 transition-all'>
              
              <img src={slide.imageUrl} loading='lazy' className='h-[500px] ' alt="image" />
              
              <span className="image-title absolute text-center text-3xl">
                <p className='bg-blue-400 mx-1 inline  break-words w-[180px] text-white'>
                  {slide.title}
                </p>
              </span>
            </Link>
          </div>
        ))}
      </CarouselContent>
      <CarouselPrevious className="z-10 left-8" />
      <CarouselNext className="z-10 right-8" />
    </Carousel>
  )
}

export default ImageSlider
