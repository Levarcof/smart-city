"use client"
import Link from "next/link"
import Navbar from "../components/Navbar"
import { MapPin, Trash2, HeartPulse } from "lucide-react"

export default function Home() {
  return (
    <>
      {/* ✅ Navbar */}
      <Navbar />

      <div className="relative min-h-screen w-full text-white overflow-x-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 -z-10">
          <div className="w-full h-full bg-[#020617] relative">
            <div className="absolute top-0 left-0 w-[1200px] h-[600px] bg-green-900/50 rounded-full blur-3xl animate-pulse-slow"></div>
            <div className="absolute bottom-10 right-0 w-[800px] h-[400px] bg-green-700/40 rounded-full blur-2xl animate-pulse-slow"></div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
          {/* HERO SECTION */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-green-400 leading-tight">
              Transforming Cities into Smart, Safe & Clean Spaces
            </h1>
            <p className="mt-4 text-gray-300 text-base sm:text-lg md:text-xl">
              AI-powered solutions for smarter routes, cleaner streets, and better healthcare access.
              Experience city management like never before.
            </p>
          </div>

          {/* FEATURE CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* SMART ROUTE */}
            <Link
              href="/smartRoute"
              className="group relative flex flex-col items-start justify-between bg-black/60 backdrop-blur-xl border border-green-500/20 rounded-2xl p-8 hover:border-green-400 hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-green-400/50"
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-green-500/20 mb-6 group-hover:bg-green-500/40 transition">
                <MapPin className="text-green-400" size={28} />
              </div>
              <h2 className="text-2xl font-bold text-green-300 mb-2 group-hover:text-green-400 transition">
                Smart Route
              </h2>
              <p className="text-gray-400 text-sm sm:text-base">
                Find safest and fastest routes using AI & real-time traffic & city data.
              </p>
            </Link>

            {/* REPORT GARBAGE */}
            <Link
              href="/garbadgeReport"
              className="group relative flex flex-col items-start justify-between bg-black/60 backdrop-blur-xl border border-green-500/20 rounded-2xl p-8 hover:border-green-400 hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-green-400/50"
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-green-500/20 mb-6 group-hover:bg-green-500/40 transition">
                <Trash2 className="text-green-400" size={28} />
              </div>
              <h2 className="text-2xl font-bold text-green-300 mb-2 group-hover:text-green-400 transition">
                Report Garbage
              </h2>
              <p className="text-gray-400 text-sm sm:text-base">
                Report overflowing bins or garbage instantly with live location tracking.
              </p>
            </Link>

            {/* HEALTH CARE */}
            <Link
              href="/smart-city/health"
              className="group relative flex flex-col items-start justify-between bg-black/60 backdrop-blur-xl border border-green-500/20 rounded-2xl p-8 hover:border-green-400 hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-green-400/50"
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-green-500/20 mb-6 group-hover:bg-green-500/40 transition">
                <HeartPulse className="text-green-400" size={28} />
              </div>
              <h2 className="text-2xl font-bold text-green-300 mb-2 group-hover:text-green-400 transition">
                Health Care
              </h2>
              <p className="text-gray-400 text-sm sm:text-base">
                Access nearby hospitals and emergency services in real-time with just a tap.
              </p>
            </Link>
          </div>
        </div>
      </div>

      {/* ANIMATIONS */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.1); opacity: 0.9; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 10s ease-in-out infinite;
        }
      `}</style>
    </>
  )
}
