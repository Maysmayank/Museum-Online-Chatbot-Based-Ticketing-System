import React from 'react'
import { useLocation } from 'react-router-dom'

function HocConditionalRendering(WrappedComponent) {
  return function(props){
    let location = useLocation();
    
    const hiddenRoutes=["/signup","/signin"]
    
    if(hiddenRoutes.includes(location.pathname)){
        return null;
    }


    return <WrappedComponent {...props}/>
  }
}

export default HocConditionalRendering
