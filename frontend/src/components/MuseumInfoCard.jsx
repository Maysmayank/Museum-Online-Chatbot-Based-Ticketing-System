import React from 'react'

function MuseumInfoCard({title,text}) {
  return (
    <div className='flex flex-col'>
        <h1 className='text-3xl mb-5'>{title}</h1>
        <span>{text}</span>
        <button className='mt-10'>Get Tickets</button>
    </div>
  )
}

export default MuseumInfoCard
