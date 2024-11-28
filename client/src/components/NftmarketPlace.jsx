import React, { useEffect, useState } from 'react'
import Sellnft from './Sellnft'
import {ethers, Log} from 'ethers'
import { Network, Alchemy,Wallet } from 'alchemy-sdk';
import { Link, Router, useLocation, useNavigate } from 'react-router-dom';
import { addWalletListener, connectWallet, getCurrentWalletConnected } from '@/lib/interact';
import { makeTx, useContractContext, ViewTx } from '@/lib/EtherContext';

//  data={
//    tokenId,  
//    owner ,
//    seller,
//  maxPricePerListing,
//    name,
//    image,
//    description,
//    

//  }


function NftmarketPlace() {
  const [data,setData]=useState([])
  const navigate=useNavigate()
  const [URI,setURI]=useState([])

  useEffect(() => {
    async function getAllNFTs() {
      
      try {
        
        // const uris = [];
        
        // for (let i = 0; i < totalSupp; i++) {
        //   const uri = await Contract._tokenURIs(i);
        //   uris.push(uri);
        // }
        
        // setURI(uris); // Update the state with the full array of URIs
        let Contract=await ViewTx()

        let TX = await Contract.getAllNFTs(); // Fetch all NFTs

        console.log(TX);
        
        let fetchedURIs=[]

        let items = await Promise.all(TX.map(async (i) => {
          
          let NftName=await Contract.name();

          let tokenURI = await Contract._tokenURIs(i.tokenId);
          
          fetchedURIs.push(tokenURI);
          
          let metadataHash=await Contract.tokenURItoMetaDataHash(tokenURI);

          let fetchedData={
            NFTName:NftName,
            tokenId:i.tokenId,
            owner:i.owner,
            seller:i.seller,
            maxPricePerListing:ethers.formatEther(i.price),
            tokenURI:tokenURI,
            metadataHash:metadataHash
          }

          return fetchedData;
        }));
        setURI(fetchedURIs)
        setData(items)
    
        console.log("ge",data);
        
      } catch (error) {
        console.error("Error fetching URIs:", error);
      }
    }

    getAllNFTs();
  }, []); // Empty dependency array to fetch only on initial render
  
 


 
  function objectToQueryString(obj) {
    delete obj.owner;
    
   let keys=Object.keys(obj)
   
   let encodedData=keys.map((key)=>(
     encodeURIComponent(key)+'='+encodeURIComponent(obj[key])
   ))
    return encodedData.join('&');

  }
  

  return (
    <div className='pt-[100px]'>
      
    

      <div className='bg-blue-950 h-screen  flex items-center justify-center'>
        <h1 className='text-white'> 
          <div className='flex  gap-4 '>
          {   
            data.map((nft,index)=>(
              
              <img height={500} width={400} onClick={()=>navigate(`/asset/nft/${objectToQueryString(nft)}`)} src={nft.tokenURI} key={index} alt="" />
            ))
          }
          </div>
        
        </h1>
      </div>
    </div>
  )
}

export default NftmarketPlace

