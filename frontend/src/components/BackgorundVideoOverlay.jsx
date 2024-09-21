import React, { useState, useEffect } from 'react';

const BackgroundVideoOverlay = () => {
    const [showOverlay, setShowOverlay] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowOverlay(true);
        }, 2000); // 6 seconds delay

        return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }, []);

    return (
        <div className="relative w-full h-screen overflow-hidden">
            <video
                autoPlay
                muted
                loop
                className="absolute top-0 left-0 w-full h-full object-cover"
            >
                <source src="/trialVideo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            
            {/* <div className={`absolute z-10 top-0 left-0 w-full h-full flex items-center justify-center transition-opacity duration-1000 ${showOverlay ? 'bg-gray-800 bg-opacity-40' : 'bg-transparent opacity-0'}`}>
                <div className='bg-orange-200 flex w-[80%] h-[1000%] animate-fade-down bg-opacity-60'>
                    <p>Discover history, art, and culture, where the past meets the present. Our museum offers a journey through time, showcasing unique collections and exhibitions that celebrate creativity, knowledge, and heritage.</p>
                </div>
            </div> */}
        </div>
    );
};

export default BackgroundVideoOverlay;
