import { getMetadata } from '@/lib/config';
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'

function ShowNft() {
  const param = useParams();
  const [obj, setObj] = useState('');
  const [metadata, setMetadata] = useState(null)
  useEffect(() => {
    const nftStringParmas = decodeURIComponent(param.nftparams)
    let paramObj = nftStringParmas.split('&').reduce((acc, parameter) => {
      let [key, value] = parameter.split('=');
      acc[key] = value
      return acc

    }, {}) // intialiased as {}       

    setObj(paramObj)



    async function fetchMetaData(hash) {

      const res = await getMetadata(hash)

      setMetadata(res.data)
    }

    let hash = paramObj.metadataHash
    fetchMetaData(hash)

    console.log(obj);


  }, [])

  return (
    <div className="pt-[200px] p-20  flex items-center justify-center">
      {/* Left Section: Image */}
      <div className="flex-shrink-0 w-1/3">
        {metadata && metadata.image && (
          <img
            src={metadata.image}
            alt={metadata.name}
            width={500}
            className=" h-auto rounded-lg shadow-lg"
          />
        )}
      </div>

      {/* Right Section: Metadata */}
      <div className="bg-slate-200 h-full w-2/3 pl-8">
        {metadata && (
          <>
            <h1 className="text-3xl font-bold text-gray-800">{metadata.name}</h1>
            <p className="mt-4 text-lg text-gray-600">{metadata.description}</p>
            <div className="mt-4 flex flex-col text-xl font-semibold text-gray-900">
              <p>            Price: {metadata.price} ETH
              </p>
              <p>            seller:{obj.seller}
              </p>
              <p>Token Standard : {"ERC-721"}</p>
              <p>tokenID:{obj.tokenId}</p>
              <p>Imageurl:</p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ShowNft
