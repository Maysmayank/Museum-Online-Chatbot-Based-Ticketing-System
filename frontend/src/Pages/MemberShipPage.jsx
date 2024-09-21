import ImageSlider from '@/components/ImageSlider'
import Membercard from '@/components/Membercard'
import React from 'react'

function MemberShipPage() {
  return (
    <div className='mt-[100px]'>
      
      <div className='bg-black pt-20'>
        <h1 className='intro-title text-8xl py-3 px-10 text-black inline bg-white animate-fade-right'>Become a Member </h1>
      </div>

      <section className=''>
        <div className=''>
          <div className='flex w-full bg-black pr-2 pt-10 flex-col md:flex-row'>
            
            <div className='py-48  px-10 w-[550px] text-white flex-shrink-0'>
              <h1 className='text-4xl mb-8 animate-jump'>Unlock Exclusive Perks with Our Membership Program</h1>
              <div className='leading-relaxed flex transition flex-col text- gap-5 animate-fade-up text-xl'>
                <p>Discover exclusive benefits with our membership program, designed to enhance your experience with local dining and shopping. As a member, you gain access to special offers and discounts at a curated selection of nearby restaurants and shops. </p>
                <p>Enjoy priority reservations, exclusive deals, and personalized recommendations tailored just for you. Whether you're exploring new culinary delights or discovering unique retail experiences, our membership ensures you get the most out of your local adventures.</p>
                <p>Join now to start enjoying these exclusive perks and more!</p>
              </div>
            </div>

            <div className='flex items-center  w-full mt-[100px] p-4'>
              <div className=' animate-jump-in'>
                <Membercard title={"Member"} price={"Rs 500"} buttontext={"Join Today"} />
              </div>
            </div>



          </div>
        </div>
      </section>
      <div className='pb-28 bg-black pt-28 text-white flex flex-col gap-28'>
        <h1 className='text-7xl text-center'>Explore More</h1>
      <ImageSlider />

      </div>

    </div>
  )
}

export default MemberShipPage
