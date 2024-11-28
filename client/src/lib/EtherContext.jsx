import React, { createContext, useContext, useEffect, useState } from 'react';
import NFTMarketPlaceContract from '../../../artifacts/contracts/NFTMarketPlace.sol/NFTMarketPlace.json';
import { ethers, formatUnits } from 'ethers';
import { addWalletListener, connectWallet, getCurrentWalletConnected } from './interact';

let abi = JSON.stringify(NFTMarketPlaceContract.abi);
let CONTRACT_ADDRESS = "0x5e350647412401445BB7FC2547e228627CDf4ae2";

const ContractContext = createContext();
// const privateKey = "d7275de770dce26a7b28bbc5f18dd9661b89a3ca9bde075f3888d3a6f2292989"; // deployed contract wallet pkey
const EthersContractProvider = ({ children }) => {
    const [walletSigner, setWalletSigner] = useState("null");

    const [status, setStatus] = useState('')
     function handleConnnectionToMetaMask() {
        const res =  connectWallet();
        setWalletSigner(res.address);
        return {
            success:true,
            message:"wallet connected"
        }
    }

    useEffect(() => {
        async function fetchWallet() {
            let res = await getCurrentWalletConnected();
            setWalletSigner(res.address)
        }

        fetchWallet()
        addWalletListener(setWalletSigner, setStatus)
    }, [])

    // const alchemyProvider = new ethers.AlchemyProvider('sepolia', "iKR2lsyxPGRK37sqmQZ7d-wgBTAp5ZNC");
   
    let {Contract} = makeTx();
    let {contractInstance}=ViewTx();

    return (
        <ContractContext.Provider value={{  walletSigner,contractInstance, Contract, handleConnnectionToMetaMask }}>
            {children}
        </ContractContext.Provider>
    );
};

const useContractContext = () => {
    return useContext(ContractContext);
};

export { useContractContext, EthersContractProvider };

export async function makeTx(){
    const provider =new ethers.BrowserProvider(window.ethereum)
    let signer= await provider.getSigner()
    const Contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
    console.log(await Contract.name());
    
    return Contract
}


export async function ViewTx(){
    let provider = ethers.getDefaultProvider("sepolia"); // Replace with your network (e.g., "mainnet")
    const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);
    return contractInstance
}