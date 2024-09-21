import React from 'react'
import image from '../assets/Event1.jpg'
function EventComponent() {
    return (
        <section className='flex flex-col my-20'>
            <div className='flex  items-center justify-around'>
                <div className='h-[300px] w-[500px] '>
                    <img src={image} className='h-full w-full object' alt="" />
                </div>
                <div className='flex flex-col gap-10 w-[50%]'>
                    <h1 className='text-5xl intro-title'>Global Visions: Contemporary Art Showcase</h1>
                    <span className='font-medium text-1xl'> Join us for "Global Visions," an exciting exhibition featuring a curated selection of contemporary artworks from diverse artists worldwide. nd innovation, showcasing pieces that challenge conventional perspectives and inspire dialogue. Visitors will have the opportunity to engage with the artists during live Q&A sessions and interactive workshops. Explore themes of identity, culture, and technology as you immerse yourself in the vibrant world of modern art. </span>
                </div>
            </div>

            <hr className='mt-20  bg-white' />

            <div className='flex mt-28 items-center justify-around'>

            <div className='flex flex-col gap-10 w-[50%]'>
                    <h1 className='text-5xl intro-title'>Echoes of the Past: A Journey Through Natural History</h1>
                    <span className='font-medium text-1xl'>  Join us for "Echoes of the Past," an engaging exhibition at our environmental education institution celebrating the wonders of natural history and ecology. Visitors will explore our life-size dinosaur model and delve into three dedicated galleries showcasing the intricate relationships between wildlife, land, water, and air. The exhibition features interactive displays and informative panels highlighting conservation efforts and the importance of preserving our environment.  </span>
                </div>

                <div className='h-[300px] w-[500px] '>
                    <img src={image} className='h-full w-full object' alt="" />
                </div>
            </div>
            <hr className='mt-28  bg-white' />

            <div className='flex mt-16 items-center justify-around'>
                <div className='h-[300px] w-[500px] '>
                    <img src={image} className='h-full w-full object' alt="" />
                </div>
                <div className='flex flex-col gap-10 w-[50%]'>
                    <h1 className='text-5xl intro-title'>Resonance: Art in Action</h1>
                    <span className='font-medium text-1xl'> Experience "Resonance," a dynamic exhibition that highlights the intersection of art and social change. This event features a diverse array of contemporary artists whose work addresses pressing global issues, from climate change to social justice. Through thought-provoking installations and interactive displays, visitors are invited to engage with the themes and messages behind each piece. Join us for artist talks, panel discussions, and hands-on workshops that encourage dialogue and creativity </span>
                </div>
            </div>


        </section>
    )
}

export default EventComponent
