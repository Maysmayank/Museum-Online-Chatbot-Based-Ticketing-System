import {PinataSDK} from 'pinata-web3'
let JWT="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJiMzg2YjJjOS01YTAzLTQyNDEtODdlOS00MjEzOWM0ZDEzOTAiLCJlbWFpbCI6Im1heWFua29hc2lzMjRAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImYxNGNiN2E5NDc2ZTU2MDI4NmZmIiwic2NvcGVkS2V5U2VjcmV0IjoiNTY3NzMxNzdhYTY2MWRmYjU5ZDMyMjA0YWVmYTNlMjNkOTU1OGFmYzNkM2E3MjIzZTJiMjk0ODNkZTZmYWU2ZSIsImV4cCI6MTc2MjM1NTk0N30.xszDYElZOxa0Y_QbO6vYvYO3Alo0tmvpfwbMetn7ug0"

const pinata = new PinataSDK({
  pinataJwt: JWT,
  pinataGateway: "salmon-select-sparrow-569.mypinata.cloud",
});
  export async function pinFileToIPFS(file) {
    try {
  
      const formData = new FormData();
      formData.append("file",file)  
      const request = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${JWT}`
        },
        body: formData,
      });
      const response = await request.json();
      
      return {
        success:true,
        ipfsHash:response.IpfsHash,
        fileUrl:`https://salmon-select-sparrow-569.mypinata.cloud/ipfs/${response.IpfsHash}?pinataGatewayToken=wlF7pwQy8z1JbnyHyBPY9skbz7eN-JrspfwnTzPRwKrDumRwBor7U99kc-RSkwGb`
      }
    } catch (error) {
      console.log(error);
    }
  }

export async function uploadJsonToIpfs(NFTObject){
  
  const response = await pinata.upload.json(NFTObject);
  return {
      success:true,
      IpfsHash:response.IpfsHash
    }
  
  
}

export const getMetadata=async(metaDatahash)=>{
  console.log("wait");
  let URL="https://salmon-select-sparrow-569.mypinata.cloud/ipfs/"+metaDatahash+"?pinataGatewayToken=wlF7pwQy8z1JbnyHyBPY9skbz7eN-JrspfwnTzPRwKrDumRwBor7U99kc-RSkwGb";
  
  const { data, contentType } = await pinata.gateways.get(URL);
  
  return{
    success:true,
    data:data
  };
  
}