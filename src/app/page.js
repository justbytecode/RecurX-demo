"use client";
// import Coin3D from "@/components/Coin3D"
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion} from "framer-motion";
import FeatureComponent from "../components/FeatureComponent";
import InfiniteMovingCards from "../components/InfiniteMovingCards";
import SupportedTokens from "../components/SupportedTokens";
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
    { name: "Polygon", color: "bg-purple-500",img:"https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Polygon_Icon.svg/1200px-Polygon_Icon.svg.png" },
    { name: "Ethereum", color: "bg-blue-500",img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIwk0uxd9dXApXVYD64uZ6rijuatyapdT9cg&s" },
    { name: "Steallar", color: "bg-orange-500",img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIWizWUO_fQh1m7I7n5tYrqBuRVpHuQWCe3bhEyVA42cv1ckaUZKMerl5a4i7a69Z4bxA&usqp=CAU" },
    { name: "Massa", color: "bg-green-500",img:"https://pbs.twimg.com/profile_images/1907828434136412160/jLEXYCZ__400x400.jpg" },
    { name: "Chaingpt", color: "bg-red-500",img:"https://s2.coinmarketcap.com/static/img/coins/200x200/23756.png" },
    { name: "BSC", color: "bg-yellow-500" ,img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzsqQuXQtX8otkDKdQSNoTT5jQTINBc_cimw&s"},
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
              stroke-width="10"
            />
            <mask id="path-2-inside-1_5_4433" fill="white">
              <path d="M100 222.869L100 -103.044L382.248 -266L664.497 -103.044L664.497 222.869L382.248 385.825L100 222.869ZM601.105 186.5L601.105 -66.4998L382 -193L162.896 -66.4999L162.896 186.5L382 313L601.105 186.5Z" />
            </mask>
            <path
              d="M100 222.869L100 -103.044L382.248 -266L664.497 -103.044L664.497 222.869L382.248 385.825L100 222.869ZM601.105 186.5L601.105 -66.4998L382 -193L162.896 -66.4999L162.896 186.5L382 313L601.105 186.5Z"
              fill="#131517"
              fill-opacity="0.01"
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
                stroke-width="10"
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
                fill-opacity="0.01"
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
                <stop stop-color="#1C75DD" stop-opacity="0.7" />
                <stop offset="1" stop-color="#1C75DD" stop-opacity="0" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_5_4433"
                x1="865"
                y1="605.354"
                x2="455.064"
                y2="1046.63"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#1C75DD" stop-opacity="0.7" />
                <stop offset="1" stop-color="#1C75DD" stop-opacity="0" />
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
              stroke-width="10"
            />
            <mask id="path-2-inside-1_5_4433" fill="white">
              <path d="M100 222.869L100 -103.044L382.248 -266L664.497 -103.044L664.497 222.869L382.248 385.825L100 222.869ZM601.105 186.5L601.105 -66.4998L382 -193L162.896 -66.4999L162.896 186.5L382 313L601.105 186.5Z" />
            </mask>
            <path
              d="M100 222.869L100 -103.044L382.248 -266L664.497 -103.044L664.497 222.869L382.248 385.825L100 222.869ZM601.105 186.5L601.105 -66.4998L382 -193L162.896 -66.4999L162.896 186.5L382 313L601.105 186.5Z"
              fill="#131517"
              fill-opacity="0.01"
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
                stroke-width="10"
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
                fill-opacity="0.01"
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
                <stop stop-color="#1C75DD" stop-opacity="0.7" />
                <stop offset="1" stop-color="#1C75DD" stop-opacity="0" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_5_4433"
                x1="865"
                y1="605.354"
                x2="455.064"
                y2="1046.63"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#1C75DD" stop-opacity="0.7" />
                <stop offset="1" stop-color="#1C75DD" stop-opacity="0" />
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
                  stroke-width="0.4"
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
                    <stop offset="0.0262068" stop-color="#0C0C0C" />
                    <stop offset="0.400772" stop-color="#06171C" />
                    <stop offset="0.676921" stop-color="#06161B" />
                    <stop offset="1" stop-color="#0C0C0C" />
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
                      stop-color="#14AEDE"
                      stop-opacity="0"
                    />
                    <stop offset="0.304614" stop-color="#1C75DD" />
                    <stop
                      offset="0.855026"
                      stop-color="#14AEDE"
                      stop-opacity="0"
                    />
                    <stop
                      offset="0.983172"
                      stop-color="#14AEDE"
                      stop-opacity="0"
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
                  
                  <img className="w-12 h-12 rounded-full" src={chain.img} alt={chain.name} />
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
      <section className="container mx-auto px-4 py-16 relative z-10">
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
      </section>

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
          <span className="text-white font-medium">getting paid</span> has never
          been easier.
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
              Decentralized, Automated Billing Now Tokenized.<br></br> Join The
              Future Of Subscription Finance <br></br> With{" "}
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

      {/* Feature Component */}
      <FeatureComponent />
    </div>
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
