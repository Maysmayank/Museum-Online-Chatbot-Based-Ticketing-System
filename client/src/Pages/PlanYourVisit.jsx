import React, { useEffect, useState } from 'react';
import planvisit from '../assets/planvisit.jpg';
import { MapPin } from 'lucide-react';
import MuseumCard from '../components/MuseumCard';
import MuseumInfoCard from '../components/MuseumInfoCard';
import { museums } from '@/assets/museumData';

function PlanYourVisit() {
  
    const [selectedMuseum, setSelectedMuseum] = useState(null);

    return (
        <div className='mt-[100px] flex flex-col'>
            <div className='relative h-[400px]'>
                <img src={planvisit} className="h-full w-full object-cover" alt="" />
                <div className='absolute opacity-40 inset-0 bg-black'></div>
            </div>

            <div className='absolute text-7xl bg-blue-400 text-white px-5 py-3 pl-48 top-[170px]'>
                <span className='flex text-center items-center'>
                    <MapPin className='size-16 mr-5' />
                    <h1>Plan Your Visit</h1>
                </span>
            </div>

            <div className='py-10 flex flex-col items-center'>
                <h1 className='text-8xl'>Check Out Museums</h1>

                <div className='p-10 flex justify-between w-full'>
                    {/* Left side: MuseumInfoCard updates with selected museum */}
                    <div className='h-[400px] flex justify-center flex-col p-5 min-w-[450px]'>
                        <MuseumInfoCard
                            title={selectedMuseum ? selectedMuseum.infoTitle : "Did You Get Your Tickets"}
                            text={selectedMuseum ? selectedMuseum.infoText : "Welcome to TIXPLORE! Explore free spaces of the museum, or purchase tickets  and membership for more access..."}
                        />
                    </div>

                    {/* Right side: List of MuseumCards */}
                    <div className='flex gap-12 flex-col p-10'>
                        {museums.map((museum, index) => (
                            <div
                                key={index}
                                onClick={() => setSelectedMuseum(museum)} // Click event to set the selected museum
                                onMouseEnter={() => setHoveredMuseum(museum)} // Hover event to show info
                                onMouseLeave={() => setHoveredMuseum(null)} // Clear hovered museum info
                                className="relative cursor-pointer flex items-start"
                            >
                                <MuseumCard image={museum.image} title={museum.title} />  

                            </div>
                            
                        ))}
                        <hr className='bg-black outline' />

                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlanYourVisit;
