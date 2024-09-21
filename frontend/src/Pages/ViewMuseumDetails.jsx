import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { museums } from '../assets/museumData';
import { Clock, Ticket, Lightbulb, MapPinHouse } from 'lucide-react';
import ViewMuseumCard from '@/components/ViewMuseumCard';
import RestaurantCard from '@/components/RestaurantCard';
import restaurant1 from '../assets/restaurant1.jpg'
import restaurant2 from '../assets/restaurant2.jpg'

function ViewMuseumDetails() {
    const params = useParams();
    const urlTitle = params.museumTitle
        ;
    const museum = museums.find(museum => museum.title === urlTitle);

    return (
        <div className='mt-[100px] bg-[#FAF9F6] flex flex-col'>
            <section>
                <div className='relative h-[400px] w-full'>
                    <img
                        src={museum ? museum.image : 'defaultimage'}
                        className="h-full w-full object-cover"
                        alt={museum ? museum.title : "Museum Image"}
                    />
                    <div className='absolute opacity-65 inset-0 bg-black'></div>
                </div>

                <div className='absolute left-[220px] text-8xl text-white px-5 py-3 top-[190px]'>
                    <h1>{museum ? museum.title : "Museum Not Found"}</h1>
                </div>

            </section>
            <section className='mt-16'>
                <div className='flex min-h-[800px] items-center w-full flex-col px-16 my-5'>
                    <h1 className='text-8xl'>Visiting Information</h1>
                    <div className='pt-28 gap-8 grid h-[400px] text-center  w-[80%] grid-cols-1 md:grid-cols-3'>
                        <ViewMuseumCard title={"Purchase Ticket"}
                            icon={<Ticket className='size-16 ' />}
                            iconColor={"#318CE7"}
                            buttonText={"click to Get Ticket"}
                            path={''}
                            text={`Welcome to ${museum.title}! Experience museum exclusive offers and purchase tickets for full access to exclusive exhibits.Become a member today for unlimited General Admission ticket discounts, and a variety of exclusive benefits.Visit our 'Membership' section for more details.`} />

                        <ViewMuseumCard title={"Opening Hours"}
                            iconColor={"#FF6347"}
                            icon={<Clock className='size-16' />} optionalchildren={
                                <div className='details flex flex-col gap-5'>
                                    <p>Tuesdays to Thursdays and weekends: 10:00–18:00</p>
                                    <p>Fridays: 10:00–22:00</p>
                                    <p>Mondays: Closed</p>
                                    <p>The last admission time is thirty minutes before closing.</p>
                                    <p>The museum is open on all public holidays unless otherwise announced.</p>
                                </div>
                            } />

                        <ViewMuseumCard iconColor={"#FFC72C"} icon={<Lightbulb className='size-16' />} title={"Tips for Visiting"} text={"Bags and backpacks smaller than 30 cm x 42 cm x 10 cm are allowed in the galleries, but backpacks must be worn on the front of the body with the strap(s) slung over one or both shoulders. Larger items must be checked in to lockers or the cloakroom, available for rental.We welcome wheelchairs and baby strollers in the galleries. These are also available to borrow free of charge on a first-come, first-served basis."} />

                    </div>


                </div>
            </section>

            <section className='map-section mt-10'>
                <div className='flex w-full min-h-[400px]'>
                    <div className='flex flex-col w-[900px] p-10 gap-5 pt-[5%]'>
                        <h1 className='text-6xl'>Getting Here</h1>
                        <span>Address</span>
                        <p>Verdant Bluffs district of Los Santos</p>
                    </div>
                    <div className='relative h-[450px] w-full overflow-x-hidden overflow-y-hidden'>
                        <img
                            src={museum?museum.map:""}
                            className='h-full w-full  object-cover scale-150'
                            style={{ objectPosition: '145px -125px' }}
                            alt=""
                        />
                        <div className='absolute top-[180px] left-[36px] bg-black rounded-full p-2 animate-bounce marker'>
                            <MapPinHouse color='white' size={50} />
                        </div>
                    </div>
                </div>
            </section>

            <section className='Restaurant-section  mt-16'>
            <div className='flex min-h-[500px] items-center w-[100%] flex-col my-5'>
                    <h1 className='text-6xl'>Nearby Restaurants and Shops</h1>
                    <div className='mt-20 w-[100%] flex  flex-col gap-2'>
                        <RestaurantCard image={restaurant1}
                        time1={"11:00 AM – 10:00 PM"}
                        time2={"11:00 AM - 8:00PM"}
                        location={"Cityhall Mall,Saket,India"}
                        desc={" Mamagoto has been India’s first pan-Asian café, blending street hawker cuisine with vibrant urban art and manga-inspired décor. Known for its quirky and colorful atmosphere, Mamagoto also offers a retail line of curry pastes and stir-fry sauces."}/>
                        
                        <hr className='border-black' />
                        
                        <RestaurantCard image={restaurant2}
                        time1={"12:00 PM – 11:00 PM"}
                        time2={"1:00 PM - 9:00PM"}
                        location={"Cityhall Mall,Saket,India "}
                        desc={" Experience the vibrant flavors of India and Southeast Asia at Sly Granny Cafe. With aromatic spices and bold ingredients, the dishes here are a journey through rich culinary traditions."}/>                 

                    </div>
                </div>
            </section>

        </div>
    );
}

export default ViewMuseumDetails;
