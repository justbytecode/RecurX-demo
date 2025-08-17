"use client";
// import Coin3D from "@/components/Coin3D"
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, Link as Links, RefreshCw, CreditCard } from "lucide-react";
import FeatureComponent from "../components/FeatureComponent";
import InfiniteMovingCards from "../components/InfiniteMovingCards";
import SupportedTokens from "../components/SupportedTokens";
import Navbar from "../components/Navbar copy";
// import TawkMessengerReact from "@tawk.to/tawk-messenger-react"
// import TokenDisplay from "@/components/token-display"
import Image from "next/image";
// Docs component removed as requested
const randomDecimal = () => (Math.random() * 0.99 + 0.01).toFixed(2);

const particlesAnimationArray = [
  {
    uint: "btc",
    img: "./supportedCoins/bitcoin.svg",
    amt: randomDecimal(),
  },
  {
    uint: "eth",
    img: "./supportedCoins/ethereum.svg",
    amt: randomDecimal(),
  },
  {
    uint: "usdc",
    img: "/supportedCoins/tether.svg",
    amt: randomDecimal(),
  },
  {
    uint: "btc",
    img: "./supportedCoins/bitcoin.svg",
    amt: randomDecimal(),
  },
  {
    uint: "eth",
    img: "./supportedCoins/ethereum.svg",
    amt: randomDecimal(),
  },
  {
    uint: "usdc",
    img: "/supportedCoins/tether.svg",
    amt: randomDecimal(),
  },
  {
    uint: "btc",
    img: "./supportedCoins/bitcoin.svg",
    amt: randomDecimal(),
  },
  {
    uint: "eth",
    img: "./supportedCoins/ethereum.svg",
    amt: randomDecimal(),
  },
  {
    uint: "usdc",
    img: "/supportedCoins/tether.svg",
    amt: randomDecimal(),
  },
];

