
import { pinFileToIPFS, uploadJsonToIpfs } from "@/lib/config";
import { makeTx, useContractContext } from "@/lib/EtherContext";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { Router, useNavigate } from "react-router-dom";


export default function Sellnft() {
    const [formParams, updateFormParams] = useState({ name: '', description: '', price: '' });
    const [selectedFile, setSelectedFile] = useState();
    const [ipfsHash, setIpfsHash] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [Contract,setContract]=useState(null)
    const navigate=useNavigate()
    const [listPrice,setListPrice]=useState(null)
    useEffect(()=>{
        async function contractexec(){
            let Contract=await makeTx()
            let listPrice=await Contract.getListPrice()
            console.log(listPrice);
            
            setContract(Contract)
            // let etherprice=ethers.formatUnits(listPrice);
            setListPrice(listPrice);
            
            
          }
          contractexec()
    },[])
    const changeHandler = (event) => {
        setSelectedFile(event.target?.files?.[0]);
    };

    const handleSubmission = async (w) => {
        w.preventDefault();
        try {
            const { name, description, price } = formParams;
            console.log("Wait for a While ");
    
            // Upload file to IPFS and retrieve imageUrl
            const upload = await pinFileToIPFS(selectedFile);
            
            if (upload && upload.fileUrl) {
                console.log("Upload successful:", upload);
                setIpfsHash(upload.ipfsHash);
                const imageUrl = upload.fileUrl;
                setImageUrl(upload.fileUrl)
                
                // console.log("Form Data:", name, description, price, imageUrl);
    
                // Ensure all required fields are present
                if (!name || !description || !price || !imageUrl) {
                    console.log("Missing required fields");
                    return;
                }
    
                const nftJSON = { name, description, price, image: imageUrl };
                // not storing the nftJSON metadata onchain but on pinata ipfs

                const response = await uploadJsonToIpfs(nftJSON);    
                let metadataHash=response.IpfsHash;

                let weiPrice = ethers.parseEther(price);   // the seller price or maxPricePerListing
              
    
                let transaction = await Contract.createToken(imageUrl,metadataHash, weiPrice, { value: listPrice });
                console.log("Transaction successful:", transaction);
    
                // Clear the form after successful submission


                updateFormParams({ name: '', description: '', price: '' });
                navigate('/nft');
                
            } else {
                console.error("Failed to retrieve imageUrl from IPFS upload.");
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };
    

    const [message, updateMessage] = useState('');

    return (
        <div className="">
            <div className="flex flex-col place-items-center mt-10" id="nftForm">
                <form className=" bg-white shadow-md rounded px-8 pt-20 pb-8 mb-4">
                    <h3 className="text-center font-bold text-purple-500 mb-5">Upload your NFT to the marketplace</h3>
                    <h2>List Price is : {listPrice}</h2>
                    <div className="mb-4">
                        <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="name">NFT Name</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Axie#4563" onChange={e => updateFormParams({ ...formParams, name: e.target.value })} value={formParams.name}></input>
                    </div>
                    <div className="mb-6">
                        <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="description">NFT Description</label>
                        <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" cols="40" rows="5" id="description" type="text" placeholder="Axie Infinity Collection" value={formParams.description} onChange={e => updateFormParams({ ...formParams, description: e.target.value })}></textarea>
                    </div>
                    <div className="mb-6">
                        <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="price">Price (in ETH)</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" placeholder="Min 0.01 ETH" step="0.01" value={formParams.price} onChange={e => updateFormParams({ ...formParams, price: e.target.value })}></input>
                    </div>
                    <div>
                        <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="image">Upload Image (&lt;500 KB)</label>
                        <input type="file" onChange={changeHandler} />
                    </div>
                    <br></br>
                    <div className="text-red-500 text-center">{message}</div>
                    <button onClick={handleSubmission} className="font-bold mt-10 w-full bg-purple-500 text-white rounded p-2 shadow-lg" id="list-button">
                        List NFT
                    </button>
                    {imageUrl && <a href={imageUrl} target="_blank">click here</a>}
                </form>
            </div>
        </div>
    )
}