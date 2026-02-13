"use client"
import React, { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { useUser } from "../context/UserContext"
import { useRouter } from "next/navigation"
import { LogOut, User } from "lucide-react";

const Navbar = () => {

  const router = useRouter()
  const { user, setUser, loading } = useUser()

  const [showProfile, setShowProfile] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)

  const profileRef = useRef(null)
  const sidebarRef = useRef(null)

  useEffect(() => {
    if (user?.role) {
      router.refresh()
    }
  }, [user?.role])

  useEffect(() => {
    function handleClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false)
      }
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setShowSidebar(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const logout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" })
      if (res.ok) {
        setUser(null)
        router.push("/login")
      }
    } catch (error) {
      console.log("Logout error:", error)
    }
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="logo" width={45} height={45} />
            <span className="text-lg md:text-xl font-bold text-green-700">
              Smart city
            </span>
          </Link>

          {/* DESKTOP MENU */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-700 font-medium hover:text-green-700 transition">
              Home
            </Link>
            <Link href="/about" className="text-gray-700 font-medium hover:text-green-700 transition">
              About
            </Link>
            {!loading && user?.role === "admin" &&
              <Link href="/dashboard" className="text-gray-700 font-medium hover:text-green-700 transition">
                Dashboard
              </Link>
            }
          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">

            {/* HAMBURGER */}
            <button
              onClick={() => setShowSidebar(true)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
            >
              <Image src="/menu.png" alt="menu" width={22} height={22} />
            </button>

            {/* PROFILE */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="w-9 h-9 rounded-full overflow-hidden border border-gray-300 hover:border-green-500 transition"
              >
                <Image
                  src={user?.image || "/default.png"}
                  alt="user"
                  width={36}
                  height={36}
                  className="w-full h-full object-cover"
                />
              </button>

              {/* 🔥 SPOTIFY STYLE PROFILE DROPDOWN */}
              {showProfile && (
                <div className="absolute right-0 mt-3 w-64 bg-black border border-gray-800 shadow-2xl rounded-xl overflow-hidden text-white">

                  {/* User Info */}
                  <div className="p-4 border-b border-gray-800 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-700">
                      <Image
                        src={user?.image || "/default.png"}
                        alt="user"
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-white">
                        {user?.name || "Guest User"}
                      </p>
                      <p className="text-sm text-gray-400">
                        {user?.email || "No email"}
                      </p>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="p-2 space-y-1">
                    <Link className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-green-500/10 transition" href="/profile" >

                      <User size={16} /> View Profile
                    </Link>

                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* OVERLAY */}
      {showSidebar && (
        <div className="fixed inset-0 bg-black/60 z-40 transition-opacity duration-300"></div>
      )}

      {/* SIDEBAR */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-72 bg-black text-white z-50 transform transition-transform duration-300 ease-in-out
        ${showSidebar ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
          <span className="text-xl font-bold text-green-500">
            Smart City
          </span>
          <button
            onClick={() => setShowSidebar(false)}
            className="text-gray-400 hover:text-white text-xl"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col mt-6 px-4 gap-2">

          <Link
            href="/"
            onClick={() => setShowSidebar(false)}
            className="px-4 py-3 rounded-lg hover:bg-green-600 transition-all duration-200 font-medium"
          >
            🏠 Home
          </Link>

          <Link
            href="/about"
            onClick={() => setShowSidebar(false)}
            className="px-4 py-3 rounded-lg hover:bg-green-600 transition-all duration-200 font-medium"
          >
            ℹ️ About
          </Link>

          {!loading && user?.role === "admin" &&
            <Link
              href="/dashboard"
              onClick={() => setShowSidebar(false)}
              className="px-4 py-3 rounded-lg hover:bg-green-600 transition-all duration-200 font-medium"
            >
              📊 Dashboard
            </Link>
          }
        </div>

        <div className="absolute bottom-6 left-4 right-4 text-sm text-gray-400 border-t border-gray-800 pt-4">
          © 2025 Smart City
        </div>

      </div>
    </>
  )
}

export default Navbar