export default function Page() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const features = [
    "Decentralized Payments",
    "Zero Transaction Fees",
    "Blockchain Security",
    "Multi-chain Support",
  ];

  const blockchainLogos = [
    {
      name: "Polygon",
      color: "bg-purple-500",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Polygon_Icon.svg/1200px-Polygon_Icon.svg.png",
    },
    {
      name: "Ethereum",
      color: "bg-blue-500",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIwk0uxd9dXApXVYD64uZ6rijuatyapdT9cg&s",
    },
    {
      name: "ChainGPT",
      color: "bg-blue-500",
      img: "https://s2.coinmarketcap.com/static/img/coins/200x200/23756.png",
    },
    {
      name: "Stellar",
      color: "bg-orange-500",
      img: "https://s2.coinmarketcap.com/static/img/coins/200x200/512.png",
    },
    {
      name: "Massa",
      color: "bg-green-500",
      img: "https://pbs.twimg.com/profile_images/1907828434136412160/jLEXYCZ__400x400.jpg",
    },
    {
      name: "BSC",
      color: "bg-yellow-500",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzsqQuXQtX8otkDKdQSNoTT5jQTINBc_cimw&s",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setActiveFeature((prev) => (prev + 1) % features.length);
        setIsVisible(true);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, [features.length]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://embed.tawk.to/67e50a774040b31908c84848/default";
    script.async = true;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Cleanup on unmount
    };
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/session");
        const session = await response.json();
        console.log(session.user);
        if (session && session.user) {
          setIsAuthenticated(true);
          if (session.user.role === "user") {
            window.location.href = "/userdashboard";
            return;
          } else {
            window.location.href = "/dashboard";
            return;
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      }
    };

    checkAuth();
  }, []);

  // Track mouse position for the gradient effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  const handleButtonClick = () => {
    navigate("/wait-list");
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen text-white overflow-hidden relative bg-[#000000]">
        {/* <div className="relative">
        <TawkMessengerReact
          onBeforeLoad={() => {}}
          onStatusChange={() => {}}
          onLoad={() => {}}
          onChatMaximized={() => {}}
          onChatMinimized={() => {}}
          onChatHidden={() => {}}
          onChatStarted={() => {}}
          onChatEnded={() => {}}
          onPrechatSubmit={() => {}}
          onOfflineSubmit={() => {}}
          onChatMessageVisitor={() => {}}
          onChatMessageAgent={() => {}}
          onChatMessageSystem={() => {}}
          onAgentJoinChat={() => {}}
          onAgentLeaveChat={() => {}}
          onChatSatisfaction={() => {}}
          onVisitorNameChanged={() => {}}
          onTagsUpdated={() => {}}
          onUnreadCountChanged={() => {}}
          propertyId="67e50a774040b31908c84848"
          widgetId="1injsi3ti"
        />
      </div> */}

        {/* Enhanced animated background with multiple layers */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.4) 0%, rgba(16, 185, 129, 0.2) 25%, transparent 50%)`,
            transition: "background 0.3s ease",
          }}
        />

        {/* Animated grid pattern overlay */}
        {/* <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
            <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <rect width="80" height="80" fill="url(#smallGrid)" />
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div> */}

        {/* Floating particles */}
        {/* <FloatingParticles /> */}

        {/* Hero Section */}
        <header className="mx-auto pl-[5%] py-20 relative z-10">
          {/* <motion.img
          src="/new_background.png"
          className="absolute right-0 top-0 z-[-10] max-sm:hidden"
          height={900}
          width={900}
          initial={{
            opacity: 0, // Use a value between 0 (transparent) and 1 (opaque)
            filter: "blur(10px) brightness(0.5)",
            transform: "translateX(5px)",
          }}
          animate={{
            opacity: 0.8, // Final opacity value
            filter: "blur(0px) brightness(1)",
            transform: "translateX(0px) scale(1)",
          }}
          transition={{
            duration: 1.5,
            delay: 0.3,
            ease: "easeOut",
          }}
          whileHover={{
            opacity: 1,
            filter: "blur(0px) brightness(1.2)",
            transition: { duration: 0.3 },
          }}
        /> */}
          {/* <motion.img
          src="/featureSection/light.png"
          className="absolute right-20 top-0 z-[-10] max-sm:hidden"
          height={900}
          width={900}
          initial={{
            opacity: 0, // Use a value between 0 (transparent) and 1 (opaque)
            filter: "blur(10px) brightness(0.5)",
            transform: "translateX(5px)",
          }}
          animate={{
            opacity: 0.8, // Final opacity value
            filter: "blur(0px) brightness(1)",
            transform: "translateX(0px) scale(1)",
          }}
          transition={{
            duration: 1.5,
            delay: 0.3,
            ease: "easeOut",
          }}
          whileHover={{
            opacity: 1,
            filter: "blur(0px) brightness(1.2)",
            transition: { duration: 0.3 },
          }}
        /> */}
          <div className="absolute right-0 top-0 z-[-10] max-sm:hidden">
            <svg
              width="794"
              height="1024"
              viewBox="0 0 494 1024"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.6"
                d="M221 598L29.6083 487.5L29.6084 266.5L221 156L412.392 266.5L412.392 487.5L221 598Z"
                stroke="#06171C"
                strokeWidth="10"
              />
              <mask id="path-2-inside-1_5_4433" fill="white">
                <path d="M100 222.869L100 -103.044L382.248 -266L664.497 -103.044L664.497 222.869L382.248 385.825L100 222.869ZM601.105 186.5L601.105 -66.4998L382 -193L162.896 -66.4999L162.896 186.5L382 313L601.105 186.5Z" />
              </mask>
              <path
                d="M100 222.869L100 -103.044L382.248 -266L664.497 -103.044L664.497 222.869L382.248 385.825L100 222.869ZM601.105 186.5L601.105 -66.4998L382 -193L162.896 -66.4999L162.896 186.5L382 313L601.105 186.5Z"
                fill="#131517"
                fillOpacity="0.01"
              />
              <path
                d="M100 222.869L99 222.869L99 223.447L99.5 223.735L100 222.869ZM100 -103.044L99.5 -103.91L99 -103.621L99 -103.044L100 -103.044ZM382.248 -266L382.748 -266.866L382.248 -267.155L381.748 -266.866L382.248 -266ZM664.497 -103.044L665.497 -103.044L665.497 -103.621L664.997 -103.91L664.497 -103.044ZM664.497 222.869L664.997 223.735L665.497 223.447L665.497 222.869L664.497 222.869ZM382.248 385.825L381.748 386.691L382.248 386.98L382.748 386.691L382.248 385.825ZM601.105 186.5L601.605 187.366L602.105 187.078L602.105 186.5L601.105 186.5ZM601.105 -66.4998L602.105 -66.4998L602.105 -67.0772L601.605 -67.3659L601.105 -66.4998ZM382 -193L382.5 -193.866L382 -194.155L381.5 -193.866L382 -193ZM162.896 -66.4999L162.396 -67.3659L161.896 -67.0772L161.896 -66.4999L162.896 -66.4999ZM162.896 186.5L161.896 186.5L161.896 187.077L162.396 187.366L162.896 186.5ZM382 313L381.5 313.866L382 314.155L382.5 313.866L382 313ZM100 222.869L101 222.869L101 -103.044L100 -103.044L99 -103.044L99 222.869L100 222.869ZM100 -103.044L100.5 -102.178L382.748 -265.134L382.248 -266L381.748 -266.866L99.5 -103.91L100 -103.044ZM382.248 -266L381.748 -265.134L663.997 -102.178L664.497 -103.044L664.997 -103.91L382.748 -266.866L382.248 -266ZM664.497 -103.044L663.497 -103.044L663.497 222.869L664.497 222.869L665.497 222.869L665.497 -103.044L664.497 -103.044ZM664.497 222.869L663.997 222.003L381.748 384.959L382.248 385.825L382.748 386.691L664.997 223.735L664.497 222.869ZM382.248 385.825L382.748 384.959L100.5 222.003L100 222.869L99.5 223.735L381.748 386.691L382.248 385.825ZM601.105 186.5L602.105 186.5L602.105 -66.4998L601.105 -66.4998L600.105 -66.4998L600.105 186.5L601.105 186.5ZM601.105 -66.4998L601.605 -67.3659L382.5 -193.866L382 -193L381.5 -192.134L600.605 -65.6338L601.105 -66.4998ZM382 -193L381.5 -193.866L162.396 -67.3659L162.896 -66.4999L163.396 -65.6338L382.5 -192.134L382 -193ZM162.896 -66.4999L161.896 -66.4999L161.896 186.5L162.896 186.5L163.896 186.5L163.896 -66.4999L162.896 -66.4999ZM162.896 186.5L162.396 187.366L381.5 313.866L382 313L382.5 312.134L163.396 185.634L162.896 186.5ZM382 313L382.5 313.866L601.605 187.366L601.105 186.5L600.605 185.634L381.5 312.134L382 313Z"
                fill="url(#paint0_linear_5_4433)"
                mask="url(#path-2-inside-1_5_4433)"
              />
              <g opacity="0.1">
                <path
                  d="M392.294 624.104L340.767 648.188L340.767 768.044"
                  stroke="#1C75DD"
                  strokeWidth="10"
                />
                <defs>
                  <filter
                    id="blurFilter"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                  >
                    <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
                  </filter>
                </defs>

                <ellipse
                  cx="32.08"
                  cy="96.3949"
                  rx="32.08"
                  ry="96.3949"
                  transform="matrix(0.489754 0.871861 0.871861 -0.489754 301 607.419)"
                  fill="#1C75DD"
                  filter="url(#blurFilter)"
                />

                <mask id="path-6-inside-2_5_4433" fill="white">
                  <path d="M287 618.058V951.766L576 1118.62L865 951.766V618.058L576 451.204L287 618.058ZM793.223 659.109V910.584L575.439 1036.32L357.656 910.584V659.109L575.439 533.372L793.223 659.109Z" />
                </mask>
                <path
                  d="M287 618.058V951.766L576 1118.62L865 951.766V618.058L576 451.204L287 618.058ZM793.223 659.109V910.584L575.439 1036.32L357.656 910.584V659.109L575.439 533.372L793.223 659.109Z"
                  fill="#131517"
                  fillOpacity="0.01"
                />
                <path
                  d="M287 618.058H286V617.481L286.5 617.192L287 618.058ZM287 951.766L286.5 952.633L286 952.344V951.766H287ZM576 1118.62L576.5 1119.49L576 1119.78L575.5 1119.49L576 1118.62ZM865 951.766H866V952.344L865.5 952.633L865 951.766ZM865 618.058L865.5 617.192L866 617.481V618.058H865ZM576 451.204L575.5 450.338L576 450.049L576.5 450.338L576 451.204ZM793.223 659.109L793.723 658.243L794.223 658.532V659.109H793.223ZM793.223 910.584H794.223V911.161L793.723 911.45L793.223 910.584ZM575.439 1036.32L575.939 1037.19L575.439 1037.48L574.939 1037.19L575.439 1036.32ZM357.656 910.584L357.156 911.45L356.656 911.161V910.584H357.656ZM357.656 659.109H356.656V658.532L357.156 658.243L357.656 659.109ZM575.439 533.372L574.939 532.506L575.439 532.217L575.939 532.506L575.439 533.372ZM287 618.058H288V951.766H287H286V618.058H287ZM287 951.766L287.5 950.9L576.5 1117.75L576 1118.62L575.5 1119.49L286.5 952.633L287 951.766ZM576 1118.62L575.5 1117.75L864.5 950.9L865 951.766L865.5 952.633L576.5 1119.49L576 1118.62ZM865 951.766H864V618.058H865H866V951.766H865ZM865 618.058L864.5 618.924L575.5 452.07L576 451.204L576.5 450.338L865.5 617.192L865 618.058ZM576 451.204L576.5 452.07L287.5 618.924L287 618.058L286.5 617.192L575.5 450.338L576 451.204ZM793.223 659.109H794.223V910.584H793.223H792.223V659.109H793.223ZM793.223 910.584L793.723 911.45L575.939 1037.19L575.439 1036.32L574.939 1035.46L792.723 909.718L793.223 910.584ZM575.439 1036.32L574.939 1037.19L357.156 911.45L357.656 910.584L358.156 909.718L575.939 1035.46L575.439 1036.32ZM357.656 910.584H356.656V659.109H357.656H358.656V910.584H357.656ZM357.656 659.109L357.156 658.243L574.939 532.506L575.439 533.372L575.939 534.238L358.156 659.975L357.656 659.109ZM575.439 533.372L575.939 532.506L793.723 658.243L793.223 659.109L792.723 659.975L574.939 534.238L575.439 533.372Z"
                  fill="url(#paint1_linear_5_4433)"
                  mask="url(#path-6-inside-2_5_4433)"
                />
              </g>
              <defs>
                <linearGradient
                  id="paint0_linear_5_4433"
                  x1="664.497"
                  y1="235.277"
                  x2="264.137"
                  y2="-195.689"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#1C75DD" stopOpacity="0.7" />
                  <stop offset="1" stopColor="#1C75DD" stopOpacity="0" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_5_4433"
                  x1="865"
                  y1="605.354"
                  x2="455.064"
                  y2="1046.63"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#1C75DD" stopOpacity="0.7" />
                  <stop offset="1" stopColor="#1C75DD" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="absolute left-0 top-0 z-[-10] lg:hidden">
            <svg
              width="794"
              height="1024"
              viewBox="0 0 494 1024"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.6"
                d="M221 598L29.6083 487.5L29.6084 266.5L221 156L412.392 266.5L412.392 487.5L221 598Z"
                stroke="#06171C"
                strokeWidth="10"
              />
              <mask id="path-2-inside-1_5_4433" fill="white">
                <path d="M100 222.869L100 -103.044L382.248 -266L664.497 -103.044L664.497 222.869L382.248 385.825L100 222.869ZM601.105 186.5L601.105 -66.4998L382 -193L162.896 -66.4999L162.896 186.5L382 313L601.105 186.5Z" />
              </mask>
              <path
                d="M100 222.869L100 -103.044L382.248 -266L664.497 -103.044L664.497 222.869L382.248 385.825L100 222.869ZM601.105 186.5L601.105 -66.4998L382 -193L162.896 -66.4999L162.896 186.5L382 313L601.105 186.5Z"
                fill="#131517"
                fillOpacity="0.01"
              />
              <path
                d="M100 222.869L99 222.869L99 223.447L99.5 223.735L100 222.869ZM100 -103.044L99.5 -103.91L99 -103.621L99 -103.044L100 -103.044ZM382.248 -266L382.748 -266.866L382.248 -267.155L381.748 -266.866L382.248 -266ZM664.497 -103.044L665.497 -103.044L665.497 -103.621L664.997 -103.91L664.497 -103.044ZM664.497 222.869L664.997 223.735L665.497 223.447L665.497 222.869L664.497 222.869ZM382.248 385.825L381.748 386.691L382.248 386.98L382.748 386.691L382.248 385.825ZM601.105 186.5L601.605 187.366L602.105 187.078L602.105 186.5L601.105 186.5ZM601.105 -66.4998L602.105 -66.4998L602.105 -67.0772L601.605 -67.3659L601.105 -66.4998ZM382 -193L382.5 -193.866L382 -194.155L381.5 -193.866L382 -193ZM162.896 -66.4999L162.396 -67.3659L161.896 -67.0772L161.896 -66.4999L162.896 -66.4999ZM162.896 186.5L161.896 186.5L161.896 187.077L162.396 187.366L162.896 186.5ZM382 313L381.5 313.866L382 314.155L382.5 313.866L382 313ZM100 222.869L101 222.869L101 -103.044L100 -103.044L99 -103.044L99 222.869L100 222.869ZM100 -103.044L100.5 -102.178L382.748 -265.134L382.248 -266L381.748 -266.866L99.5 -103.91L100 -103.044ZM382.248 -266L381.748 -265.134L663.997 -102.178L664.497 -103.044L664.997 -103.91L382.748 -266.866L382.248 -266ZM664.497 -103.044L663.497 -103.044L663.497 222.869L664.497 222.869L665.497 222.869L665.497 -103.044L664.497 -103.044ZM664.497 222.869L663.997 222.003L381.748 384.959L382.248 385.825L382.748 386.691L664.997 223.735L664.497 222.869ZM382.248 385.825L382.748 384.959L100.5 222.003L100 222.869L99.5 223.735L381.748 386.691L382.248 385.825ZM601.105 186.5L602.105 186.5L602.105 -66.4998L601.105 -66.4998L600.105 -66.4998L600.105 186.5L601.105 186.5ZM601.105 -66.4998L601.605 -67.3659L382.5 -193.866L382 -193L381.5 -192.134L600.605 -65.6338L601.105 -66.4998ZM382 -193L381.5 -193.866L162.396 -67.3659L162.896 -66.4999L163.396 -65.6338L382.5 -192.134L382 -193ZM162.896 -66.4999L161.896 -66.4999L161.896 186.5L162.896 186.5L163.896 186.5L163.896 -66.4999L162.896 -66.4999ZM162.896 186.5L162.396 187.366L381.5 313.866L382 313L382.5 312.134L163.396 185.634L162.896 186.5ZM382 313L382.5 313.866L601.605 187.366L601.105 186.5L600.605 185.634L381.5 312.134L382 313Z"
                fill="url(#paint0_linear_5_4433)"
                mask="url(#path-2-inside-1_5_4433)"
              />
              <g opacity="0.1">
                <path
                  d="M392.294 624.104L340.767 648.188L340.767 768.044"
                  stroke="#1C75DD"
                  strokeWidth="10"
                />
                <defs>
                  <filter
                    id="blurFilter"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                  >
                    <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
                  </filter>
                </defs>

                <ellipse
                  cx="32.08"
                  cy="96.3949"
                  rx="32.08"
                  ry="96.3949"
                  transform="matrix(0.489754 0.871861 0.871861 -0.489754 301 607.419)"
                  fill="#1C75DD"
                  filter="url(#blurFilter)"
                />

                <mask id="path-6-inside-2_5_4433" fill="white">
                  <path d="M287 618.058V951.766L576 1118.62L865 951.766V618.058L576 451.204L287 618.058ZM793.223 659.109V910.584L575.439 1036.32L357.656 910.584V659.109L575.439 533.372L793.223 659.109Z" />
                </mask>
                <path
                  d="M287 618.058V951.766L576 1118.62L865 951.766V618.058L576 451.204L287 618.058ZM793.223 659.109V910.584L575.439 1036.32L357.656 910.584V659.109L575.439 533.372L793.223 659.109Z"
                  fill="#131517"
                  fillOpacity="0.01"
                />
                <path
                  d="M287 618.058H286V617.481L286.5 617.192L287 618.058ZM287 951.766L286.5 952.633L286 952.344V951.766H287ZM576 1118.62L576.5 1119.49L576 1119.78L575.5 1119.49L576 1118.62ZM865 951.766H866V952.344L865.5 952.633L865 951.766ZM865 618.058L865.5 617.192L866 617.481V618.058H865ZM576 451.204L575.5 450.338L576 450.049L576.5 450.338L576 451.204ZM793.223 659.109L793.723 658.243L794.223 658.532V659.109H793.223ZM793.223 910.584H794.223V911.161L793.723 911.45L793.223 910.584ZM575.439 1036.32L575.939 1037.19L575.439 1037.48L574.939 1037.19L575.439 1036.32ZM357.656 910.584L357.156 911.45L356.656 911.161V910.584H357.656ZM357.656 659.109H356.656V658.532L357.156 658.243L357.656 659.109ZM575.439 533.372L574.939 532.506L575.439 532.217L575.939 532.506L575.439 533.372ZM287 618.058H288V951.766H287H286V618.058H287ZM287 951.766L287.5 950.9L576.5 1117.75L576 1118.62L575.5 1119.49L286.5 952.633L287 951.766ZM576 1118.62L575.5 1117.75L864.5 950.9L865 951.766L865.5 952.633L576.5 1119.49L576 1118.62ZM865 951.766H864V618.058H865H866V951.766H865ZM865 618.058L864.5 618.924L575.5 452.07L576 451.204L576.5 450.338L865.5 617.192L865 618.058ZM576 451.204L576.5 452.07L287.5 618.924L287 618.058L286.5 617.192L575.5 450.338L576 451.204ZM793.223 659.109H794.223V910.584H793.223H792.223V659.109H793.223ZM793.223 910.584L793.723 911.45L575.939 1037.19L575.439 1036.32L574.939 1035.46L792.723 909.718L793.223 910.584ZM575.439 1036.32L574.939 1037.19L357.156 911.45L357.656 910.584L358.156 909.718L575.939 1035.46L575.439 1036.32ZM357.656 910.584H356.656V659.109H357.656H358.656V910.584H357.656ZM357.656 659.109L357.156 658.243L574.939 532.506L575.439 533.372L575.939 534.238L358.156 659.975L357.656 659.109ZM575.439 533.372L575.939 532.506L793.723 658.243L793.223 659.109L792.723 659.975L574.939 534.238L575.439 533.372Z"
                  fill="url(#paint1_linear_5_4433)"
                  mask="url(#path-6-inside-2_5_4433)"
                />
              </g>
              <defs>
                <linearGradient
                  id="paint0_linear_5_4433"
                  x1="664.497"
                  y1="235.277"
                  x2="264.137"
                  y2="-195.689"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#1C75DD" stopOpacity="0.7" />
                  <stop offset="1" stopColor="#1C75DD" stopOpacity="0" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_5_4433"
                  x1="865"
                  y1="605.354"
                  x2="455.064"
                  y2="1046.63"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#1C75DD" stopOpacity="0.7" />
                  <stop offset="1" stopColor="#1C75DD" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* mobile view light  */}
          {/* <motion.img
          src="/featureSection/light.png"
          className="absolute right-[10%] top-0 z-[-10] sm:hidden"
          height={900}
          width={900}
          initial={{
            opacity: 0, // Use a value between 0 (transparent) and 1 (opaque)
            filter: "blur(10px) brightness(0.5)",
            transform: "translateX(5px)",
          }}
          animate={{
            opacity: 0.8, // Final opacity value
            filter: "blur(0px) brightness(1)",
            transform: "translateX(0px) scale(1)",
          }}
          transition={{
            duration: 1.5,
            delay: 0.3,
            ease: "easeOut",
          }}
          whileHover={{
            opacity: 1,
            filter: "blur(0px) brightness(1.2)",
            transition: { duration: 0.3 },
          }}
        /> */}

          <div className="flex flex-col lg:flex-row items-center justify-between ml:20 mt-10 md:mt-24 gap-8 md:gap-12">
            {/* Left side content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="flex-1 max-w-2xl"
            >
              {/* Logo/Brand */}

              {/* Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 tracking-tight leading-[1.1]"
              >
                {/* <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600">
                RecurX
              </span> */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex ">
                    <span className="bg-[#43CF94] w-3 h-3 rounded-full blur-[7.3]"></span>
                  </div>
                  <div className="text-sm text-gray-400  font-normal tracking-wide ">
                    Trusted by{" "}
                    <span className="text-blue-400 font-medium">1,000+</span>{" "}
                    Merchants worldwide
                  </div>
                </div>

                <span className="text-white">The Future of</span>
                <br />
                <span className="text-white">Onchain Payments</span>
              </motion.h1>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="text-xl text-gray-300 mb-8 sm:mb-17 leading-relaxed "
              >
                Create and manage your payments with RecurX, with
                <span className="relative inline-block mx-1">
                  <span className="font-extrabold text-[#1C75DD]">
                    0% Transaction fee
                  </span>
                </span>
                powered by blockchain technology.
              </motion.p>

              {/* CTA Button - moved to top */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="mb-12 flex justify-start"
              >
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group"
                >
                  <Link
                    href="/signin"
                    className="relative w-[9rem]  lg:w-[20rem] rounded-3xl flex items-center justify-center gap-2 bg-[#1C75DD] hover:from-blue-500 hover:to-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4  shadow-lg transition-all duration-300 text-base sm:text-lg font-medium"
                  >
                    Try Now
                  </Link>
                </motion.div>
              </motion.div>

              <div className="absolute left-2 top-[30rem] flex max-sm:hidden z-[-10]">
                <svg
                  width="209"
                  height="453"
                  viewBox="0 0 209 453"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.6"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M208.677 1L166.335 1L166.335 289.569L-47 416.09L-25.4013 452.509L208.677 313.686L208.677 1Z"
                    fill="url(#paint0_linear_5_4397)"
                  />
                  <foreignObject
                    x="-117.274"
                    y="-69.2"
                    width="396.151"
                    height="591.983"
                  >
                    <div
                      xmlns="http://www.w3.org/1999/xhtml"
                      style={{
                        backdropFilter: "blur(35px)",
                        clipPath: "url(#bgblur_0_5_4397_clip_path)",
                        height: "100%",
                        width: "100%",
                      }}
                    ></div>
                  </foreignObject>
                  <path
                    data-figma-bg-blur-radius="70"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M208.677 1L166.335 1L166.335 289.569L-47 416.09L-25.4013 452.509L208.677 313.686L208.677 1Z"
                    stroke="url(#paint1_linear_5_4397)"
                    strokeWidth="0.4"
                  />
                  <defs>
                    <clipPath
                      id="bgblur_0_5_4397_clip_path"
                      transform="translate(117.274 69.2)"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M208.677 1L166.335 1L166.335 289.569L-47 416.09L-25.4013 452.509L208.677 313.686L208.677 1Z"
                      />
                    </clipPath>
                    <linearGradient
                      id="paint0_linear_5_4397"
                      x1="183.272"
                      y1="47.5761"
                      x2="6.12537"
                      y2="297.392"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0.0262068" stopColor="#0C0C0C" />
                      <stop offset="0.400772" stopColor="#06171C" />
                      <stop offset="0.676921" stopColor="#06161B" />
                      <stop offset="1" stopColor="#0C0C0C" />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_5_4397"
                      x1="173.5"
                      y1="144"
                      x2="124"
                      y2="343.5"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop
                        offset="0.0818655"
                        stopColor="#14AEDE"
                        stopOpacity="0"
                      />
                      <stop offset="0.304614" stopColor="#1C75DD" />
                      <stop
                        offset="0.855026"
                        stopColor="#14AEDE"
                        stopOpacity="0"
                      />
                      <stop
                        offset="0.983172"
                        stopColor="#14AEDE"
                        stopOpacity="0"
                      />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </motion.div>

            {/* Right side - 3D visualization */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex-1 relative"
            >
              {/* Content Layer */}
              <div className="relative z-10 w-full h-[0px] flex flex-col justify-center items-center">
                {/* <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="text-2xl md:text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 drop-shadow-[0_0_10px_rgba(255,215,0,0.5)] animate-pulse"
              >
                Seamless payments for better Future
              </motion.h2> 
              */}

                {/* token goes here  */}
                {/* <Coin3D /> */}

                {/* uncomment afterwards coin display*/}
                {/* <TokenDisplay /> */}

                {/* <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.8 }}
                  className="flex justify-center mt-4"
                >
                  <Link href="/airdrop">
                    <button className=" cursor-pointer bg-gradient-to-r from-indigo-700 via-indigo-600 to-blue-500 hover:from-blue-400 hover:to-blue-400 text-white px-8 py-3 rounded-xl text-base font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300/50 ">
                        Get Your Token
                    </button>
                  </Link>
              </motion.div> */}

                {/* Connection lines */}
                {/* <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ zIndex: 5 }}
              >
                <motion.path
                  d="M200,250 C250,150 350,150 400,250"
                  stroke="url(#blueGradient)"
                  strokeWidth="1"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.5 }}
                  transition={{ duration: 2, delay: 1 }}
                />
                <motion.path
                  d="M200,250 C150,350 250,350 400,250"
                  stroke="url(#purpleGradient)"
                  strokeWidth="1"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.5 }}
                  transition={{ duration: 2, delay: 1.5 }}
                />
                <defs>
                  <linearGradient
                    id="blueGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                    <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
                  </linearGradient>
                  <linearGradient
                    id="purpleGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.2" />
                    <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
              </svg> */}
              </div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.7 }}
          className=" transform  flex flex-col items-center"
        >
          <span className="text-sm text-gray-400 mb-2">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border-2 border-gray-500 flex items-center justify-center"
          >
            <motion.div
              animate={{ height: [5, 10, 5] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className="w-1 bg-blue-500 rounded-full"
            />
          </motion.div>
        </motion.div> */}

          <div className="flex flex-col items-center justify-center">
            <div className="border-t border-gray-800 pt-8">
              <p className="text-gray-400 text-sm mb-6 text-center">
                Supported by
              </p>

              {/* Blockchain Logos */}
              <div className="flex flex-wrap items-center gap-6">
                {blockchainLogos.map((chain, index) => (
                  <div
                    key={chain.name}
                    className="flex flex-col gap-10 items-center space-x-3 opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <img
                      className="w-12 h-12 rounded-full"
                      src={chain.img}
                      alt={chain.name}
                    />
                    <span className="text-gray-300 font-medium">
                      {chain.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* Features Section */}
        {/* <section className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-center mb-16"
        >
          <h2
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
            style={{
              background:
                "linear-gradient(to right, #3b82f6, #8b5cf6, #10b981)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Why Choose RecurX ?
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto text-xl max-sm:hidden">
            Our platform combines the best of blockchain technology with
            user-friendly design to revolutionize subscription payments.
          </p>
          <p className="text-gray-300 max-w-3xl mx-auto text-xl sm:hidden">
            Zero‑Fee, Decentralized Subscriptions Powered by Blockchain.
          </p>
        </motion.div>

        <InfiniteMovingCards />
      </section> */}

        <section>
          <div className="min-h-screen bg-black  text-white p-6">
            <div className=" max-w-[90rem]  mx-auto">
              {/* Header */}
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  Powerful superfast payments
                </h1>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Action Buttons */}
                <div className="space-y-4">
                  <div className="bg-[#2A2A2A] rounded-2xl p-6 h-[30rem]">
                    <div className="flex flex-row items-center justify-end gap-2">
                      <span className="h-2 w-2 p-1 bg-red-500 rounded-full"></span>
                      <span className="h-2 w-2 p-1 bg-yellow-500 rounded-full"></span>
                      <span className="h-2 w-2 p-1 bg-green-500 rounded-full"></span>
                    </div>
                    <h3 className="text-xl font-semibold mb-6">
                      Pay With Ease
                    </h3>

                    <div className="space-y-3 relative mt-20">
                      <img
                        src="/bg-image.png"
                        alt="bg-back"
                        className="h-full z-1 absolute inset-0 opacity-50"
                      />
                      <button className=" bg-black  text-white py-3 px-4 rounded-xl font-medium transition-colors flex items-center justify-between">
                        Tip with ⚡ Pay
                      </button>

                      <button className=" bg-black text-white py-3 px-4 rounded-xl font-medium transition-colors flex items-center justify-between">
                        Buy with ⚡ Pay
                      </button>

                      <button className=" bg-black text-white py-3 px-4 rounded-xl font-medium transition-colors flex items-center justify-between">
                        Book with ⚡ Pay
                      </button>

                      <button className=" bg-black  text-white py-3 px-4 rounded-xl font-medium transition-colors flex items-center justify-between">
                        Order with ⚡ Pay
                      </button>

                      <button className=" bg-black  text-white py-3 px-4 rounded-xl font-medium transition-colors flex items-center justify-between">
                        Contribute with ⚡ Pay
                      </button>
                    </div>
                  </div>
                </div>

                {/* Middle Column */}
                <div className="space-y-6 space-x-3">
                  {/* Gas Fee Card */}
                  <div className="bg-gray-900 rounded-2xl p-6 relative overflow-hidden">
                    {/* Background Image */}
                    <img
                      src="./Group 1000004806.png"
                      alt="bg"
                      className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
                    />

                    {/* Content */}
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-4">
                        <svg
                          width="12"
                          height="16"
                          viewBox="0 0 12 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3 12C2.85166 12 2.70666 12.0469 2.58332 12.1348C2.45999 12.2227 2.36386 12.3477 2.30709 12.4939C2.25032 12.64 2.23547 12.8009 2.26441 12.9561C2.29335 13.1113 2.36478 13.2538 2.46967 13.3657C2.57456 13.4776 2.7082 13.5538 2.85368 13.5846C2.99917 13.6155 3.14997 13.5997 3.28701 13.5391C3.42406 13.4786 3.54119 13.376 3.6236 13.2445C3.70601 13.1129 3.75 12.9582 3.75 12.8C3.75 12.5878 3.67098 12.3843 3.53033 12.2343C3.38968 12.0843 3.19891 12 3 12ZM3 7.2C2.85166 7.2 2.70666 7.24692 2.58332 7.33482C2.45999 7.42273 2.36386 7.54767 2.30709 7.69385C2.25032 7.84003 2.23547 8.00089 2.26441 8.15607C2.29335 8.31126 2.36478 8.4538 2.46967 8.56569C2.57456 8.67757 2.7082 8.75376 2.85368 8.78463C2.99917 8.8155 3.14997 8.79965 3.28701 8.7391C3.42406 8.67855 3.54119 8.57602 3.6236 8.44446C3.70601 8.3129 3.75 8.15823 3.75 8C3.75 7.78783 3.67098 7.58434 3.53033 7.43431C3.38968 7.28429 3.19891 7.2 3 7.2ZM3 2.4C2.85166 2.4 2.70666 2.44692 2.58332 2.53482C2.45999 2.62273 2.36386 2.74767 2.30709 2.89385C2.25032 3.04003 2.23547 3.20089 2.26441 3.35607C2.29335 3.51126 2.36478 3.6538 2.46967 3.76569C2.57456 3.87757 2.7082 3.95376 2.85368 3.98463C2.99917 4.0155 3.14997 3.99965 3.28701 3.9391C3.42406 3.87855 3.54119 3.77602 3.6236 3.64446C3.70601 3.5129 3.75 3.35823 3.75 3.2C3.75 2.98783 3.67098 2.78434 3.53033 2.63431C3.38968 2.48429 3.19891 2.4 3 2.4ZM12 2.4C12 1.76348 11.7629 1.15303 11.341 0.702944C10.919 0.252856 10.3467 0 9.75 0H2.25C1.65326 0 1.08097 0.252856 0.65901 0.702944C0.237053 1.15303 0 1.76348 0 2.4V4C0.00330796 4.59204 0.211658 5.16189 0.585 5.6C0.211658 6.03811 0.00330796 6.60796 0 7.2V8.8C0.00330796 9.39204 0.211658 9.96189 0.585 10.4C0.211658 10.8381 0.00330796 11.408 0 12V13.6C0 14.2365 0.237053 14.847 0.65901 15.2971C1.08097 15.7471 1.65326 16 2.25 16H9.75C10.3467 16 10.919 15.7471 11.341 15.2971C11.7629 14.847 12 14.2365 12 13.6V12C11.9967 11.408 11.7883 10.8381 11.415 10.4C11.7883 9.96189 11.9967 9.39204 12 8.8V7.2C11.9967 6.60796 11.7883 6.03811 11.415 5.6C11.7883 5.16189 11.9967 4.59204 12 4V2.4ZM10.5 13.6C10.5 13.8122 10.421 14.0157 10.2803 14.1657C10.1397 14.3157 9.94891 14.4 9.75 14.4H2.25C2.05109 14.4 1.86032 14.3157 1.71967 14.1657C1.57902 14.0157 1.5 13.8122 1.5 13.6V12C1.5 11.7878 1.57902 11.5843 1.71967 11.4343C1.86032 11.2843 2.05109 11.2 2.25 11.2H9.75C9.94891 11.2 10.1397 11.2843 10.2803 11.4343C10.421 11.5843 10.5 11.7878 10.5 12V13.6ZM10.5 8.8C10.5 9.01217 10.421 9.21566 10.2803 9.36569C10.1397 9.51571 9.94891 9.6 9.75 9.6H2.25C2.05109 9.6 1.86032 9.51571 1.71967 9.36569C1.57902 9.21566 1.5 9.01217 1.5 8.8V7.2C1.5 6.98783 1.57902 6.78434 1.71967 6.63432C1.86032 6.48429 2.05109 6.4 2.25 6.4H9.75C9.94891 6.4 10.1397 6.48429 10.2803 6.63432C10.421 6.78434 10.5 6.98783 10.5 7.2V8.8ZM10.5 4C10.5 4.21217 10.421 4.41566 10.2803 4.56569C10.1397 4.71571 9.94891 4.8 9.75 4.8H2.25C2.05109 4.8 1.86032 4.71571 1.71967 4.56569C1.57902 4.41566 1.5 4.21217 1.5 4V2.4C1.5 2.18783 1.57902 1.98434 1.71967 1.83431C1.86032 1.68429 2.05109 1.6 2.25 1.6H9.75C9.94891 1.6 10.1397 1.68429 10.2803 1.83431C10.421 1.98434 10.5 2.18783 10.5 2.4V4Z"
                            fill="#444546"
                          />
                        </svg>
                        <h3 className="text-lg font-semibold text-white">
                          $0 Gas Fee
                        </h3>
                      </div>

                      <div className="text-gray-300 text-sm space-y-1">
                        <p>We don't take fees on NCX transactions</p>
                        <p>We process fast</p>
                        <p>We secure</p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-gray-800">
                        <p className="text-sm">
                          <span className="text-white font-semibold">You</span>{" "}
                          <span className="text-green-400 font-semibold">
                            pay
                          </span>{" "}
                          <span className="text-white font-semibold">
                            with ease
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    {/* Security Card */}
                    <div className=" rounded-2xl p-6 bg-slate-600  relative h-[15rem]">
                      <img
                        className="absolute z-1  w-full h-full inset-0"
                        src="./Group 1000004808.png"
                        alt="bg-1"
                      />
                      <div className="flex flex-col items-start gap-3 mb-4 relative z-10 mt-10">
                        <svg
                          className="opacity-50"
                          width="24"
                          height="26"
                          viewBox="0 0 24 26"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g style={{ "mix-blend-mode": "overlay" }}>
                            <path
                              d="M9.33333 20.8C9.68696 20.8 10.0261 20.663 10.2761 20.4192C10.5262 20.1754 10.6667 19.8448 10.6667 19.5V11.7C10.6667 11.3552 10.5262 11.0246 10.2761 10.7808C10.0261 10.537 9.68696 10.4 9.33333 10.4C8.97971 10.4 8.64057 10.537 8.39052 10.7808C8.14048 11.0246 8 11.3552 8 11.7V19.5C8 19.8448 8.14048 20.1754 8.39052 20.4192C8.64057 20.663 8.97971 20.8 9.33333 20.8ZM22.6667 5.2H17.3333V3.9C17.3333 2.86566 16.9119 1.87368 16.1618 1.14228C15.4116 0.410892 14.3942 0 13.3333 0H10.6667C9.6058 0 8.58838 0.410892 7.83824 1.14228C7.08809 1.87368 6.66667 2.86566 6.66667 3.9V5.2H1.33333C0.979711 5.2 0.640573 5.33696 0.390524 5.58076C0.140476 5.82456 0 6.15522 0 6.5C0 6.84478 0.140476 7.17544 0.390524 7.41924C0.640573 7.66304 0.979711 7.8 1.33333 7.8H2.66667V22.1C2.66667 23.1343 3.08809 24.1263 3.83824 24.8577C4.58839 25.5891 5.6058 26 6.66667 26H17.3333C18.3942 26 19.4116 25.5891 20.1618 24.8577C20.9119 24.1263 21.3333 23.1343 21.3333 22.1V7.8H22.6667C23.0203 7.8 23.3594 7.66304 23.6095 7.41924C23.8595 7.17544 24 6.84478 24 6.5C24 6.15522 23.8595 5.82456 23.6095 5.58076C23.3594 5.33696 23.0203 5.2 22.6667 5.2ZM9.33333 3.9C9.33333 3.55522 9.47381 3.22456 9.72386 2.98076C9.97391 2.73696 10.313 2.6 10.6667 2.6H13.3333C13.687 2.6 14.0261 2.73696 14.2761 2.98076C14.5262 3.22456 14.6667 3.55522 14.6667 3.9V5.2H9.33333V3.9ZM18.6667 22.1C18.6667 22.4448 18.5262 22.7754 18.2761 23.0192C18.0261 23.263 17.687 23.4 17.3333 23.4H6.66667C6.31305 23.4 5.97391 23.263 5.72386 23.0192C5.47381 22.7754 5.33333 22.4448 5.33333 22.1V7.8H18.6667V22.1ZM14.6667 20.8C15.0203 20.8 15.3594 20.663 15.6095 20.4192C15.8595 20.1754 16 19.8448 16 19.5V11.7C16 11.3552 15.8595 11.0246 15.6095 10.7808C15.3594 10.537 15.0203 10.4 14.6667 10.4C14.313 10.4 13.9739 10.537 13.7239 10.7808C13.4738 11.0246 13.3333 11.3552 13.3333 11.7V19.5C13.3333 19.8448 13.4738 20.1754 13.7239 20.4192C13.9739 20.663 14.313 20.8 14.6667 20.8Z"
                              fill="white"
                            />
                          </g>
                        </svg>

                        <h3 className="text-lg font-semibold">
                          Your data always belongs to you
                        </h3>
                      </div>

                      <p className="text-slate-200 text-sm relative z-10">
                        End-to-end{" "}
                        <span className="text-red-500">encryption</span> and{" "}
                        <span className="text-red-500">decentralized</span>{" "}
                        architecture
                      </p>
                    </div>

                    {/* Privacy Card */}
                    <div className="bg-slate-800 rounded-2xl p-6 relative">
                      <img
                        src="./Group 1000004809.png"
                        alt="bg"
                        className="absolute z-1 inset-0 w-full h-full"
                      />
                      <div className="flex  flex-col items-start gap-3 mb-4 relative z-10 mt-10">
                        <svg
                          className="opacity-45"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g style={{ "mix-blend-mode": "overlay" }}>
                            <path
                              d="M10.7276 4.89849C11.1483 4.834 11.5734 4.80192 11.999 4.80254C15.8131 4.80254 19.3993 7.54918 21.4863 11.999C21.1671 12.6762 20.8066 13.3331 20.4068 13.966C20.2799 14.1625 20.2132 14.3918 20.2149 14.6257C20.2176 14.8874 20.3058 15.1411 20.4661 15.3481C20.6265 15.555 20.8501 15.7038 21.1029 15.7717C21.3557 15.8397 21.6238 15.8231 21.8662 15.7244C22.1087 15.6258 22.3123 15.4505 22.4458 15.2254C23.0046 14.3473 23.4901 13.4247 23.8971 12.4667C23.9614 12.3171 23.9946 12.1559 23.9946 11.993C23.9946 11.8301 23.9614 11.6689 23.8971 11.5192C21.4743 5.894 16.9165 2.40372 11.999 2.40372C11.4361 2.40088 10.874 2.44906 10.3198 2.54765C10.1623 2.57443 10.0116 2.63196 9.87633 2.71698C9.74106 2.80199 9.62386 2.91282 9.53142 3.04313C9.43898 3.17344 9.37311 3.32068 9.33757 3.47644C9.30203 3.63221 9.29752 3.79345 9.3243 3.95096C9.35108 4.10846 9.40861 4.25916 9.49363 4.39443C9.57864 4.5297 9.68947 4.6469 9.81978 4.73934C9.95008 4.83179 10.0973 4.89766 10.2531 4.93319C10.4089 4.96873 10.5701 4.97324 10.7276 4.94646V4.89849ZM2.05589 0.352735C1.94406 0.240905 1.8113 0.152195 1.66519 0.0916729C1.51907 0.0311504 1.36247 0 1.20431 0C1.04616 0 0.889557 0.0311504 0.743443 0.0916729C0.597329 0.152195 0.464566 0.240905 0.352735 0.352735C0.126883 0.578588 0 0.88491 0 1.20431C0 1.52372 0.126883 1.83004 0.352735 2.05589L4.0709 5.76206C2.37442 7.39509 1.02423 9.35307 0.10086 11.5192C0.0348167 11.6705 0.00072777 11.8339 0.00072777 11.999C0.00072777 12.1641 0.0348167 12.3274 0.10086 12.4787C2.52366 18.104 7.08141 21.5942 11.999 21.5942C14.1544 21.5793 16.259 20.9376 18.056 19.7471L21.9421 23.6452C22.0536 23.7576 22.1862 23.8469 22.3324 23.9078C22.4785 23.9686 22.6353 24 22.7936 24C22.952 24 23.1087 23.9686 23.2549 23.9078C23.4011 23.8469 23.5337 23.7576 23.6452 23.6452C23.7576 23.5337 23.8469 23.4011 23.9078 23.2549C23.9686 23.1087 24 22.952 24 22.7936C24 22.6353 23.9686 22.4785 23.9078 22.3324C23.8469 22.1862 23.7576 22.0536 23.6452 21.9421L2.05589 0.352735ZM9.68412 11.3753L12.6227 14.3138C12.42 14.372 12.2098 14.4002 11.999 14.3978C11.3628 14.3978 10.7526 14.1451 10.3028 13.6952C9.85289 13.2453 9.60016 12.6352 9.60016 11.999C9.59771 11.7881 9.62599 11.578 9.68412 11.3753ZM11.999 19.1954C8.18486 19.1954 4.59864 16.4488 2.52366 11.999C3.29859 10.2883 4.39842 8.74448 5.76206 7.45322L7.88501 9.60016C7.38635 10.5103 7.19624 11.5575 7.34319 12.5848C7.49014 13.6121 7.96623 14.5641 8.70004 15.2979C9.43385 16.0317 10.3858 16.5078 11.4131 16.6548C12.4404 16.8017 13.4877 16.6116 14.3978 16.1129L16.3048 17.996C14.9988 18.7647 13.5143 19.1782 11.999 19.1954Z"
                              fill="white"
                            />
                          </g>
                        </svg>

                        <h3 className="text-lg font-semibold">
                          Your privacy is always maintained
                        </h3>
                      </div>

                      <p className="text-white relative z-10 text-sm">
                        We{" "}
                        <span className="text-purple-500">
                          neither store nor sell
                        </span>{" "}
                        your financial information
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6 ">
                  {/* Recurring Payments Card */}
                  <div className="h-[30rem] rounded-2xl p-6 relative">
                    <img
                      src="./Group 1000004810.png"
                      alt="bg"
                      className="absolute z-1 w-full h-full inset-0"
                    />

                    <div className="flex items-center gap-3 mt-[20rem]">
                      <svg
                        width="19"
                        height="26"
                        viewBox="0 0 19 26"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g style={{ "mix-blend-mode": "overlay" }}>
                          <path
                            d="M13.7222 11.7H10.8194V6.5H15.0417C15.3916 6.5 15.7272 6.63696 15.9747 6.88076C16.2221 7.12456 16.3611 7.45522 16.3611 7.8C16.3611 8.14478 16.5001 8.47544 16.7476 8.71924C16.995 8.96304 17.3306 9.1 17.6806 9.1C18.0305 9.1 18.3661 8.96304 18.6135 8.71924C18.861 8.47544 19 8.14478 19 7.8C19 6.76566 18.583 5.77368 17.8406 5.04228C17.0983 4.31089 16.0915 3.9 15.0417 3.9H10.8194V1.3C10.8194 0.955219 10.6804 0.624558 10.433 0.380761C10.1855 0.136964 9.84994 0 9.5 0C9.15006 0 8.81446 0.136964 8.56701 0.380761C8.31957 0.624558 8.18056 0.955219 8.18056 1.3V3.9H5.27778C3.87802 3.9 2.5356 4.44785 1.54583 5.42304C0.55605 6.39823 0 7.72087 0 9.1C0 10.4791 0.55605 11.8018 1.54583 12.777C2.5356 13.7521 3.87802 14.3 5.27778 14.3H8.18056V19.5H3.95833C3.6084 19.5 3.27279 19.363 3.02535 19.1192C2.7779 18.8754 2.63889 18.5448 2.63889 18.2C2.63889 17.8552 2.49988 17.5246 2.25243 17.2808C2.00499 17.037 1.66938 16.9 1.31944 16.9C0.969506 16.9 0.6339 17.037 0.386457 17.2808C0.139013 17.5246 0 17.8552 0 18.2C0 19.2343 0.417038 20.2263 1.15937 20.9577C1.9017 21.6891 2.90852 22.1 3.95833 22.1H8.18056V24.7C8.18056 25.0448 8.31957 25.3754 8.56701 25.6192C8.81446 25.863 9.15006 26 9.5 26C9.84994 26 10.1855 25.863 10.433 25.6192C10.6804 25.3754 10.8194 25.0448 10.8194 24.7V22.1H13.7222C15.122 22.1 16.4644 21.5521 17.4542 20.577C18.4439 19.6018 19 18.2791 19 16.9C19 15.5209 18.4439 14.1982 17.4542 13.223C16.4644 12.2479 15.122 11.7 13.7222 11.7ZM8.18056 11.7H5.27778C4.5779 11.7 3.90669 11.4261 3.4118 10.9385C2.91691 10.4509 2.63889 9.78956 2.63889 9.1C2.63889 8.41044 2.91691 7.74912 3.4118 7.26152C3.90669 6.77393 4.5779 6.5 5.27778 6.5H8.18056V11.7ZM13.7222 19.5H10.8194V14.3H13.7222C14.4221 14.3 15.0933 14.5739 15.5882 15.0615C16.0831 15.5491 16.3611 16.2104 16.3611 16.9C16.3611 17.5896 16.0831 18.2509 15.5882 18.7385C15.0933 19.2261 14.4221 19.5 13.7222 19.5Z"
                            fill="white"
                          />
                        </g>
                      </svg>

                      <h3 className="text-2xl font-semibold relative z-10">
                        Recurring Payments
                      </h3>
                    </div>

                    <p className="text-slate-200 text-sm absolute z-10">
                      Set up and manage subscription plans with flexible payment
                      schedules
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Component */}
        <FeatureComponent />

        {/*skip subscription fees */}
        <section className="w-full flex flex-col items-center justify-center text-center py-12 px-4 ">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Own Your Subscriptions.
            <br />
            <span className="text-blue-400">Skip the Fees</span>
          </h2>
          <p className="text-gray-400 max-w-md mx-auto mb-6 text-sm sm:text-base">
            RecurX blends blockchain security with one-click subscription
            automation — paying or{" "}
            <span className="text-white font-medium">getting paid</span> has
            never been easier.
          </p>
          <img
            src="/featureSection/stacked_tokens.png"
            alt="RecurX Coin Stack"
            className="w-[300px] sm:w-[380px] md:w-[458px] h-auto"
          />
        </section>

        {/* Supported Coin Section */}
        <section className="container mx-auto px-4  relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-center mb-16 mt-15"
          >
            <h2
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
              style={{
                background:
                  "linear-gradient(to right, #3b82f6, #8b5cf6, #10b981)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Supported Tokens ?
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto text-xl">
              Our platform supports a wide range of cryptocurrencies, making
              subscription payments accessible and flexible for users worldwide.
            </p>
          </motion.div>

          <SupportedTokens />
        </section>

        {/* new section- pre sale access */}
        <section className="text-white py-16 px-6 md:px-20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            {/* Left Image */}
            <div className="w-full md:w-1/2 flex justify-center">
              <Image
                src="/featureSection/page_token.png"
                alt="RecurX Token Illustration"
                width={500}
                height={500}
                className="w-full max-w-sm md:max-w-md object-contain"
                priority
              />
            </div>

            {/* Right Text Content */}
            <div className="w-full md:w-1/2 flex flex-col justify-center gap-6">
              <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Introducing our Token <br></br> Powering Fee-Free Crypto
                Subscriptions
              </h2>

              <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                Decentralized, Automated Billing Now Tokenized.<br></br> Join
                The Future Of Subscription Finance <br></br> With{" "}
                <span className="text-white font-semibold">RecurX</span>
              </p>

              <div>
                <button
                  onClick={handleButtonClick}
                  className="mt-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 text-white font-medium hover:from-blue-700 hover:to-blue-500 hover:cursor-pointer transition-all flex items-center gap-2"
                >
                  Pre-Sale Access
                </button>
              </div>
            </div>
          </div>
        </section>
        {/* Floating blockchain elements - simplified */}
        <div className="absolute top-1/4 -left-20 opacity-10 animate-pulse">
          <BlockchainElement />
        </div>
        <div
          className="absolute bottom-1/4 -right-20 opacity-10 animate-pulse"
          style={{ animationDelay: "1s" }}
        >
          <BlockchainElement />
        </div>
      </div>
    </>
  );
}

function FeatureBullet({ icon, text }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-2 md:gap-3"
    >
      <div className="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 rounded-full bg-blue-900/50 flex items-center justify-center">
        {icon}
      </div>
      <span className="text-gray-300 text-sm md:text-base">{text}</span>
    </motion.div>
  );
}

// Orbiting Element Component
function OrbitingElement({ icon, size, distance, duration, delay, label }) {
  return (
    <motion.div
      className="absolute top-1/2 left-1/2"
      initial={{ rotate: delay * 18 }}
      animate={{ rotate: [delay * 18, delay * 18 + 360] }}
      transition={{
        duration,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      }}
      style={{
        width: distance * 2,
        height: distance * 2,
        marginLeft: -distance,
        marginTop: -distance,
      }}
    >
      <motion.div
        className="absolute"
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          top: "50%",
          left: distance - size / 2,
          marginTop: -size / 2,
        }}
        whileHover={{ scale: 1.2 }}
      >
        <div className="w-full h-full rounded-full bg-gray-900/80 backdrop-blur-md border border-gray-700 flex flex-col items-center justify-center">
          {icon}
          <span className="text-xs mt-1 text-gray-300">{label}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Floating Transaction Card
function FloatingTransactionCard({ amount, status, top, left, delay }) {
  return (
    <motion.div
      className="absolute bg-gray-900/70 backdrop-blur-md border border-gray-800 rounded-lg p-3 shadow-lg w-40"
      style={{ top, left }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.7 }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm font-medium text-gray-300">Payment</div>
        <div className="w-2 h-2 rounded-full bg-green-500"></div>
      </div>
      <div className="text-lg font-bold text-white mb-1">{amount}</div>
      <div className="text-xs text-green-400">{status}</div>
    </motion.div>
  );
}

// Floating Particles
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-blue-500/10"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            x: [null, Math.random() * window.innerWidth],
            y: [null, Math.random() * window.innerHeight],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            repeatType: "reverse",
          }}
          style={{
            width: `${Math.random() * 20 + 5}px`,
            height: `${Math.random() * 20 + 5}px`,
          }}
        />
      ))}
    </div>
  );
}

// Secure Payment Badge

// Blockchain Element - Simplified
function BlockchainElement() {
  return (
    <svg
      width="180"
      height="180"
      viewBox="0 0 180 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="45"
        y="45"
        width="90"
        height="90"
        rx="8"
        stroke="white"
        strokeWidth="1.5"
      />
      <rect
        x="65"
        y="65"
        width="50"
        height="50"
        rx="4"
        stroke="white"
        strokeWidth="1.5"
      />
      <line x1="45" y1="90" x2="180" y2="90" stroke="white" strokeWidth="1.5" />
      <line x1="90" y1="45" x2="90" y2="180" stroke="white" strokeWidth="1.5" />
    </svg>
  );
}
