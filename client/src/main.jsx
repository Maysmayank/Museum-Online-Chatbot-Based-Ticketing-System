import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './Pages/Home.jsx'
import About from './Pages/About.jsx'
import Signup from './Pages/Signup.jsx'
import Signin from './Pages/Signin.jsx'
import PlanYourVisit from './Pages/PlanYourVisit.jsx'
import ViewMuseumDetails from './Pages/ViewMuseumDetails.jsx'
import MemberShipPage from './Pages/MemberShipPage'
import FAQPage from './Pages/FAQPage'
import { Toaster } from './components/ui/toaster'
import NftmarketPlace from './components/NftmarketPlace'
import Sellnft from './components/Sellnft'
import { EthersContractProvider } from './lib/EtherContext'
import ShowNft from './components/ShowNft.jsx'

const router=createBrowserRouter([
  {
    path:'/',
    element:<Layout/>,
    children:[
      {
        path:"",
        element:<Home/>
      },
      {
        path:"/about",
        element:<About/>
      },
      {
        path:'/signup',
        element:<Signup/>
      }, {
        path:'/signin',
        element:<Signin/>
      },{
        path:'/membership', // when click on image this will invoke
        element:<MemberShipPage/>    //page
      },{
        path:'/plan-your-visit',
        element:<PlanYourVisit/> //page
      },{
        path:'/view/:museumTitle',
        element:<ViewMuseumDetails/>  //page
      },{
        path:'/FAQ',
        element:<FAQPage/>  //page
      },{
        path:'/nft',
        element:<NftmarketPlace/>
      },{
        path:'/sellnft',
        element:<Sellnft/>
      },{
        path:'/asset/nft/:nftparams',  
        element:<ShowNft/>
      }

    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <EthersContractProvider>
    <RouterProvider router={router}></RouterProvider>
    </EthersContractProvider>
  </StrictMode>,
)
