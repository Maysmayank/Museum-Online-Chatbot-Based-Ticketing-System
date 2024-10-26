import React from 'react'
import FooterButton from './FooterButton'
import HocConditionalRendering from './HocConditionalRendering'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className='bg-[#4169E1] text-white text-center  grid grid-cols-1 md:grid-cols-4 p-10 '>
      
      <div className='px-5 flex flex-col items-center justify-between'>
        <h1 className='footer-heading mb-5 '>Get Tickets</h1>
        <p>Visitors can purchase exhibition tickets onsite or online. Events, and cinema screenings may require separate tickets. Children ages 6 and below do not need a ticket.</p>
        <FooterButton text={"Get Tickets"} />
      </div>
      
      <div className='px-5 flex flex-col items-center justify-between'>
        <h1 className='footer-heading mb-5'>Plan Your Visit</h1>
        <p>Discover the wonders of our museum through our website. Let us guide you in planning a memorable visit.</p>
        <Link to={'/plan-your-visit'}>
        <FooterButton  text={"Learn More"} />
        </Link>

      </div>

      <div className='px-5 flex flex-col items-center justify-between'>
        <h1 className='footer-heading mb-5'>Become a Member</h1>
        <p>We offers an exclusive experience of contemporary visual culture for people of all ages and backgrounds. You will get access to Private Viewings, priority lanes, priority bookings, and much more.</p>
        <Link to={"/membership"}>
        <FooterButton text={"Not a Member Yet"} />
        </Link>

      </div>

      <div className='px-5 flex flex-col justify-between items-center'>
        <h1 className='footer-heading mb-5'>Frequently Asked Questions</h1>
        <p>For information about visiting, ticketing, school visits, accessibility, membership, and more, contact us directly.</p>
        <Link to={"/FAQ"}>
        <FooterButton  text={"FAQ"} />

        </Link>
      
      </div>

    </div>
  )
}

export default HocConditionalRendering(Footer)
