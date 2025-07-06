"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { LuRefreshCcw } from "react-icons/lu";
import { FaBitcoinSign } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { FaCopy } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { FaEye } from "react-icons/fa";

const address = "0x215728c28080851Dc004c40A64482ebdF3dD7C82";
const shortAddress = `${address.slice(0, 4)}...${address.slice(-3)}`;

export default function Home() {
  const [showFull, setShowFull] = useState(false);
  const [copied, setCopied] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowFull(false);
      }
    }
    if (showFull) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFull]);

  // Copy feedback
  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="min-h-screen  ">
      {/* Header */}
      <header className="flex flex-col sm:flex-row items-center justify-between px-2 sm:px-4 py-2 gap-2 sm:gap-0">
        <div className="flex-shrink-0">
          <Image src="/logo.png" alt="Logo" width={44} height={44} />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-end w-full gap-2 sm:gap-4">
          <span class="relative flex size-3">
            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span class="relative inline-flex size-3 rounded-full bg-green-500"></span>
          </span>
          <button
            className="cursor-pointer p-2 rounded-full hover:bg-gray-200 transition"
            aria-label="Refresh"
          >
            <LuRefreshCcw />
          </button>
          <div className="flex items-center shadow-md bg-white rounded-lg px-3 py-2 font-bold space-x-2 relative w-full sm:w-auto text-black">
            {/* ETH Amount */}
            <div>
              <h1 className="font-bold text-sm sm:text-base">0.2223 ETH</h1>
            </div>

            {/* Address + Icon + Dropdown */}
            <div
              className="flex items-center space-x-1 relative"
              ref={dropdownRef}
            >
              <FaBitcoinSign className="text-blue-500 text-lg" />
              <p className="font-mono text-xs sm:text-base">{shortAddress}</p>
              {/* Dropdown Toggle Button */}
              <button
                onClick={() => setShowFull((v) => !v)}
                className="text-gray-600 p-1 rounded-full hover:bg-gray-100 transition"
                aria-label="Show full address"
              >
                <IoIosArrowDown
                  className={`transition-transform ${
                    showFull ? "rotate-180" : ""
                  }`}
                />
              </button>
              {/* Full Address Dropdown */}
              {showFull && (
                <div className="absolute top-full right-0 mt-2 bg-white shadow-lg rounded-lg p-3 z-20 min-w-[220px] w-max border border-gray-100 animate-fadeIn">
                  <div className="flex items-center space-x-2">
                    <h2 className="font-mono break-all text-xs">{address}</h2>
                    <button
                      onClick={handleCopy}
                      className="text-blue-500 hover:text-blue-700 transition p-1 rounded"
                      aria-label="Copy address"
                    >
                      <FaCopy />
                    </button>
                  </div>
                  {copied && (
                    <div className="text-green-600 text-xs mt-1">Copied!</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center py-16 px-4">
        {/* Animated Icon */}
        <div className="mb-6">
          <span className="inline-flex items-center justify-center rounded-full bg-blue-100 p-6 animate-bounce shadow-lg">
            <FaBitcoinSign className="text-blue-500 text-5xl" />
          </span>
        </div>
        {/* Heading */}
        <h1 className="text-3xl sm:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500">
          Decentralized Blockchain Voting App
        </h1>
        {/* Subheading */}
        <p className="text-white text-lg sm:text-xl mb-8 max-w-2xl">
          Secure, transparent, and tamper-proof voting powered by blockchain
          technology. Participate in elections with confidence and privacy.
        </p>
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <div className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition">
            <MdDashboard />
            <a href="/dashboard">Dashboard</a>
          </div>

          <button className="flex items-center space-x-2 px-6 py-3 bg-gray-200 text-blue-700 rounded-lg font-semibold shadow hover:bg-gray-300 transition ">
            <FaEye />
            <a href="/results">Results</a>
          </button>
        </div>
      </section>
    </div>
  );
}
