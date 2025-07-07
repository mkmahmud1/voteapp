"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { LuRefreshCcw } from "react-icons/lu";
import { FaBitcoinSign } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { FaCopy } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { FaEye } from "react-icons/fa";

// Get Web 3 context
import { useWeb3 } from "./context/Web3Context";
import ActiveStatus from "@/component/activestatus";

export default function Home() {
  const [showFull, setShowFull] = useState(false);
  const [copied, setCopied] = useState(false);
  const dropdownRef = useRef(null);

  // Get Web3 context
  const {
    account,
    isConnected,
    connectWallet,
    balance,
    symbol,
    disconnectWallet,
  } = useWeb3();

  const address = account;
  const shortAddress = `${account.slice(0, 4)}...${account.slice(-3)}`;

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

        {isConnected ? (
          <div className="flex flex-col sm:flex-row items-center justify-end w-full gap-2 sm:gap-4">
            {<ActiveStatus isActive={true} content={"Active"} />}
            <button
              className="cursor-pointer p-2 rounded-full hover:bg-gray-200 transition"
              aria-label="Refresh"
            >
              <LuRefreshCcw />
            </button>
            <div className="flex items-center shadow-md bg-white rounded-lg px-3 py-2 font-bold space-x-2 relative w-full sm:w-auto text-black">
              {/* ETH Amount */}
              <div>
                <h1 className="font-bold text-sm sm:text-base">
                  {balance ? `${balance.slice(0, 4) + " " + symbol}` : "0.00"}
                </h1>
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
                      <h2 className="font-mono break-all ">{address}</h2>
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
                    <div className="mt-2 flex justify-center">
                      <button
                        onClick={disconnectWallet}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                      >
                        Disconnect Wallet
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={connectWallet}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Connect Wallet
          </button>
        )}
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

        {isConnected ? (
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
        ) : (
          <button
            onClick={connectWallet}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Connect Wallet
          </button>
        )}
      </section>

      {/* Dashboard section */}
      <section className="px-4 sm:px-8 py-6 ">
        <div className="shadow p-2 bg-white rounded-lg   text-black ">
          {/* Top Section */}
          <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4 mb-6 transition-shadow  ">
            {/* Left Side */}
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-2 rounded-full animate-pulse">
                <svg
                  className="w-8 h-8 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold">Live Electronic Data</h2>
                <p className="text-gray-700 text-sm">
                  Lorem ipsum dolor sit amet.
                </p>
              </div>
            </div>
            {/* Right Side */}
            <ActiveStatus isActive={true} content={"Active"} />
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* Card 1 */}
            <div className="bg-blue-100 p-2 rounded-lg shadow group hover:shadow-xl transition relative overflow-hidden">
              <div className="flex justify-between items-center mb-2">
                <span className="text-blue-500">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </span>
                <span className="text-blue-400">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </span>
              </div>
              <div className="text-2xl font-bold mb-1 group-hover:text-blue-700 transition">
                1,234
              </div>
              <div className="text-gray-700 text-sm">Total Votes</div>
              <div className="absolute inset-0 bg-blue-200 opacity-0 group-hover:opacity-20 transition pointer-events-none" />
            </div>
            {/* Card 2 */}
            <div className="bg-green-100 p-2 rounded-lg shadow group hover:shadow-xl transition relative overflow-hidden">
              <div className="flex justify-between items-center mb-2">
                <span className="text-green-500">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <rect x="4" y="4" width="16" height="16" rx="4" />
                  </svg>
                </span>
                <span className="text-green-400">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 8v4l3 3" />
                  </svg>
                </span>
              </div>
              <div className="text-2xl font-bold mb-1 group-hover:text-green-700 transition">
                567
              </div>
              <div className="text-gray-700 text-sm">Active Users</div>
              <div className="absolute inset-0 bg-green-200 opacity-0 group-hover:opacity-20 transition pointer-events-none" />
            </div>
            {/* Card 3 */}
            <div className="bg-yellow-100 p-2 rounded-lg shadow group hover:shadow-xl transition relative overflow-hidden">
              <div className="flex justify-between items-center mb-2">
                <span className="text-yellow-500">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <polygon points="12 2 2 22 22 22 12 2" />
                  </svg>
                </span>
                <span className="text-yellow-400">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 6v6l4 2" />
                  </svg>
                </span>
              </div>
              <div className="text-2xl font-bold mb-1 group-hover:text-yellow-700 transition">
                89%
              </div>
              <div className="text-gray-700 text-sm">Turnout Rate</div>
              <div className="absolute inset-0 bg-yellow-200 opacity-0 group-hover:opacity-20 transition pointer-events-none" />
            </div>
            {/* Card 4 */}
            <div className="bg-red-100 p-2 rounded-lg shadow group hover:shadow-xl transition relative overflow-hidden">
              <div className="flex justify-between items-center mb-2">
                <span className="text-red-500">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2v20m10-10H2" />
                  </svg>
                </span>
                <span className="text-red-400">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </span>
              </div>
              <div className="text-2xl font-bold mb-1 group-hover:text-red-700 transition">
                12
              </div>
              <div className="text-gray-700 text-sm">Incidents</div>
              <div className="absolute inset-0 bg-red-200 opacity-0 group-hover:opacity-20 transition pointer-events-none" />
            </div>
          </div>

          {/* Progress Bar Section */}
          <div className="bg-white rounded-lg shadow p-4 mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">Election Progress</span>
              <span className="text-gray-700 text-sm">
                Time Remaining:{" "}
                <span className="font-mono font-bold text-green-600 animate-pulse">
                  02:15:30
                </span>
              </span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <div
                className="h-3 rounded-l-full transition-all duration-500"
                style={{
                  width: "70%",
                  background:
                    "linear-gradient(90deg, #22c55e 60%, #16a34a 100%)",
                }}
              ></div>
              <div
                className="h-3 rounded-r-full transition-all duration-500"
                style={{
                  width: "30%",
                  background:
                    "linear-gradient(90deg, #f87171 60%, #dc2626 100%)",
                }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-gray-700">
              <span>
                Total Voters: <span className="font-bold">2,000</span>
              </span>
              <span>
                Vote Count: <span className="font-bold">1,234</span>
              </span>
            </div>
          </div>

          {/* Top Candidate List */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-bold mb-4">Top Candidate List</h3>
            <div className="grid gap-4">
              {/* Candidate Card 1 */}
              <div className="flex items-center bg-gray-50 rounded-lg p-3 hover:bg-blue-50 transition group">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Candidate"
                  className="w-12 h-12 rounded-full mr-4 border-2 border-blue-400 group-hover:scale-105 transition"
                />
                <div className="flex-1">
                  <div className="font-semibold group-hover:text-blue-700 transition">
                    John Doe
                  </div>
                  <div className="text-gray-700 text-sm">Party A</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-xl group-hover:text-blue-700 transition">
                    789
                  </div>
                  <div className="text-green-600 text-sm font-semibold">
                    56%
                  </div>
                </div>
              </div>
              {/* Candidate Card 2 */}
              <div className="flex items-center bg-gray-50 rounded-lg p-3 hover:bg-green-50 transition group">
                <img
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  alt="Candidate"
                  className="w-12 h-12 rounded-full mr-4 border-2 border-green-400 group-hover:scale-105 transition"
                />
                <div className="flex-1">
                  <div className="font-semibold group-hover:text-green-700 transition">
                    Jane Smith
                  </div>
                  <div className="text-gray-700 text-sm">Party B</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-xl group-hover:text-green-700 transition">
                    345
                  </div>
                  <div className="text-green-600 text-sm font-semibold">
                    24%
                  </div>
                </div>
              </div>
              {/* Candidate Card 3 */}
              <div className="flex items-center bg-gray-50 rounded-lg p-3 hover:bg-yellow-50 transition group">
                <img
                  src="https://randomuser.me/api/portraits/men/54.jpg"
                  alt="Candidate"
                  className="w-12 h-12 rounded-full mr-4 border-2 border-yellow-400 group-hover:scale-105 transition"
                />
                <div className="flex-1">
                  <div className="font-semibold group-hover:text-yellow-700 transition">
                    Alex Lee
                  </div>
                  <div className="text-gray-700 text-sm">Party C</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-xl group-hover:text-yellow-700 transition">
                    100
                  </div>
                  <div className="text-green-600 text-sm font-semibold">7%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-gray-900 text-gray-200 py-10 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Address */}
          <div>
            <div className="flex items-center mb-4">
              <span className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-2xl font-bold mr-2">
                V
              </span>
              <span className="text-xl font-semibold">VoteApp</span>
            </div>
            <p className="text-gray-400 text-sm">
              123 Blockchain Ave,
              <br />
              Cryptocity, 45678
              <br />
              support@voteapp.com
            </p>
          </div>
          {/* Links 1 */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Product</h3>
            <ul>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Demo
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Integrations
                </a>
              </li>
            </ul>
          </div>
          {/* Links 2 */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Company</h3>
            <ul>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          {/* Links 3 */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Support</h3>
            <ul>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Status
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} VoteApp. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
