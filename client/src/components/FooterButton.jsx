import { ArrowRight } from 'lucide-react'
import React from 'react'

function FooterButton({text}) {
  return (
    <>
<button
  className='mt-7 text-white bg-[#548c9c] p-3 w-[200px] hover:scale-95 '
  style={{
    boxShadow: "rgba(18, 64, 76, 0.4) -5px 5px, rgba(18, 64, 76, 0.3) -10px 10px, rgba(18, 64, 76, 0.2) -15px 15px, rgba(18, 64, 76, 0.1) -20px 20px, rgba(18, 64, 76, 0.05) -25px 25px"
  }}
>
    <p className='pl-1 items-center justify-center
     flex'>
    {text}
    <ArrowRight  className='ml-4'/>
    </p>
  

</button>
    </>
  )
}

export default FooterButton
