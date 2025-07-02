"use client";

import { useWeb3 } from "./context/Web3Context";

 

export default function Home() {
    const { account, isConnected, connectWallet } = useWeb3()

  return (
   <main className=" bg-[#212121] h-screen flex flex-col items-center justify-center text-white">
    <div className="flex flex-col items-center justify-center bg-[#06923E] p-8 rounded-lg shadow-lg">
       
     <div className="mb-6"> 
      <h1 className="text-2xl font-bold">DVote - Decentralized Voting</h1>
     </div>

      {isConnected ? (
        <p className="mt-4 text-accent ">Connected as: {account}</p>
      ) : ( 
         <button
  onClick={connectWallet}
  className="mt-4 px-4 py-2 bg-gradient-to-br from-[#06923E] via-[#E67514] to-[#06923E] font-bold text-white rounded cursor-pointer hover:scale-110 transition-transform duration-300"
>
  Connect Wallet
</button>

      )}
    </div>
 
    </main>
  );
}
