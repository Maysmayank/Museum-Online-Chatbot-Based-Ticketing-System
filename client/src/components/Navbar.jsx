import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HocConditionalRendering from "./HocConditionalRendering";
import { jwtDecode } from "jwt-decode";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover"
import Button from "./Button";
import axios from "axios";
import { useContractContext } from "@/lib/EtherContext";
 

function Navbar() {
  const [opacity, setOpacity] = useState(0);
  const [navbarHeight, setNavbarHeight] = useState(100); // State to control navbar height
  const navigate = useNavigate();
  const location = useLocation(); // Get current route
  const [userPayload, setUserPayload] = useState(null);
  const {walletSigner}=useContractContext();

 
  useEffect(() => {
    // Get the token from localStorage (or cookies if you use that)
    const token = localStorage.getItem('token'); // Or use cookies.get('token') if using cookies

    if (token) {
      try {
        // Decode the token to get the payload
        const decodedPayload = jwtDecode(token);
        setUserPayload(decodedPayload);
        console.log("User Payload:", decodedPayload);
      } catch (error) {
        console.error('Failed to decode token:', error);
      }
    }
  }, []);


  useEffect(() => {
    // Only apply scroll opacity effect on the home route
    if (location.pathname === "/") {
      const handleScroll = () => {
        const scrollPosition = window.scrollY;

        if (scrollPosition > 100) { // Adjust scroll value as needed
          setOpacity(1); // Fully opaque
          setNavbarHeight(70); // Smaller height when scrolled
        } else {
          setOpacity(scrollPosition / 100); // Adjust opacity based on scroll
          setNavbarHeight(100 - scrollPosition / 2); // Dynamically adjust height
        }
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      setOpacity(1); // Fully opaque on other routes
      setNavbarHeight(100); // Default height on other routes
    }
  }, [location]);
  async function HandleLogout(){
    
    localStorage.removeItem("token");

  try {
    const res=await axios.post("http://localhost:4000/api/v1/auth/logout")
    if (res.data.success) {
      navigate('/signin')
      console.log("Logged out successfully");
    } else {
      // Handle logout error
      console.error("Logout failed");
    }
  } catch (error) {
    console.error("Error during logout:", error);
  }

  }
  return (
    <nav
      className="fixed top-0 left-0 z-50 w-full flex items-center text-white"
      style={{ height: `${navbarHeight}px`, transition: "height 0.3s ease" }} // Apply dynamic height
    >
      {/* Background overlay with opacity */}
      <div
        className="absolute inset-0 bg-black transition-opacity duration-300"
        style={{ opacity: opacity }}
      ></div>

      <div className="relative flex items-center w-full h-full justify-around z-10">
        <p className="navbar-text intro-title">TIXPLORE.</p>

        <div className="w-[40%]  ">
          <ul className="nav-links hidden md:flex gap-5 w-full">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block rounded-sm font-semibold px-2 duration-200 transform transition-all ease-in-out 
                   ${isActive
                    ? "text-orange-400 bg-white -translate-y-1 scale-110"
                    : "text-white"
                  } 
                   hover:bg-gray-200 hover:text-black hover:scale-110 hover:-translate-y-1`
                }
              >
                Home
              </NavLink>
            </li>


            <li>
              <NavLink
                to="/membership"
                className={({ isActive }) =>
                  `block rounded-sm font-semibold px-2 duration-200 transform transition-all ease-in-out 
                   ${isActive
                    ? "text-orange-400 bg-white -translate-y-1 scale-110"
                    : "text-white"
                  } 
                   hover:bg-gray-200 hover:text-black hover:scale-110 hover:-translate-y-1`
                }
              >
                Membership
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/plan-your-visit"
                className={({ isActive }) =>
                  `block rounded-sm font-semibold px-2 duration-200 transform transition-all ease-in-out 
                   ${isActive
                    ? "text-orange-400 bg-white -translate-y-1 scale-110"
                    : "text-white"
                  } 
                   hover:bg-gray-200 hover:text-black hover:scale-110 hover:-translate-y-1`
                }
              >
                Museums
              </NavLink>


            </li>



            <li>
              <NavLink
                to="/nft"
                className={({ isActive }) =>
                  `block rounded-sm font-semibold px-2 duration-200 transform transition-all ease-in-out 
                   ${isActive
                    ? "text-orange-400 bg-white -translate-y-1 scale-110"
                    : "text-white"
                  } 
                   hover:bg-gray-200 hover:text-black hover:scale-110 hover:-translate-y-1`
                }
              >
               NFTMarketPlace
              </NavLink>

              

              
            </li>

            <li>
              <NavLink
                to="/sellnft"
                className={({ isActive }) =>
                  `block w-[120%] rounded-sm font-semibold px-2 duration-200 transform transition-all ease-in-out 
                   ${isActive
                    ? "text-orange-400 bg-white -translate-y-1 scale-110"
                    : "text-white"
                  } 
                   hover:bg-gray-200 hover:text-black hover:scale-110 hover:-translate-y-1`
                }
              >
               List Nft
              </NavLink>

              

              
            </li>
          </ul>
        </div>
        


        <div className='flex flex-col items-center'>

            <button className='text-xl rounded-md mb-2 p-2 max-w-[150px] bg-blue-900' >{walletSigner?"Connected":"Connect"}</button>
            
            <div>
              {walletSigner&& walletSigner}
            </div>
     

      </div>
        <div className="flex gap-3 items-center">
          {
            userPayload ? (
              <>
              <Popover>
                <PopoverTrigger>
                <div
                className="w-16 h-16 flex items-center justify-center bg-orange-500 text-white rounded-full text-xl font-bold"
                title={userPayload.userId} // Tooltip with the full userId
              >
                {userPayload.email.charAt(0).toUpperCase()}
              </div>
                </PopoverTrigger>
                <PopoverContent className="flex flex-col gap-8 absolute p-5 top-4 -left-60 w-[365px]">
                  <ul className="flex flex-col gap-2">
                    {
                      userPayload.id?(
                      <h2 className="w-full flex items-center"><strong className="pr-2 inline">Discount ID:</strong>{<p className=" inline">{userPayload.id}</p>}</h2> 
                      ) : ''
                    }
                    
                    <li><strong>Status: </strong>{userPayload.membership==true?" Member":" Guest"} </li>
                    <li><strong>Discount Points</strong> {userPayload.discountPoints}</li>


                  </ul>
                  <Button className="text-white" onClick={HandleLogout} label={"Logout"}></Button>

                </PopoverContent>
                
              </Popover>
              
              </>

            )
              : (
                <button
                  onClick={() => navigate("/signup")}
                  className="text-xl flex items-center justify-center rounded-lg hover:bg-green-500 p-3"
                >
                  <User />
                  Sign-Up
                </button>)
          }
    
        </div>
      </div>
    </nav>
  );
}

export default HocConditionalRendering(Navbar);
